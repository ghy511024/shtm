const Node = require ("./Node");

class Root extends Node {
    constructor(start, parent) {
        super(null, null, null, start, parent);
        this.name = "root"
    }
}

Root.prototype = {
    parentRoot: null,
}
module.exports = Root;