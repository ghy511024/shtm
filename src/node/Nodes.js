const Node = require ("./Node");

class Nodes {

    constructor (root) {
        this.root = root;
        this.list = [];
        this.list.push(root);
        this.name = "nodes"
    }

    add (n) {
        this.list.push (n);
        this.root = null;
    }

    /**
     * 设计模式之 访问模式
     * @abstract
     * @param v {Visitor}
     */
    visit (v) {
        let iter = this.list;
        let cnum=0;
        console.log("来访了")
        for (let i = 0; i < iter.length; i++) {
            let item = iter[i]
            console.log(i,"本来为空")
            if (item != null) {
                console.log(i,"不为空")
                cnum++
                item.accept (v,i);
            }
        }
    }

}

Nodes.prototype = {
    list: [],
    root: null,
    generatedInBuffer: false
}

module.exports = Nodes;