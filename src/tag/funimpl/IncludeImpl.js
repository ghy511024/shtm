const TagSupport = require("../TagSupport");

class IncludeIpml extends TagSupport {
    constructor() {
        super();
    }


    doStartTag() {
        return this.EVAL_BODY_INCLUDE;
    }


    doAfterBody() {
        return this.SKIP_BODY;
    }

}

module.exports = IncludeIpml;