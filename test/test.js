/**
 * Created by ghy on 2017/11/17.
 */
const Compiler = require("../src/compile/Compiler")
const jstl = require("../src/shtm");
const path = require("path");
const fs = require("fs");
let data = {
    title: "smart html template",
    if_test1: true,
    if_test2: false,
    list: [
        {name: "北京", data: ["朝阳", "海淀"]},
        {name: "四川", data: ["新都", "龙泉", "天府广场"]}],
    maps: {key1: "value1", key2: "value2"},
    list2: ["sc", "bj"],
    nameMap: {sc: "四川", bj: "北京"},
}

var T = {
    t1: function () {
        var dir = path.join(__dirname, "./jsp");
        let outPath = path.join(__dirname, "./out/xixi.jsp");

        let cp = new Compiler(dir)
        // cp.compileTofile ("x1.jsp", outPath)
        let data = {
            num1: "1",

        }
        let str = cp.getFnByTmpStr("x1.jsp", data)
        console.log(str);
    },
    t2: function () {
        var jsppath = path.join(__dirname, "./view/demo2.shtm");
        // var jsppath = path.join(__dirname, "./view/demo.shtm");
        // var jsppath = path.join(__dirname, "./view/mapdemo.shtm");

        let t1 = +new Date();
        for (let i = 0; i < 10; i++) {
            jstl.compile(jsppath, data);
        }
        // let str = jstl.getFnByTmpStr(jsppath, data);
        // console.log(str);
        console.log(+new Date() - t1);
    }
    , t3: function () {
        var str = fs.readFileSync(path.join(__dirname, "./view/demo.shtm"), "utf-8")
        // console.log(str)
        let t1 = +new Date();
        let outstr = ""
        for (let i = 0; i < 1000; i++) {
            outstr = jstl.compile("bbbbbbbb", data, null, str);
        }
        // let outstr = jstl.getFnByTmpStr(null, data,null,str);
        console.log(outstr);
        console.log(+new Date() - t1);
    }
    , t4: function () {
        var Compiler = require("../src/compile/Compiler_cfn")
        var cp = new Compiler();
        var str = fs.readFileSync(path.join(__dirname, "./view/demo.shtm"), "utf-8")
        let outstr = cp.compileTest(null, data, str);
        console.log(outstr);
    }
    , t5: function () {
        var Compiler = require("../src/compile/Compiler")
        var cp = new Compiler();
        git
        var str = fs.readFileSync(path.join(__dirname, "./view/demo.shtm"), "utf-8")
        let t1 = +new Date();
        let outstr;
        var fn = cp.compileFn(null, data, str);
        // for (let i = 0; i < 10000; i++) {
        //     // var fn=cp.compileFn (null, data, str);
        outstr = fn(data);
        // }
        // let outstr = cp.compileTest (null, data, str);
        console.log(outstr);
        console.log(+new Date() - t1);
    }
    /**
     *生成函数
     *
     * */
    , t6: function () {
        var Compiler = require("../src/compile/Compiler_cfn")
        var cp = new Compiler();
        var str = fs.readFileSync(path.join(__dirname, "./view/demo2.shtm"), "utf-8")
        let t1 = +new Date();
        cp.compileModuleFile(null, data, str);
        console.log("getFnByTmpStr time:", +new Date() - t1);
    },
    t7: function () {
        var Compiler = require("../src/compile/Compiler_cfn")
        var cp = new Compiler();
        var str = fs.readFileSync(path.join(__dirname, "./view/demo2.shtm"), "utf-8")
        var fn = cp.compileFnByFile(null, data, str);
        let outstr;
        let t1 = +new Date();
        // for (let i = 0; i < 100000; i++) {
        // var fn = cp.compileFn (null, data, str);
        outstr = fn(data);
        // }
        console.log(outstr);
        console.log("getFnByTmpStr time:", +new Date() - t1);
    },
    t8: function () {
        var Compiler = require("../src/compile/Compiler_cfn")
        var cp = new Compiler();
        var str = fs.readFileSync(path.join(__dirname, "./view/demo2.shtm"), "utf-8")
        let t1 = +new Date();
        cp.compileModuleFile3(null, data, str);
        console.log("getFnByTmpStr time:", +new Date() - t1);
    }
}
// T.t3 ();
// T.t4 ();
// T.t5 ();
// T.t6 ();
T.t7();
// T.t8();