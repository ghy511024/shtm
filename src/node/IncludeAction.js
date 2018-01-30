const Node = require("./Node");

class IncludeAction extends Node {
    constructor(attr, start, parent) {
        super("jsp:include", "include", attr, start, parent);
        this.name = "include"
    }

    /**
     * @param page {Attributes};
     * */
    setPage(page) {
        this.page = page;
    }

    getPage() {
        return this.page;
    }
}


module.exports = IncludeAction;