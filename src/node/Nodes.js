const Node = require("./Node");

class Nodes {

    constructor(root) {
        this.root = root;
        this.list = [];
        if (root != null) {
            this.list.push(root);
        }
        this.name = "nodes"

    }

    add(n) {
        this.list.push(n);
        this.root = null;
    }


    /**
     * 设计模式之 访问模式
     * @abstract
     * @param v {Visitor}
     */
    visit(v, parent_index) {
        let iter = this.list;
        for (let i = 0; i < iter.length; i++) {
            let item = iter[i]
            if (item != null) {
                item.accept(v, i, parent_index);
            }
        }
    }

}

Nodes.prototype = {
    root: null,
    generatedInBuffer: false
}

module.exports = Nodes;