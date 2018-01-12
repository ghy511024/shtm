const Node = require("./Node");

class TemplateText extends Node {
    constructor(text, start, parent) {
        super(null, null, null, start, parent);
        this.text = text;
        this.name = "TemplateText"
    }
}

module.exports = TemplateText;