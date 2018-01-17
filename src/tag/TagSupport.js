const PageContext = require ("../ctx/PageContext");
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

    setValue (key, value) {
        // java jstl tagSuport.java 中采用hashtable 实现，线程安全，node 单线程不考虑
        this.values[key] = value;

    }

    getValue (key) {
        return this.values[key]
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