const Compiler = require("./compile/Compiler")

class JSTL {
    constructor() {
        this.cp = new Compiler();
        this.__express = this._express;//express 插件
    }

    compile(filename, options, cb) {
        let retstr;
        try {
            retstr = this.cp.compile(filename, options);
            if (typeof cb === "function") {
                cb(null, retstr);
            }
        }
        catch (e) {
            retstr = e;
            if (typeof cb === "function") {
                cb(e);
            }
        }
        finally {
            return retstr;
        }
    }
    setBaseDir(baseDir) {
        this.cp.setBaseDir(baseDir);
    }

    _express(filename, options, cb) {
        this.compile(filename, options, cb)
    }
}

module.exports = new JSTL();