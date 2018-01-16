/**
 * 字符串直出
 * */

const Node = require ("../node/Node-Api");
const Tag = require ("../tag/Tag");
const visit_TemplateText = require ("./visitimpl/visit_TemplateText");
const PageContext = require ("../ctx/PageContext");

// tag 解析实现类
const ForEachIpml = require ("../tag/ipml/ForEachIpml");
const IfIpml = require ("../tag/ipml/IfIpml");
const Parser = require ("../compile/Parser");
const jerr = require ("../err/Err");
const path = require ("path")
const GenBuffer = require ("./GenBuffer");

class GenerateVisitor extends Node.Visitor {
    constructor (out, pageContext, compiler) {
        super ();
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
    visit (n, i) {
        console.log (n.name)
        if (n instanceof Node.IncludeAction) {
            this._vIncludeAction (n);
        }
        else if (n instanceof Node.CustomTag) {
            this._vCustomTag (n, i);
        } else if (n instanceof Node.Nodes) {
            this._vNodes (n);
        }
        else if (n instanceof Node.Root) {
            this._vRoot (n);
        } else if (n instanceof Node.TemplateText) {
            this._vTemplateText (n);
        } else if (n instanceof Node.ELExpression) {
            this._vELExpression (n);
        }
    }

    /**
     * 技巧处理，存缓存，然后回退打印父类
     */
    _vCustomTag (n, i) {
        let outSave = null;
        let tagMethod = "_meth_" + n.localName + "_1";
        this.out.println ();
        this.out.print (`if(${tagMethod}(n.list[${i}])){return}`)

        let genBuffer = new GenBuffer ();
        this.methodsBuffered.push (genBuffer);
        outSave = this.out;// 存档
        this.out = genBuffer.getOut ();
        this.out.println ()
        this.out.print ("// 开始输出函数体");
        this.out.println ()
        this.out.println (`function ${tagMethod}(n){`)
        this.out.println (` var foreachTag = new ForEachIpml ();`)
        this.out.println (` var foreachTag = new ForEachIpml ();`)
        this.out.println (`  try {`)
        this.out.println (`foreachTag.setItems (list);`)

        //todo 中间还有很长一截
        this.visitBody (n);
        //todo 中间还有很长一截
        this.out = outSave;
    }

    /**
     * include 实现，
     * */
    _vIncludeAction (n) {
        if (this.pageContext.fileDir == null) {
            return;
        }
        let pageNodes = this.compiler.getPageNode (path.join (this.pageContext.fileDir, n.attrs.getValue ("page")), null);
        if (pageNodes == null) {
            jerr.err ("GetnnerateVisitor.visitInclude err")
            return;
        }
        pageNodes.visit (this);
    }

    _vNodes (n) {

    }

    /**
     * 打印根目录
     * */
    _vRoot (n) {
        console.log ("sdfsdf")
        this.out.print (`
var fn = function (data, option) {
    with (data || {}) {
        var ForEachIpml = option.ForEachIpml;
        var out = option.out;
        var pageNodes = option.pageNodes;
        service (n)
        function service (parent) {`)

        this.visitBody (n);

        this.out.print (`}  
          }
};`)
    }

    /**
     * 打印普通文本
     * */
    _vTemplateText (n) {
        let text = n.text || "";
        if (text.length == 0) {
            return;
        }
        if (text.length < 3) {
            for (let i = 0; i < text.length; i++) {
                let ch = text[i];
                this.out.printin ("out.print(" + this.quote (ch) + ");")
            }
            return;
        }
        this.out.println ();
        let sb = "out.print(\"";
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
                    if ((i + 1 < text.length ()) && (text.charAt (i + 1) == '{')) {
                        sb += '\\\\';
                    }
                    sb += ch;
                    break;
                default:
                    sb += ch;
            }
        }
        sb += "\");";
        this.out.print (sb)
    }

    /**
     * 打印el 表达式
     *
     * */
    _vELExpression (n) {
        // this.out.print (this.pageContext.getElValue (n.text, n))
        this.out.println ();
        this.out.print ("out.print (" + this.getAfterElexpress (n.text) + ");")
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
        console.log ("vvvvvvvvvvvvvvv")
        for (let i = 0; i < this.methodsBuffered.length; i++) {
            let buffer = this.methodsBuffered[i];
            this.out.printMultiLn (buffer.toString ());
        }
        console.log ("bbbbbbbbbbbbb")
        this.out.printil ("}");
    }

    /**
     * @param c ${Char}
     * */
    quote (c) {
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

    getAfterElexpress (exp) {
        let exp_str;
        let reg = /\$\{(.*?)\}/gi
        exp.replace (reg, function (_, $1) {
            exp_str = $1;
        })
        return exp_str
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