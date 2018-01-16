/**
 * Created by ghy on 2017/11/17.
 */
const Nodes = require ("./Nodes");

class Node {
    constructor (qName, localName, attrs, start, parent) {
        this.qName = qName;//full name [c:forEach]
        this.localName = localName;// [forEach]
        this.attrs = attrs;
        // this.taglibAttrs = taglibAttrs;
        this.startMark = start;
        this.isDummy = (start == null);
        this.addToParent (parent);
        this.name = "node";
    }

    addToParent (parent) {
        if (parent != null) {
            this.parent == parent;
            let parentBody = parent.body;
            if (parentBody == null) {
                parentBody = new Nodes ();
                parent.body = parentBody;
            }
            parentBody.add (this);
        }
    }

    static getCustomTag () {

    }

    getBody () {
        return this.body;
    }

    /**
     * @abstract 抽象方法
     * @param v {Visitor}
     */
    accept (v,i) {
        v.visit (this,i);

    }

}

Node.prototype = {
    body: null,//<Nodes>
    parent: null,//<node>
    text: "",// 文本内容
    qName: "",
    startMark: null,
    localName: "",
    beginJSLine: 0,
    endJSLine: 0,
    root: null,
    taglibAttrs: null,
}
module.exports = Node;