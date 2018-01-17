const Compiler = require("./compile/Compiler")

class SHTM {
    constructor() {
        this.cp = new Compiler();
        this.__express = this._express.bind(this);//express 插件
    }

    /**
     * { 'x-powered-by': true,
     etag: 'weak',
     'etag fn': [Function: generateETag],
     env: 'development',
     'query parser': 'extended',
     'query parser fn': [Function: parseExtendedQueryString],
     'subdomain offset': 2,
     'trust proxy': false,
     'trust proxy fn': [Function: trustNone],
     view: [Function: View],
     views: 'E:\\develop\\workspace\\sdhz\\sdhz\\views',
     'jsonp callback name': 'callback',
     'view engine': 'ptl' }
     *
     * */
    compileFile(fileName, options, cb, fileStr) {
        let retstr;
        try {
            let baseDir = (options.settings || {}).views;
            if (baseDir != null && this.cp.baseDir == null) {
                this.cp.setBaseDir(baseDir);
            }
            retstr = this.cp.compile(fileName, options, fileStr);
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

    compile(fileStr) {
        return this.cp.compileFn(null, null, fileStr);
    }

    setBaseDir(baseDir) {
        this.cp.setBaseDir(baseDir);
    }

    _express(filename, options, cb) {
        this.compileFile(filename, options, cb)
    }
}
module.exports = new SHTM();