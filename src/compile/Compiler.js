/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require("../generator/Generator-Api");
const JspReader = require("./JspReader");
const Parser = require("./Parser2");
const path = require("path");
const StringWriter = require("../writer/StringWriter");
// const FileWriter = require("../writer/FileWriter");
const ServletWriter = require("../writer/ServletWriter")

// 测试
// const rundemo = require("../runtime/out_rundemo")
const rundemo_str = require("../runtime/str_rundemo")
const ForEachImpl = require("../tag/funimpl/ForEachImpl")
const IfImpl = require("../tag/funimpl/IfImpl")
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
     * @return 执行函数
     *
     * **/
    compileTofn(fileStr) {


        let pageNodes = this.getPageNode(null, null, fileStr);
        var fnstr = this.getFnStr(pageNodes);
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
                out: null,
                pageNodes: pageNodes,
                PageContext: PageContext,
                Mark: Mark
            }
            var strs = rundemo.call(data, data, option)
            return strs;
        }
    }

    getFnStr(pageNodes) {
        let fn_stringWriter = new StringWriter();
        let fn_out = new ServletWriter(fn_stringWriter);
        Generator.generateFn( this, fn_out, pageNodes);
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