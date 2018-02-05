/**
 * 字符串直出
 * */

const Node = require ("../node/Node-Api");
const Tag = require ("../tag/Tag");
const PageContext = require ("../ctx/PageContext_fn");

// tag 解析实现类
const ForEachImpl = require ("../tag/funimpl/ForEachImpl");
const IfImpl = require ("../tag/funimpl/IfImpl");
const Parser = require ("../compile/Parser");
const jerr = require ("../err/Err");
const path = require ("path")
const GenBuffer = require ("./GenBuffer");

const OUT_STR = "ghy_shtm_tmp_out_str"//名字取这么长，防止，用户数据中，传入字变量与此重名，届时会冲突造成模板解析不正确
class GenerateVisitor extends Node.Visitor {
    constructor (out, pageContext, compiler) {
        super ();
        this.out = out;
        this.tagVarNumbers = {};
        this.out = out;
        this.compiler = compiler;
        this.methodsBuffered = [];
    }

    /**
     * 覆盖父类visit 抽象方-----+-+法
     */
    visit (n) {
        if (n instanceof Node.CustomTag) {
            this.out.println (OUT_STR + "+=\"" + n.parent.flush () + "\"")
            this._vCustomTag (n);
        }
        else if (n instanceof Node.Root) {
            this._vRoot (n);
        } else if (n instanceof Node.TempleteText) {
            this._vTempleteText (n);
        } else if (n instanceof Node.ELExpression) {
            this._vELExpression (n);
        }
    }

    /**
     * 打印根目录
     * */
    _vRoot (n) {
        this.visitBody (n);
        this.out.println (OUT_STR + "+=\"" + n.flush () + "\"")
        //
    }

    /**
     * 技巧处理，存缓存，然后回退打印父类
     */
    _vCustomTag (n) {
        let outSave = null;
        let baseVar = this.createTagVarName (n.qName, n.prefix, n.localName)
        let tagEvalVar = "_js_eval_" + baseVar;
        let tagHandlerVar = "js_th_" + baseVar;
        let tagPushBodyCountVar = "_js_push_body_count_" + baseVar;
        let tagMethod = "_js_meth_" + baseVar;

        this.out.println ();
        this.out.print (`if(${tagMethod}()){return true;}`)
        let genBuffer = new GenBuffer ();
        this.methodsBuffered.push (genBuffer);
        outSave = this.out;// 存档
        this.out = genBuffer.getOut ();
        this.out.println ()
        // this.out.print("// 开始输出函数体");
        this.out.println ()
        this.out.println (`function ${tagMethod}(n){`)
        let implName = this.getImplMethName (n);
        this.out.println (`let ${tagHandlerVar} =new ${implName}();`)
        this.out.println (`  try {`)
        this.generateCustomStart (n, tagHandlerVar);

        if (n.localName == "include") {
            this._vIncludeAction (n);
            // this.out.println (OUT_STR + "+=\"" + n.flush () + "\"")
        } else {
            this.visitBody (n);
            this.out.println (OUT_STR + "+=\"" + n.flush () + "\"")
        }

        this.generateCustomEnd (n, tagHandlerVar);
        this.out = outSave;
    }

    /**
     * include 实现，
     * */
    _vIncludeAction (n, i) {
        if (this.compiler.getBaseDir () == null || this.compiler.getBaseDir ().length == 0) {
            return;
        }
        // let pageNodes = this.compiler.getPageNode(path.join(this.compiler.getBaseDir(), n.attrs.getValue("page")), n.parent);
        let pageNodes = this.compiler.getPageNode (path.join (this.compiler.getBaseDir (), n.attrs.getValue ("page")), n);
        if (pageNodes == null) {
            jerr.err ("GetnnerateVisitor.visitInclude err")
            return;
        }
        pageNodes.visit (this, (n.parent.body.list.length - 1));
    }


    /**
     * 打印普通文本
     * */
    _vTempleteText (n) {
        let text = n.text || "";
        if (text.length == 0) {
            return;
        }
        this.out.println ();
        let sb = "";
        let count = 1024;
        for (let i = 0; i < text.length; i++) {
            let ch = text[i];
            --count;
            switch (ch) {
                case '"':
                    sb += '\\\"';
                    break;
                case '\\':
                    sb += '\\\\';
                    break;
                case '\r':
                    sb += '\\r';
                    break;
                case '\n':
                    sb += '\\n';
                    break;
                case '\t':
                    sb += '\\t';
                    break;
                case '$':
                    if ((i + 1 < text.length) && (text.charAt (i + 1) == '{')) {
                        sb += '\\\\';
                    }
                    sb += ch;
                    break;
                default:
                    sb += ch;
            }
        }
        n.parent.write (sb);
    }

    /**
     * 打印el 表达式
     *
     * */
    _vELExpression (n) {
        if (n.parent.write) {
            n.parent.write ("\"+(" + this.getAfterElexpress (n.text) + "==null?\"\":" + this.getAfterElexpress (n.text) + ")+\"");
        }
    }

    /**
     * 自定义函数，foreach,if 等输出函数体头部
     * @param n {Node}
     * @param tagHandlerVar {String} 变量名
     * */
    generateCustomStart (n, tagHandlerVar) {
        this.out.println ("//" + n.qName);
        let errinfo = jerr.getErrInfoByNode (n);// 预先获取错误信息，当异常得时候，可以直接拿出来输出
        this.out.pushIndent ();
        this.out.println (`${tagHandlerVar}.setPageContext(pageContext);`)
        this.out.println (`${tagHandlerVar}.setErrInfo("${errinfo}");`)
        this.generateSetters (n, tagHandlerVar);
        this.out.print (`
        let each_val = ${tagHandlerVar}.doStartTag();
        if (each_val != ${tagHandlerVar}.SKIP_BODY){
         while (true) {`);
    }

    generateSetters (n, tagHandlerVar) {
        // this.out.print(`${tagHandlerVar}.setPageContext(pageContext);`);//
        if (n.localName == "forEach") {
            let valName = this.getAfterElexpress (n.attrs.getValue ("items"));
            this.out.print (`${tagHandlerVar}.setItems(${valName});`);//
            this.out.print (`${tagHandlerVar}.setVar("${n.attrs.getValue ("var")}");`);//
            if (/^\d+$/g.test (n.attrs.getValue ("begin"))) {
                this.out.print (`${tagHandlerVar}.setBegin(${n.attrs.getValue ("begin")});`);//
            }
            if (/^\d+$/g.test (n.attrs.getValue ("end"))) {
                this.out.print (`${tagHandlerVar}.setEnd(${n.attrs.getValue ("end")});`);//
            }
            if (n.attrs.getValue ("index") != null && n.attrs.getValue ("index").length > 0) {
                this.out.print (`${tagHandlerVar}.setIndex("${n.attrs.getValue ("index")}");`);//
            }

        }
        else if (n.localName == "if") {
            let valName = this.getAfterElexpress (n.attrs.getValue ("test"));
            this.out.print (`${tagHandlerVar}.setTest(${valName});`);//
        }
    }

    generateCustomEnd (n, tagHandlerVar) {
        this.out.print (`let evalDoAfterBody = ${tagHandlerVar}.doAfterBody();
                    if (evalDoAfterBody != ${tagHandlerVar}.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (${tagHandlerVar}.doEndTag() == ${tagHandlerVar}.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
      var msg = ${tagHandlerVar}.getErrInfo();
      msg += e;
      ${OUT_STR}=msg;
      return true;
      }
         return false;}
            `)
    }

    /**
     * 输出结束代码
     *
     * */
    generatePostamble (n) {
        this.genCommonPostamble ();
    }

    /**
     * 输出缓存区间的的，代码
     * */
    genCommonPostamble () {
        for (let i = 0; i < this.methodsBuffered.length; i++) {
            let buffer = this.methodsBuffered[i];
            this.out.printMultiLn (buffer.toString ());
        }
        this.out.printil ("return " + OUT_STR + ";");// with 函数结尾

    }

    /**
     * 传入node ，根据node 类型返回对应的tagimpul 实例函数名
     * @param n {Node}
     * */
    getImplMethName (n) {
        let implName = "";
        if (n.localName == "forEach") {
            implName = "ForEachImpl";
        } else if (n.localName == "if") {
            implName = "IfImpl";
        } else if (n.localName == "include") {
            implName = "IncludeImpl";
        }
        return implName;
    }

    getAfterElexpress (exp) {
        if (exp == null) {
            return null;
        }
        let exp_str;
        let reg = /\$\{(.*?)\}/gi
        exp.replace (reg, function (_, $1) {
            exp_str = $1;
        })
        return exp_str
    }

    createTagVarName (fullName, prefix, shortName) {
        let varName;
        varName = prefix + "_" + shortName + "_"
        if (this.tagVarNumbers[fullName] != null) {
            let i = Number (this.tagVarNumbers[fullName]) || 0;
            varName = varName + (i + 1);
            this.tagVarNumbers[fullName] = i + 1;
        } else {
            varName = varName + 1;
            this.tagVarNumbers[fullName] = 1;
        }
        return varName;
    }
}

GenerateVisitor.prototype = {
    tagVarNumbers: {},
    parent: "",
    isFragment: "",
    methodNesting: 0,
    arrayCount: 0,
    textMap: {},
}
GenerateVisitor.OUT_STR = OUT_STR;

module.exports = GenerateVisitor;