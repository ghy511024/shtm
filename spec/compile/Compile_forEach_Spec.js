/**
 * Created by ghy on 2018/2/2.
 */
const Compiler_node = require("../../src/compile/Compiler_node");
const path = require("path");
describe("Compiler_node", function () {
    let cp = new Compiler_node();
    /**
     * 三种遍历，验证输出准确性和输出顺序
     * */
    it("foreach-simple", function () {
        let p1 = path.join(__dirname, "../demo/custom-forEach_simple.shtm");
        let fn = cp.getFnByFile(p1);
        var data = {
            list: [
                {list: ["1", "2"]},
                {list: "3,4"}
            ],
            maps: {key1: "5"},
            str: "str1,str2"
        }
        let str = fn(data);
        str = str.replace(/(?:\s|\n)/g, "");
        expect(str).toBe("begin-1234-map-5-str-str1str2-end");
    });
    /**
     * 验证begin end index
     * */
    it("foreach-begin-end-index", function () {
        let p1 = path.join(__dirname, "../demo/custom-forEach_begin_end_index.shtm");
        let fn = cp.getFnByFile(p1);
        var data = {
            list: [1, 2, 3, 4],
        }
        let str = fn(data);
        str = str.replace(/(?:\s|\n)/g, "");
        expect(str).toBe("a3a4b4c1c2d4ef1f2f3f4g1g2g3g4");
    });

    /**
     * 验证begin end index
     * */
    it("foreach-cover", function () {
        let p1 = path.join(__dirname, "../demo/custom-forEach_value_cover.shtm");
        let fn = cp.getFnByFile(p1);
        var data = {
            cindex: 666,
            title: "outer",
            list: [{title: "inner1"}]
        }
        let str = fn(data);
        str = str.replace(/(?:\s|\n)/g, "");
        expect(str).toBe("outer-666-inner1-1-outer-666");
    });
})