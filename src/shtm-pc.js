const Compiler = require("./compile/Compiler_pc")
/**
 * 提供给pc 用,主要是与其他模板引擎跑性能对比
 *
 * */
class SHTM {
    constructor() {
        this.cp = new Compiler();
    }

    compile(tmpstr) {
        let fn = this.cp.getFnByStr(tmpstr);
        return fn;
    }
}
var shtm = new SHTM();
module.exports = shtm;