/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require ("../generator/Generator-Api");
const JspReader = require ("./JspReader");
const Parser = require ("./Parser2");
const path = require ("path");
const StringWriter = require ("../writer/StringWriter");
const FileWriter = require ("../writer/FileWriter");
const ServletWriter = require ("../writer/ServletWriter")

// 测试
const rundemo = require ("../runtime/out_rundemo")
const ForEachImpl = require ("../tag/funimpl/ForEachImpl")

class Compiler {
    constructor (baseDir) {
        this.baseDir = baseDir
        this.cache = {};
    }

    setBaseDir (baseDir) {
        this.baseDir = baseDir;
    }

    /*
     * @param isfile{Boolean} 是否是文件
     *
     * **/
    compile (filename, data, fileStr) {
        let stringWriter = new StringWriter ();
        let out = new ServletWriter (stringWriter);
        let pageNodes = this.getPageNode (filename, null, fileStr);
        // Generator.generateStr(data, this, out, pageNodes, filename);
        Generator.generateFor (data, this, out, pageNodes, filename);
        return out.toString ();
    }

    /*
     * @param isfile{Boolean} 是否是文件
     *
     * **/
    compileTest (filename, data, fileStr) {
        let stringWriter = new StringWriter ();
        let out = new ServletWriter (stringWriter);
        // let fileWriter = new FileWriter (path.join(__dirname,"../runtime/out_rundemo.js"));
        // let out = new ServletWriter (fileWriter);

        let pageNodes = this.getPageNode (filename, null, fileStr);
        if(pageNodes==null){
            console.log("获取节点错误",filename,fileStr)
            return "";
        }
        // Generator.generateFn (data, this, out, pageNodes, filename);


        rundemo.call (data,data, {
            ForEachImpl: ForEachImpl,
            out: out,
            pageNodes: pageNodes
        })
        return out.toString ();
    }

    getReader (fileName, fileStr) {
        let reader = new JspReader (this.baseDir, fileName, fileStr);
        return reader;
    }

    getPageNode (filename, parent, fileStr) {
        let pageNodes

        if (filename != null) {
            pageNodes = this.cache[filename];
            if (pageNodes == null) {
                let reader = this.getReader (filename, fileStr);
                pageNodes = Parser.parse (reader, parent);
                this.cache[filename] = pageNodes;
            }
        } else {
            let reader = this.getReader (filename, fileStr);
            if(reader!=null){
                console.log("bbbbbbbbbbbb")
                pageNodes = Parser.parse (reader, parent)
            }
        }
        return pageNodes;
    }

}

module
    .exports = Compiler;