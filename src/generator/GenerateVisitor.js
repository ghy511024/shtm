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
const path=require("path")

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
    }

    /**
     * 覆盖父类visit 抽象方-----+-+法
     */
    visit (n) {
        if (n instanceof Node.IncludeAction) {
            this._vIncludeAction (n);
        }
        else if (n instanceof Node.CustomTag) {
            this._vCustomTag (n);
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
     * 不知道是不是拆出去好一点，先不拆，规模不大
     */
    _vCustomTag (n) {
        // console.log("_vCustomTag")
        // console.log(n.qName, n.prefix, n.localName, n.uri)
        if (n.localName == "forEach") {
            let eachtag = new ForEachIpml ();
            eachtag.setPageContext (this.pageContext);
            eachtag.setVar (n.attrs.getValue ("var"));// "item"
            eachtag.setItems (this.pageContext.getElValue (n.attrs.getValue ("items"), n));// "${list1}"
            let each_val = eachtag.doStartTag ();
            if (each_val != Tag.SKIP_BODY) {
                while (true) {
                    this.visitBody (n)
                    let evalDoAfterBody = eachtag.doAfterBody ();
                    if (evalDoAfterBody != Tag.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
        } else if (n.localName == "if") {
            let iftag = new IfIpml ();
            iftag.setPageContext (this.pageContext);
            iftag.setTest (this.pageContext.getElValue (n.attrs.getValue ("test"), n))

            let if_val = iftag.doStartTag ();
            if (if_val != Tag.SKIP_BODY) {
                this.visitBody (n);
            }
        } else if(n.localName == "include"){
            this._vIncludeAction(n)
        }
    }

    /**
     * include 实现，
     * */
    _vIncludeAction (n) {
        let pageNodes = this.compiler.getPageNode(path.join(this.pageContext.fileDir,n.attrs.getValue("page")), null);
        if (pageNodes == null) {
            jerr.err ("GetnnerateVisitor.visitInclude err")
            return;
        }
        pageNodes.visit (this);
    }

    _vNodes (n) {

    }

    _vRoot (n) {
        this.visitBody (n)
    }

    _vTemplateText (n) {
        this.out.print (n.text)
    }

    _vELExpression (n) {
        this.out.print (this.pageContext.getElValue (n.text, n))

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