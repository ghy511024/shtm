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
let shtm = new SHTM();
console.log(typeof window)
if (typeof window != "undefined") {
    window.shtm = shtm;
}
// module.exports=window.shtm;
module.exports = shtm;