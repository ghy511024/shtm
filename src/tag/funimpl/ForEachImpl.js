const TagSupport = require("../TagSupport");


class ForEachIpml extends TagSupport {
    constructor() {
        super();
        this.items = null;
        this.index = 0;
        this.indexId = "index";
        this.count = 1;
        this.end = -1;
        this.begin = 0;
        this.step = 1;
        this.item = null;
        this.last = false;
        this.statusId = null;
        this.all_len = 0;
        this.cindex = 0;// 当前索引
        this.cursor = 0;
    }

    hasNext() {
        // return this.items != null && this.items.length > 0;
        return this.items != null && this.cursor < this.items.length;
    }

    next() {
        // console.log(this.items[this.cursor], "ghy")
        var item = this.items[this.cursor];
        // var item = this.items.shift()
        this.cursor++;
        return item;

    }
    getItem(){
        return this.item;
    }
    setItems(o) {
        this.rawItems = o;
    }

    setVar(_id) {
        // if (this.pageContext.hasValue(_id)) {
        //     this.saveVar = this.pageContext.getAttribute(_id)
        // }
        this.itemId = _id;
    }

    resetVar() {
        if (this.saveVar != null) {
            this.pageContext.setAttribute(this.itemId, this.saveVar)
        } else {
            this.pageContext.removeAttribute(this.itemId)
        }
        if (this.saveIndex != null) {
            this.pageContext.setAttribute(this.indexId, this.saveIndex)
        } else {
            this.pageContext.removeAttribute(this.indexId)
        }
    }

    setBegin(begin) {
        if (begin !== null) {
            this.begin = begin;
        }
    }

    setEnd(end) {
        if (end !== null) {
            this.end = end;
        }
    }

    setIndex(indexId) {
        if (this.pageContext.hasValue(indexId)) {
            this.saveIndex = this.pageContext.getAttribute(indexId);
        }
        this.indexId = indexId;
    }

    exposeVariables(firstTime) {
        this.pageContext.setAttribute(this.itemId, this.getCurrent())
    }

    discard(n) {
        let oldIndex = this.index;
        while (n-- > 0 && !this.atEnd() && this.hasNext()) {
            this.index++;
            this.next();
        }
        this.index = oldIndex;
    }

    doStartTag() {
        // if (this.end != -1 && this.begin > this.end) {
        //     return
        // }
        // this.index = 0;
        // this.count = 1;
        // this.cindex = 0;// 重置游标
        // this.last = false;
        // this.iteratedExpression = null;
        // this.deferredExpression = null;

        this.prepare();// 数据转换
        // this.all_len = this.items.length;// 重置长度

        // 设置了开始标签，直接从开始标签起步
        // this.discardIgnoreSubset(this.begin);
        if (this.hasNext()) {
            this.item = this.next();
        } else {
            return this.SKIP_BODY;
        }
        // this.discard(this.step - 1);

        // 设置临时变量，比如循环中第一个object 赋值为 item
        this.exposeVariables(true);
        // this.calibrateLast();

        return this.EVAL_BODY_INCLUDE;
    }


    doAfterBody() {
        // console.log("22")
        this.count++;
        if (this.hasNext()) {
            this.index++;
            this.item = this.next();
        } else {
            return this.SKIP_BODY;
        }
        this.exposeVariables(false);
        return this.EVAL_BODY_AGAIN;
    }

    /**
     * 将 rawItems 转换设置为items
     * */
    prepare() {

        if (this.rawItems != null) {
            this.items = this.rawItems;
            return;
            // 数据转换
            // this.rawItems = this.supportedTypeForEachIterator(this.rawItems)
            // this.items = this.rawItems;

        } else {
            // 没有items 就使用begin ,end
            this.items = this.beginEndForEachIterator();
        }

    }

    discardIgnoreSubset(n) {
        while (n-- > 0 && this.hasNext()) {
            this.next();
        }
    }

    atEnd() {
        return ((this.end != -1) && (this.begin + this.index >= this.end));
    }

    calibrateLast() {
        this.last = !this.hasNext() || this.atEnd() || (this.end != -1 && (this.begin + this.index + this.step > this.end));
    }

    beginEndForEachIterator() {
        let ia = [];
        for (let i = 0; i <= this.end; i++) {
            ia[i] = i;
        }
        return ia;
    }

    getCurrent() {
        return this.item;
    }

    /**
     * 遍历数据类型转换
     * @param o{Object}
     * */
    supportedTypeForEachIterator(o) {
        let ret = [];
        if (o instanceof Array) {
            ret = Object.assign([], o);
        } else if (typeof o == "object") {
            for (let key in o) {
                if (typeof o[key] !== "function") {
                    let obj = {key: key, value: o[key]};
                    ret.push(obj);
                }
            }
        } else if (typeof o == "string") {
            ret = o.split(",")
        } else {

        }
        return ret;
    }
}

module.exports = ForEachIpml;