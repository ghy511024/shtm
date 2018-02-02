const Tag = require ("./Tag");

class TagSupport extends Tag {
    constructor () {
        super ();
        this.pageContext = null;
        this.parent = null;
        this.id = null;
        this.values = {};
    }

    setPageContext (pageContext) {
        this.pageContext = pageContext;
    }

    /**
     * @abstract
     *
     * */
    doStartTag () {

    }

    doEndTag () {
        return this.EVAL_PAGE;
    }
}

module.exports = TagSupport;