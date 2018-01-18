/**
 * Created by ghy on 2017/12/1.
 */
const lineSeparator = "\n";
const Writer = require ("./Writer");

class StringWriter  {
    constructor () {
        // super ();
        this.str = "";
    }
    print(s) {
        this.str += s;
        // if (s == null) {
        //     s = "";
        // }
        // this.write(s);
    }
    println(x) {
        if (x != null) {
            this.print(x);
        }
        this.write(lineSeparator);
    }
    write(s) {
        this.str += s;
    }
    // _write_str (s) {
    //     this.str += s;
    // }
    //
    // _write_num (s) {
    //     this.str += s;
    // }
    //
    // _write_bol (s) {
    //     this.str += s;
    // }
    //
    // _write_obj (s) {
    //     try {
    //         this.str += JSON.stringify (s);
    //     }
    //     catch (e) {
    //         this.str += "[Object]";
    //     }
    //
    // }
    //
    // _write_arr (s) {
    //     console.log (s)
    //     try {
    //         this.str += JSON.stringify (s);
    //     }
    //     catch (e) {
    //         this.str += "[Array]";
    //     }
    // }

    toString () {
        return this.str;
    }
}

module.exports = StringWriter;