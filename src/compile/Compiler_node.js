/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require("../generator/Generator-Api");
const JspReader = require("./JspReader");
const Parser = require("./Parser");
const path = require("path");
const fs = require("fs");
const StringWriter = require("../writer/StringWriter");
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
        this.tempDir = "";
    }

    setBaseDir(baseDir) {
        this.baseDir = baseDir;
    }

    setTempDir(filename) {
        this.tempDir = filename.slice(0, fileName.lastIndexOf(path.join("/")));
    }

    getBaseDir() {
        return this.tempDir == "" ? this.baseDir : this.tempDir;
    }

    /**
     * fnstr 这个参数一般不传，通常是自定义调试的时候在test 函数中传过来，方便调试
     * @return {fnction}
     *
     * */
    getFnByFile(fileName) {
        var baseDir = fileName.slice(0, fileName.lastIndexOf(path.join("/")));
        var shortFileName=fileName.slice(fileName.lastIndexOf(path.join("/"))+1,fileName.length);
        this.setBaseDir(baseDir);

        let pageNodes = this.getPageNode(fileName, null);
        let fnstr = this.getFnStrByPageNode(pageNodes);
        var outdir = path.join(__dirname, "../../debug/" + shortFileName + ".js");
        fs.writeFileSync(outdir, fnstr);
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

    getFnStrByPageNode(pageNodes) {
        let fn_stringWriter = new StringWriter();
        let fn_out = new ServletWriter(fn_stringWriter);
        Generator.generateFn(this, fn_out, pageNodes);
        let fnstr = fn_out.toString();

        return fnstr;
    }

    getPageNode(filename, parent, fileStr) {
        let pageNodes;
        if (filename != null) {
            fileStr = fs.readFileSync(filename, "utf-8");
        }
        let reader = new JspReader(fileStr);
        if (reader != null) {
            pageNodes = Parser.parse(reader, parent)
        }
        return pageNodes;
    }

}

module.exports = Compiler;