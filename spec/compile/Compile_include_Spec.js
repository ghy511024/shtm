/**
 * Created by ghy on 2018/2/2.
 */
const Compiler_node = require ("../../src/compile/Compiler_node");
const path = require ("path");
describe ("Compiler_include", function () {
    let cp = new Compiler_node ();

    it ("simple demo", function () {
        let p1 = path.join (__dirname, "../demo/comstom-include.shtm");
        let fn = cp.getFnByFile (p1);
        let str = fn ({});
        // console.log("include",str)
        // expect (str).toBe ("abcdefghijklmnopqrstuvwxyz~!#$%^&*()_+`1234567890-=\\;'\"<>?");
    });

})