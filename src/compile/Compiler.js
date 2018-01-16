/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require("../generator/Generator-Api");
const JspReader = require("./JspReader");
const Parser = require("./Parser2");
const path = require("path");
const StringWriter = require("../writer/StringWriter");
const ServletWriter = require("../writer/ServletWriter")

class Compiler {
    constructor(baseDir) {
        this.baseDir = baseDir
        this.cache = {};
    }

    setBaseDir(baseDir) {
        this.baseDir = baseDir;
    }

    /*
     * @param isfile{Boolean} 是否是文件
     *
     * **/
    compile(filename, data, fileStr) {
        let stringWriter = new StringWriter();
        let out = new ServletWriter(stringWriter);
        let pageNodes = this.getPageNode(filename, null, fileStr);
        // Generator.generateStr(data, this, out, pageNodes, filename);
        Generator.generateFor(data, this, out, pageNodes, filename);
        return out.toString();
    }

    getReader(fileName, fileStr) {
        let reader = new JspReader(this.baseDir, fileName, fileStr);
        return reader;
    }

    getPageNode(filename, parent, fileStr) {
        let pageNodes

        if (filename != null) {
            pageNodes = this.cache[filename];
            if (pageNodes == null) {
                console.log("vvvvvvvvvvvvvvvvvv")
                let reader = this.getReader(filename, fileStr);
                pageNodes = Parser.parse(reader, parent);
                this.cache[filename] = pageNodes;
            }
        } else {
            console.log("dddddddddd")
            let reader = this.getReader("", fileStr);
            pageNodes = Parser.parse(reader, parent);
            this.cache[filename] = pageNodes;
        }


        return pageNodes;
    }

}

module
    .exports = Compiler;