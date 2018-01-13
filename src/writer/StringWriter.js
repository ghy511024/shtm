/**
 * Created by ghy on 2017/12/1.
 */
const Writer = require("./Writer");

class StringWriter extends Writer {
    constructor() {
        super();
        this.str = "";
    }

    _write_str(s) {
        this.str += s;
    }

    _write_num(s) {
        this.str += s;
    }

    _write_bol(s) {
        this.str += s;
    }

    _write_obj(s) {
        try {
            this.str += JSON.stringify(s);
        }
        catch (e) {
            this.str += "[Object]";
        }

    }

    _write_arr(s) {
        console.log(s)
        try {
            this.str += JSON.stringify(s);
        }
        catch (e) {
            this.str += "[Array]";
        }
    }

    toString() {
        return this.str;
    }
}

module.exports = StringWriter;