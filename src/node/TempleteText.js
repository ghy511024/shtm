const Node = require("./Node");

class TempleteText extends Node {
    constructor(text, start, parent) {
        super(null, null, null, start, parent);
        this.text = text;
        this.name = "TempleteText"
    }
}

module.exports = TempleteText;