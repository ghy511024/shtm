/**
 * 字符串直出
 * */

const Node = require("../node/Node-Api");
const Tag = require("../tag/Tag");
const visit_TemplateText = require("./visitimpl/visit_TemplateText");
const PageContext = require("../ctx/PageContext");

// tag 解析实现类
const ForEachImpl = require("../tag/funimpl/ForEachImpl");
const IfImpl = require("../tag/funimpl/IfImpl");
const Parser = require("../compile/Parser_bk");
const jerr = require("../err/Err");
const path = require("path")
const GenBuffer = require("./GenBuffer");

class GenerateVisitor extends Node.Visitor {
    constructor(out, pageContext, compiler) {
        super();
        this.out = out;
        if (pageContext instanceof PageContext) {
            this.pageContext = pageContext;
        }
        this.tagVarNumbers = {};
        this.out = out;
        this.compiler = compiler;
        this.methodsBuffered = [];
    }

    /**
     * 覆盖父类visit 抽象方-----+-+法
     */
    visit(n, i) {
         if (n instanceof Node.CustomTag) {
            this.out.println("str+=\"" + n.parent.flush() + "\"")
            this._vCustomTag(n, i);
        } else if (n instanceof Node.Nodes) {
            this._vNodes(n);
        }
        else if (n instanceof Node.Root) {
            this._vRoot(n, i);
        } else if (n instanceof Node.TemplateText) {
            this._vTemplateText(n);
        } else if (n instanceof Node.ELExpression) {
            this._vELExpression(n);
        }
    }

    /**
     * 打印根目录
     * */
    _vRoot(n, i) {
        this.visitBody(n);
        this.out.println("str+=\"" + n.flush() + "\"")
    }

    /**
     * 技巧处理，存缓存，然后回退打印父类
     */
    _vCustomTag(n, i) {
        let outSave = null;
        let baseVar = this.createTagVarName(n.qName, n.prefix, n.localName)
        let tagEvalVar = "_js_eval_" + baseVar;
        let tagHandlerVar = "js_th_" + baseVar;
        let tagPushBodyCountVar = "_js_push_body_count_" + baseVar;
        let tagMethod = "_js_meth_" + baseVar;

        this.out.println();
        this.out.print(`if(${tagMethod}(n.body.list[${i}])){return true;}`)

        let genBuffer = new GenBuffer();
        this.methodsBuffered.push(genBuffer);
        outSave = this.out;// 存档
        this.out = genBuffer.getOut();
        this.out.println()
        // this.out.print("// 开始输出函数体");
        this.out.println()
        this.out.println(`function ${tagMethod}(n){`)
        this.out.println(`  try {`)
        this.generateCustomStart(n, tagHandlerVar);

        if (n.localName == "include") {
            this._vIncludeAction(n);
        } else {
            this.visitBody(n);
            this.out.println("str+=\"" + n.flush() + "\"")
        }

        this.generateCustomEnd(n, tagHandlerVar);
        this.out = outSave;
    }

    /**
     * include 实现，
     * */
    _vIncludeAction(n) {
        if (this.compiler.getBaseDir() == null || this.compiler.getBaseDir().length == 0) {
            return;
        }
        let pageNodes = this.compiler.getPageNode(path.join(this.compiler.getBaseDir(), n.attrs.getValue("page")), n.parent);
        if (pageNodes == null) {
            jerr.err("GetnnerateVisitor.visitInclude err")
            return;
        }
        pageNodes.visit(this);
    }

    _vNodes(n) {

    }


    /**
     * 打印普通文本
     * */
    _vTemplateText(n) {
        let text = n.text || "";
        if (text.length == 0) {
            return;
        }
        if (text.length < 3) {
            for (let i = 0; i < text.length; i++) {
                let ch = text[i];
                this.out.printin("str+=" + this.quote(ch) + ";")
            }
            return;
        }
        this.out.println();
        // let sb = "str+=\"";
        // let sb = "\"";
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
                    if ((i + 1 < text.length()) && (text.charAt(i + 1) == '{')) {
                        sb += '\\\\';
                    }
                    sb += ch;
                    break;
                default:
                    sb += ch;
            }
        }
        n.parent.write(sb);
    }

    /**
     * 打印el 表达式
     *
     * */
    _vELExpression(n) {
        if (n.parent.write) {
            n.parent.write("\"+(" + this.getAfterElexpress(n.text) + "||\"\")+\"");
        } else {
            this.out.print("str+=(" + this.getAfterElexpress(n.text) + "||\"\")")
        }

        // n.parent.write("\"+" + this.getAfterElexpress(n.text) + "+\"");
        // this.out.print("str+=" + this.getAfterElexpress(n.text) + ";")
    }

    /**
     * 自定义函数，foreach,if 等输出函数体头部
     * @param n {Node}
     * @param tagHandlerVar {String} 变量名
     * */
    generateCustomStart(n, tagHandlerVar) {
        this.out.println("//" + n.qName);
        let implName = this.getImplMethName(n)
        this.out.println(`let ${tagHandlerVar} =new ${implName}();`)
        this.out.println(`${tagHandlerVar}.setPageContext(pageContext);`)
        this.generateSetters(n, tagHandlerVar);
        this.out.print(`
        let each_val = ${tagHandlerVar}.doStartTag();
        if (each_val != ${tagHandlerVar}.SKIP_BODY){
         while (true) {`);
    }

    generateSetters(n, tagHandlerVar) {
        // this.out.print(`${tagHandlerVar}.setPageContext(pageContext);`);//
        if (n.localName == "forEach") {
            let valName = this.getAfterElexpress(n.attrs.getValue("items"));
            this.out.print(`${tagHandlerVar}.setItems(${valName});`);//
            this.out.print(`${tagHandlerVar}.setVar("${n.attrs.getValue("var")}");`);//
        }
        else if (n.localName == "if") {
            let valName = this.getAfterElexpress(n.attrs.getValue("test"));
            this.out.print(`${tagHandlerVar}.setTest(${valName});`);//
        }
    }

    generateCustomEnd(n, tagHandlerVar) {
        this.out.print(`let evalDoAfterBody = ${tagHandlerVar}.doAfterBody();
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
      var msg = getErrInfo(n);
      str=msg;
      return true;
      }
         return false;}
            `)
    }

    /**
     * 输出结束代码
     *
     * */
    generatePostamble(n) {
        this.genCommonPostamble();
    }

    /**
     * 输出缓存区间的的，代码
     * */
    genCommonPostamble() {
        for (let i = 0; i < this.methodsBuffered.length; i++) {
            let buffer = this.methodsBuffered[i];
            this.out.printMultiLn(buffer.toString());
        }
        this.genErrFn();// err 处理函数
        this.out.printil("return str;");// with 函数结尾

    }

    genErrFn() {
        var errfn = `
        function getErrInfo(node) {
        var mark = node.startMark;
        var line = mark.line;
        var col = mark.col;
        var name = mark.name;
        var preline = 2;
        var nextline = 2;
        var msginfo = "ERROR: " + " position:(" + line + "," + col + ")\\n";

        var sline = Math.max(mark.line - preline, 1)
        var retstr = "";
        for (let i = sline; i < mark.line; i++) {
            var start = Mark.newMark(mark);
            start.resetLine(i);
            retstr += ("   " + i + "|" + mark.reader.getTextline(start, i));
        }
        let cmark = Mark.newMark(mark);
        cmark.resetLine(mark.line);
        retstr += (">> " + cmark.line + "|" + cmark.reader.getTextline(cmark, cmark.line));
        for (let i = 1; i < nextline; i++) {
            let start = Mark.newMark(mark);
            start.resetLine(mark.line + i);
            retstr += "   " + start.line + "|" + mark.reader.getTextline(start, start.line)
        }
        return msginfo + retstr;
    }
        `
        this.out.printil(errfn);
    }

    /**
     * 传入node ，根据node 类型返回对应的tagimpul 实例函数名
     * @param n {Node}
     * */
    getImplMethName(n) {
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

    /**
     * @param c ${Char}
     * */
    quote(c) {
        let str = "";
        str += '\'';
        if (c == '\'') {
            str += '\\\''
        } else if (c == '\\') {
            str += '\\\\'
        }
        else if (c == '\n') {
            str += '\\n'
        }
        else if (c == '\r') {
            str += '\\r'
        }
        else {
            str += c;
        }
        str += '\'';
        return str;
    }

    getAfterElexpress(exp) {
        let exp_str;
        let reg = /\$\{(.*?)\}/gi
        exp.replace(reg, function (_, $1) {
            exp_str = $1;
        })
        return exp_str
    }

    createTagVarName(fullName, prefix, shortName) {
        let varName;
        varName = prefix + "_" + shortName + "_"
        if (this.tagVarNumbers[fullName] != null) {
            let i = Number(this.tagVarNumbers[fullName]) || 0;
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

module.exports = GenerateVisitor;