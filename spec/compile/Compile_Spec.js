/**
 * Created by ghy on 2018/2/2.
 */
const Compiler_node = require("../../src/compile/Compiler_node");
const path = require("path");
describe("Compiler_node", function () {
    let cp = new Compiler_node();

    it("simple demo", function () {
        let p1 = path.join(__dirname, "../demo/text-simple.shtm");
        let fn = cp.getFnByFile(p1);
        let str = fn({});
        expect(str).toBe("abcdefghijklmnopqrstuvwxyz~!#$%^&*()_+`1234567890-=\\;'\"<>?");
    });

    it("el-basic", function () {
        let p1 = path.join(__dirname, "../demo/el-basic.shtm");
        let fn = cp.getFnByFile(p1);
        let str = fn({message: "shtm"});
        expect(str).toBe("<p>hello shtm</p>");
    });

    it("custom-if", function () {
        let p1 = path.join(__dirname, "../demo/custom-if.shtm");
        let fn = cp.getFnByFile(p1);
        let str = fn({test1: true, test2: false, test3: 1});
        str = str.replace(/(?:\s|\n)/g, "");
        expect(str).toMatch("t1");
        expect(str).not.toMatch("t2");
        expect(str).not.toMatch("t3");
        expect(str).toMatch("t4");
        expect(str).not.toMatch("t5");
        expect(str).not.toMatch("t6");
        expect(str).toMatch("t7");
    });
})