/**
 * 将模板字符串编译为tree 方便调试
 */
const Compiler_node = require("../../src/compile/Compiler_node");
const Generator = require("../../src/generator/Generator");
const path = require("path");
describe("Compiler_node_tree", function () {
    let cp = new Compiler_node();

    it("simple demo", function () {
        let p1 = path.join(__dirname, "../demo/custom-forEach_simple.shtm");
        let pageNode = cp.getPageNode(p1, null);
        let tree = Generator.generateTree(pageNode);
        // console.log("ghy", JSON.stringify(tree));
    });

})