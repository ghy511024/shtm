class Tag {
    constructor () {
        this.SKIP_BODY = 0;
        this.EVAL_BODY_INCLUDE = 1;
        this.EVAL_BODY_AGAIN = 2;
        this.SKIP_PAGE = 5;
        this.EVAL_PAGE = 6;
    }
}
Tag.prototype = {
    SKIP_BODY: 0,
    EVAL_BODY_INCLUDE: 1,
    EVAL_BODY_AGAIN: 2,
    SKIP_PAGE: 5,
    EVAL_PAGE: 6,
}
module.exports = Tag;