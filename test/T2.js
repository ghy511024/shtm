/**
 * Created by ghy on 2017/11/17.
 */
const Compiler_node = require("../src/compile/Compiler_node")
const shtm = require("../src/shtm");
const shtm_pc = require("../src/shtm-pc");
const path = require("path");
const fs = require("fs");
let data = {
    // title: "smart html template",
    // if_test1: true,
    // if_test2: false,
    // list: [
    //     {name: "北京", data: ["朝阳", "海淀"], key: "key1"},
    //     {name: "四川", data: ["新都", "龙泉", "天府广场"], key: "key2"}],
    // maps: {key1: "value1", key2: "value2"},
    // list2: ["sc", "bj"],
    // nameMap: {sc: "四川", bj: "北京"},
    list: [
        {list: ["1", "2"]},
        {list: "3,4"}
    ],
    maps: {key1: "5"},
    str: "str1,str2,str3,str4"
}



var T = {
    /**
     * 直接编译文件成字符串
     *
     * */
    t1: function () {
        var filename = path.join(__dirname, "./view/home/home.shtm");
        // var filename = path.join(__dirname, "../spec/demo/custom-forEach_simple.shtm");
        var str = shtm.compile(filename, data);
        console.log(str);
    },
    // 将js 文件解析执行，调试用
    t2: function () {
        const cp = new Compiler();
        var tmpfile = path.join(__dirname, "./view/demo2.shtm");
        var fnfile = path.join(__dirname, "../src/runtime/out_rundemo.js");

        var tmpstr = fs.readFileSync(tmpfile, "utf-8")
        var fnstr = fs.readFileSync(fnfile, "utf-8")

        var fn = cp.getFnByFile(tmpstr, fnstr);
        var str = fn(data);
        console.log(str);
    }

}
// 专门用来编译为js 文件调试
var C = {
    t1: function () {
        const cp = new Compiler_node();
        // var filename = path.join(__dirname, "./view/demo_include.shtm");
        // var filename = path.join(__dirname, "./view/demo2.shtm");
        var filename = path.join(__dirname, "../spec/demo/custom-forEach_simple.shtm");
        var outfile = path.join(__dirname, "../src/runtime/out_rundemo.js");
        let pagenode = cp.getPageNode(filename);
        var fnstr = cp.getFnStrByPageNode(pagenode);
        fs.writeFileSync(outfile, fnstr);
        // console.log (fnstr);
    }
}
var PC = {
    t1: function () {
        var tmpfile = path.join(__dirname, "./view/demo2.shtm");
        // var tmpfile = path.join(__dirname, "../spec/demo/custom-forEach_simple.shtm");
        var tmpstr = fs.readFileSync(tmpfile, "utf-8")
        var fn = shtm_pc.compile(tmpstr);
        var str = fn(data);
        console.log(str)
    }
}
// C.t1();
// T.t1();
// T.t2 ();
PC.t1();
