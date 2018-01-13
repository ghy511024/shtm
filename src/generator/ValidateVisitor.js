class ValidateVisitor extends Node.Visitor {
    constructor() {
        super();
        this.tagVarNumbers = {};
    }

    visit(n) {
        if (n instanceof Node.ELExpression) {
            this._vCustomTag(n);
        } else if (n instanceof Node.Nodes) {
            this._vNodes(n);
        }
        else if (n instanceof Node.Root) {
            this._vRoot(n);
        } else if (n instanceof Node.TemplateText) {
            this._vTemplateText(n);

        } else if (n instanceof Node.ELExpression) {
            this._vELExpression(n);
        }
    }

    _vELExpression(n) {
        let expstr = n.text;
        // console.log(expstr);
    }
}

module.exports = ValidateVisitor;