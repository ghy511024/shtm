class Visitor {

    doVisit(node) {

    }

    visitBody(node,parent_index) {
        if (node.getBody() != null) {
            node.getBody().visit(this,parent_index)
        }
    }

    visit(node) {
        this.doVisit(node);
        this.visit(node);

    }
}

module.exports = Visitor;