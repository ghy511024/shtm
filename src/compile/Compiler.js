/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require("../generator/Generator-Api");
const JspReader = require("./JspReader");
const Parser = require("./Parser");
const path = require("path");
const StringWriter = require("../writer/StringWriter");
// const FileWriter = require("../writer/FileWriter");
const ServletWriter = require("../writer/ServletWriter")

// 测试
const ForEachImpl = require("../tag/funimpl/ForEachImpl")
const IfImpl = require("../tag/funimpl/IfImpl")
const IncludeImpl = require("../tag/funimpl/IncludeImpl")
const PageContext = require("../ctx/PageContext_fn")
const Mark = require("./Mark")

class Compiler {
    constructor(baseDir) {
        this.baseDir = baseDir
    }

    setBaseDir(baseDir) {
        this.baseDir = baseDir;
    }

    /*
     *
     *
     * **/

    getFnByFile(fileName) {
        var baseDir = fileName.slice(0, fileName.lastIndexOf(path.join("/")));
        let tmpstr = fs.readFileSync(fileName, "utf-8");
        var fnstr = this.getFnStrByTmpStr(tmpstr);

        return this.getFnByFnStr(tmpstr, fnstr)

    }


    getFnByTmpStr(tmpstr) {
        var fnstr = this.getFnStrByTmpStr(tmpstr);
        return this.getFnByFnStr(tmpstr, fnstr)

    }

    /**
     * fnstr 这个参数一般不传，通常是自定义调试的时候在test 函数中传过来，方便调试
     * @return {fnction}
     *
     * */
    getFnByFnStr(tmpstr, fnstr) {
        let pageNodes = this.getPageNode(null, null, tmpstr);
        if (fnstr == null) {
            fnstr = this.getFnStrByTmpStr(tmpstr);

        }
        var rundemo = new Function('data, option', fnstr);
        var option = {
            ForEachImpl: ForEachImpl,
            IfImpl: IfImpl,
            pageNodes: pageNodes,
            PageContext: PageContext
        }
        return function (data) {
            var option = {
                ForEachImpl: ForEachImpl,
                IfImpl: IfImpl,
                IncludeImpl: IncludeImpl,
                out: null,
                pageNodes: pageNodes,
                PageContext: PageContext,
                Mark: Mark
            }
            var strs = rundemo.call(data, data, option)
            return strs;
        }
    }

    getFnStrByTmpStr(tmpstr) {
        let pageNodes = this.getPageNode(null, null, tmpstr);
        let fn_stringWriter = new StringWriter();
        let fn_out = new ServletWriter(fn_stringWriter);
        Generator.generateFn(this, fn_out, pageNodes);
        let fnstr = fn_out.toString();
        return fnstr;
    }


    getModuleFnStr(tmpstr) {
        let pageNodes = this.getPageNode(null, null, tmpstr);
        let fn_stringWriter = new StringWriter();
        let fn_out = new ServletWriter(fn_stringWriter);
        Generator.generateFnAsModule(this, fn_out, pageNodes);
        let fnstr = fn_out.toString();
        return fnstr;
    }

    getPageNode(filename, parent, fileStr) {
        let pageNodes;
        let reader = new JspReader(fileStr);
        if (reader != null) {
            pageNodes = Parser.parse(reader, parent)
        }
        return pageNodes;
    }

}

module.exports = Compiler;