/**
 * Created by ghy on 2017/12/1.
 */
const Writer = require ("./Writer");
class CharArrayWriter extends Writer {
    constructor () {
        super ();
        this.buf = [];
        this.count = 0;// js 数组不用申明长度，就可以无限增加，与java 不同，java 需要申明指定长度

    }

    write (...arg) {
        if (arg.length == 1) {
            this._write_1 (arg)
        }
    }


    _write_1 (c) {
        this.buf[this.count++] = c;
    }

    toString () {
        return this.buf.join ("");
    }
}