
const Node = require("../node/Node-Api");

class GenerateVisitor extends Node.Visitor {
    constructor() {
        super();
        this.tagVarNumbers = {};
        this.tree = [];
        this.tmp = this.tree;
    }

    getTree() {
        return this.tree;
    }

    /**
     * 覆盖父类visit 抽象方法
     */
    visit(n) {
        let name = n.name;

         if (n instanceof Node.CustomTag) {
            let obj = {};
            obj.name = name;
            obj.child = [];
            let gtmp = this.tmp
            this.tmp.push(obj);
            this.tmp = obj.child;
            this.visitBody(n)
            this.tmp = gtmp;
        }
        else if (n instanceof Node.Root) {
            let obj = {};
            obj.name = name;
            obj.child = [];
            this.tmp.push(obj);
            let gtmp = this.tmp
            this.tmp = obj.child;
            this.visitBody(n)
            this.tmp = gtmp;
        } else if (n instanceof Node.TemplateText) {
            let obj = {};
            obj.name = name;
            obj.text=n.text;
            this.tmp.push(obj);
        } else if (n instanceof Node.ELExpression) {
            let obj = {};
            obj.name = name;
            this.tmp.push(obj);
        }
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