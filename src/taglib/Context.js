/**
 * Created by gonghongyu on 2017/12/7.
 */
class Context {
    constructor(data) {
        this.data = data;

    }

    setVar(_var) {
        this._var = _var;
    }

    setItems(items) {

    }

    getEldata($el) {
    //
    }

    getData() {
        var tmpobj = {};
        tmpobj[this._var] = _this._items;
        return Object.assign({}, data, tmpobj);
    }

}
