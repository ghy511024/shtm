const Compiler = require("./compile/Compiler")

class JSTL {
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
    compile(filename, options, cb) {
        let retstr;
        try {
            let baseDir = (options.settings || {}).views;
            if (baseDir != null && this.cp.baseDir == null) {
                this.cp.setBaseDir(baseDir);
            }
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