/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require ("../generator/Generator-Api");
const JspReader = require ("./JspReader");
const Parser = require ("./Parser");
const path = require ("path");
const StringWriter = require ("../writer/StringWriter");
const ServletWriter = require ("../writer/ServletWriter")

// 测试
const ForEachImpl = require ("../tag/funimpl/ForEachImpl")
const IfImpl = require ("../tag/funimpl/IfImpl")
const IncludeImpl = require ("../tag/funimpl/IncludeImpl")
const PageContext = require ("../ctx/PageContext_fn")
const Mark = require ("./Mark")

class Compiler {
    constructor () {
    }

    /**
     * fnstr 这个参数一般不传，通常是自定义调试的时候在test 函数中传过来，方便调试
     * @return {fnction}
     *
     * */
    getFnByStr (tmpstr) {

        let pageNodes = this.getPageNode (tmpstr, null);
        let fnstr = this.getFnStrByPageNode (pageNodes);
        var rundemo = new Function ('data, option', fnstr);

        var option = {
            ForEachImpl: ForEachImpl,
            IfImpl: IfImpl,
            PageContext: PageContext
        }
        return function (data) {
            var option = {
                ForEachImpl: ForEachImpl,
                IfImpl: IfImpl,
                IncludeImpl: IncludeImpl,
                out: null,
                PageContext: PageContext,
            }
            var strs = rundemo.call (data, data, option)
            return strs;
        }
    }

    getBaseDir () {
    }

    getFnStrByPageNode (pageNodes) {
        let fn_stringWriter = new StringWriter ();
        let fn_out = new ServletWriter (fn_stringWriter);
        Generator.generateFn (this, fn_out, pageNodes);
        let fnstr = fn_out.toString ();

        return fnstr;
    }

    getPageNode (fileStr, parent) {
        let pageNodes;
        let reader = new JspReader (fileStr);
        if (reader != null) {
            pageNodes = Parser.parse (reader, parent)
        }
        return pageNodes;
    }

}

module.exports = Compiler;