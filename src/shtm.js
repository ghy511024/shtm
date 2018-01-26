const Compiler = require("./compile/Compiler")
const fs = require("fs");
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
    compile(filename,options, fileStr) {
        let retstr = "";
        let fn = function () {
        };
        if (filename != null) {
            fn = this.compileFileTofn(filename, false);
        } else if (fileStr != null) {
            fn = this.compileStringTofn(fileStr);
        }
        retstr = fn(options);
        return retstr;
    }

    /**
     * 编译文件
     *
     * */
    compileFileTofn(filename, isCache) {
        let fileStr;
        if (isCache) {
            fileStr = this.cache[filename];
            if (fileStr == null) {
                fileStr = fs.readFileSync(filename, "utf-8");
                if (fileStr != null) {
                    this.cache[filename] = fileStr;
                }
            }
        } else {
            fileStr = fs.readFileSync(filename, "utf-8");
        }

        return this.compileStringTofn(fileStr)
    }

    compileStringTofn(fileStr) {
        return this.cp.compileTofn(fileStr)
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
    _express(filename, options, cb) {
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