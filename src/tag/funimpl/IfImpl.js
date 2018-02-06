const TagSupport = require("../TagSupport");

class IfIpml extends TagSupport {
    constructor() {
        super();
        this.test = false;
        this.result = false;
        this.var;
    }

    setTest(el) {

        if (typeof el == "boolean") {
            this.test = el;
        } else {
            this.test = false;
        }
    }

    exposeVariables(firstTime) {
        if (this.var != null) {
            this.pageContext.setAttribute(this.var, this.result);
        }
    }


    condition() {
        return this.test;
    }

    doStartTag() {
        this.result = this.condition();
        this.exposeVariables();
        if (this.result)
            return this.EVAL_BODY_INCLUDE;
        else
            return this.SKIP_BODY;
    }


    doAfterBody() {
        return this.SKIP_BODY;
    }

}

module.exports = IfIpml;