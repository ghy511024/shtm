const PAGE_SCOPE = 1;
const REQUEST_SCOPE = 2;
const SESSION_SCOPE = 3;
const APPLICATION_SCOPE = 4;

const PAGE = "node.jstl.jsPage";
const REQUEST = "node.jstl.jsRequest";
const SESSION = "node.jstl.jsSession";

const ELparser = require ("../ast/ELparser");

class PageContext {
    constructor (data) {
        this.data = data;
        this.attributes = {};
        this.isNametableInitialized = false;
    }

    setAttribute (name, attribute) {
        if (attribute != null) {
            if (!this.isNametableInitialized) {
                this.initializePageScopeNameTable ();
            }
            this.attributes[name] = attribute;
        } else {
            this.attributes[name] = null;
        }

    }

    getAttribute (name) {
        if (!this.isNametableInitialized) {
            this.initializePageScopeNameTable ();
        }
        return this.attributes[name];
    }

    initializePageScopeNameTable () {
        // 留着以后扩展吧，暂时用不到
        this.isNametableInitialized = true;
        this.setAttribute (PAGE, {})
        this.setAttribute (REQUEST, {})
        this.setAttribute (SESSION, {})
    }

    /**
     * 使用词法解析
     * */
    getElValue (exp, node) {
        let tmpData = Object.assign ({}, this.attributes, this.data)
        let exp_str;
        let reg = /\$\{(.*?)\}/gi
        exp.replace (reg, function (_, $1) {
            exp_str = $1;
        })
        return ELparser.getValueByLocal (exp_str, tmpData, node);
    }
}

module.exports = PageContext;