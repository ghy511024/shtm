const Compiler = require("../compile/Compiler")
const GenerateVisitor = require("./GenerateVisitor");
const GenerateVisitor_tree = require("./GenerateVisitor_tree");
const GenerateVisitor_for = require("./GenerateVisitor_for");
const GenerateVisitor_fn = require("./GenerateVisitor_fn");// 原始版本
const GenerateVisitor_fn2 = require("./GenerateVisitor_fn2");// 改进版本
const GenerateVisitor_fn3 = require("./GenerateVisitor_fn3");// 改进第三版版本

const ServletWriter = require("../../src/writer/ServletWriter");
const PageContext = require("../ctx/PageContext");

/**
 * @param outpath {String} 输出绝对路径
 * @param compiler {Compiler} 编译实例
 * @param page {Node.Nodes} 节点链表
 * @return
 */
class Generator {
    constructor(out) {
        this.out = out;
    }

    /**
     *  生成树用于dom 树分析用
     * */
    static generateTree(page) {
        let a = new GenerateVisitor_tree()
        page.visit(a);
        console.log(JSON.stringify(a.getTree()));
    }

    static generateStr(data, compiler, out, page, fileName) {
        let pageContext = new PageContext(data, fileName);
        page.visit(new GenerateVisitor(out, pageContext, compiler));
    }

    static generateFn(compiler, out, page) {
        let gen = new GenerateVisitor(out, null, compiler)
        page.visit(gen);
        gen.generatePostamble(page);
    }

    static generateFnAsModule( compiler, out, page,) {
        out.print("var fn = function (data, option) {");//测试的时候用
        let gen = new GenerateVisitor(out, null, compiler)
        page.visit(gen);
        gen.generatePostamble(page);
        out.print("};module.exports=fn");//测试的时候用
    }
}

module.exports = Generator;