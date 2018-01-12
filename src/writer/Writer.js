/**
 *
 * 这个应该是一个抽象类
 *
 */
const Abstract = require("../object/Abstract");
const lineSeparator = "\n";
class Writer extends Abstract {
    constructor() {
        super();
    }

    print(s) {
        if (s == null) {
            s = "null";
        }
        this.write(s);
    }

    write(...args) {
        this.DT("write", args)
    }


    println(x) {
        if (x != null) {
            this.print(x);
        }
        this.write(lineSeparator);
    }



}
//
// let w = new Writer();
// w.test(1, "sdf");
// w.test();
// w.test({}, [1, 2], "sdf", 3, true);
// w.test(3, true);
module.exports = Writer;