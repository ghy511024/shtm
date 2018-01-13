const TagSupport = require ("./TagSupport");


class ForEachSupport extends TagSupport {
    constructor () {
        super ();
        this.items = null;
    }

    supportedTypeForEachIterator (o) {
        if (o instanceof String) {

        } else {

        }
    }

    hasNext () {
        return this.items != null && this.items.length > 0;
    }

    next () {
        return this.items.pop ();
    }

    setItems (o) {
        if (o == null) {
            this.rawItems = [];
        } else {
            this.rawItems = o;
        }
    }

    setVar (_id) {
        this.itemId = _id;
    }

    prepare () {
        if (this.rawItems != null) {
            this.items = this.supportedTypeForEachIterator (this.rawItems);
        } else {
            let ia = [];
            for (let i = 0; i < this.end; i++) {
                ia[i] = i;
            }
            //todo 逻辑没写完，20171123：01：58 返回一个基础的迭代器实现类
            this.items = new SimpleForEachIterator (ia);

        }

    }

    /**
     * @param firstTime{Boolean}
     * */
    exposeVariables (firstTime) {
        if (this.itemId != null) {
            if (this.getCurrent () == null) {
                this.pageContext.removeAttribute (this.itemId)
            } else if (this.deferredExpression != null) {

            } else {
                this.pageContext.setAttribute (this.itemId, this.getCurrent ())
            }
        }
    }
}

class SimpleForEachIterator {
    constructor (i) {
        this.i = i;//Iterator 迭代器
    }

    hasNext () {
        return this.i != null && this.i.length > 0;
    }

    next () {
        return this.i.pop ();
    }
}

module.exports = ForEachSupport;