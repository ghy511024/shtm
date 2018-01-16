const Compiler = require("../compile/Compiler")
const GenerateVisitor = require("./GenerateVisitor");
const GenerateVisitor_tree = require("./GenerateVisitor_tree");
const GenerateVisitor_for = require("./GenerateVisitor_for");
const GenerateVisitor_fn = require("./GenerateVisitor_fn");
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

    static generateTree(page) {
        let a = new GenerateVisitor_tree()
        page.visit(a);
        console.log(JSON.stringify(a.getTree()));
    }


    /**
     * 最终线上express用的时候，会采用字符串形式输出
     * */
    static generateStr(data, compiler, out, page, fileName) {
        let pageContext = new PageContext(data, fileName);
        page.visit(new GenerateVisitor(out, pageContext, compiler));
    }

    static generateFor(data, compiler, out, page, fileName) {
        let pageContext = new PageContext(data, fileName);
        // page.visit(new GenerateVisitor(out, pageContext, compiler));
        let gen = new GenerateVisitor_for(out, pageContext, compiler);
        gen.visit2(page);

    }
    static generateFn(data, compiler, out, page, fileName) {
        let pageContext = new PageContext(data, fileName);
        let gen=new GenerateVisitor_fn(out, pageContext, compiler)
        page.visit(gen);
        gen.generatePostamble(page);
    }
}

module.exports = Generator;