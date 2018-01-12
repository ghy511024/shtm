const Node = require("./Node");

class NamedAttribute extends Node {
    constructor(qName, localName, attrs, start, parent) {
        super(qName, localName, attrs, start, parent);
        this.name = this.getAttributeValue("name");
        if (this.name != null) {
            this.localName = this.name;
            let index = this.name.indexOf(':');
            if (index != -1) {
                this.prefix = name.substring(0, index);
                this.localName = name.substring(index + 1);
            }
        }
    }
}