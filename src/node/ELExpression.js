const Node = require("./Node");

class ELExpression extends Node {
    constructor(text, start, parent) {
        super(null, null, null, start, parent);
        this.text = text;
        this.name = "ELExpression"
    }
}

ELExpression.prototype = {
    el: null//ELNode.Nodes

}

module.exports = ELExpression;