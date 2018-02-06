const Compiler = require("./compile/Compiler_node")
const fs = require("fs");
/**
 * 提供给node 用
 *
 * */
class SHTM {
    constructor() {
        this.cp = new Compiler();
        this.__express = this._express.bind(this);//express 插件
        this.cache = {};
    }


    /**
     *
     *@param filename {String} 文件名
     *@param options {Object} 文件名
     *@param cb {Function (err,str)} 回掉函数
     *@param fileStr{String} 有此字段 将忽略filename
     *@return fn {Function} (接收data 参数)
     *
     * */
    compile(filename, options) {
        let retstr = "";
        let fn = this.compileFileTofn(filename, false);
        retstr = fn(options);
        return retstr;
    }

    /**
     * 编译文件
     *
     * */
    compileFileTofn(filename, isCache) {
        let fn;
        if (isCache) {
            fn = this.cache[filename];
            if (fn == null) {
                fn = this.cp.getFnByFile(filename);
                if (fn != null) {
                    this.cache[filename] = fn;
                }
            }
        } else {
            fn = this.cp.getFnByFile(filename)
        }

        return fn;
    }

    setBaseDir(baseDir) {
        this.cp.setBaseDir(baseDir);
    }

    /**
     * express 专用
     *
     * 下面的参数是 express 传过来的
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
     'view engine': 'shtm' }
     *
     * */
    _express(fileName, options, cb) {
        let retstr;
        try {
            let baseDir = (options.settings || {}).views;
            if (baseDir != null && this.cp.baseDir == null) {
                this.cp.setBaseDir(baseDir);
            }
            let fn = this.compileFileTofn(fileName, false);// 暂时不加缓存
            retstr = fn(options);
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
    }
}
module.exports = new SHTM();