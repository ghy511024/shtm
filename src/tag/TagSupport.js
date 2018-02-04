const Tag = require("./Tag");

class TagSupport extends Tag {
    constructor() {
        super();
        this.pageContext = null;
        this.parent = null;
        this.id = null;
        this.values = {};
        this.errInfo = "";
    }

    setPageContext(pageContext) {
        this.pageContext = pageContext;
    }

    setErrInfo(errInfo) {
        this.errInfo = errInfo;
    }

    getErrInfo(errInfo) {
        return this.errInfo;
    }

    /**
     * @abstract
     *
     * */
    doStartTag() {

    }

    doEndTag() {
        return this.EVAL_PAGE;
    }
}

module.exports = TagSupport;