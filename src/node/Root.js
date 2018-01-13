const Node = require ("./Node");

class Root extends Node {
    constructor() {
        super();
        this.name = "root"
    }
}

Root.prototype = {
    parentRoot: null,
}
module.exports = Root;