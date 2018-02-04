class Visitor {
    visitBody(node,parent_index) {
        if (node.getBody() != null) {
            node.getBody().visit(this,parent_index)
        }
    }
}

module.exports = Visitor;