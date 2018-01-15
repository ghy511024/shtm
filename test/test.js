/**
 * Created by ghy on 2017/11/17.
 */
const Compiler = require("../src/compile/Compiler")
const jstl = require("../src/shtm");
const path = require("path");
var T = {
    t1: function () {
        var dir = path.join(__dirname, "./jsp");
        let outPath = path.join(__dirname, "./out/xixi.jsp");

        let cp = new Compiler(dir)
        // cp.compileTofile ("x1.jsp", outPath)
        let data = {
            num1: "1",

        }
        let str = cp.compile("x1.jsp", data)
        console.log(str);
    },
    t2: function () {
        var jsppath = path.join(__dirname, "./view/demo.shtm");
        // var jsppath = path.join(__dirname, "./view/mapdemo.shtm");
        let data = {
            title: "smart html template",
            if_test1: true,
            if_testfalse: true,
            list: [
                {name: "北京", data: ["朝阳", "海淀"]},
                {name: "四川", data: ["新都", "龙泉", "天府广场"]}],
            maps: {key1: "value1", key2: "value2"},
            list2:["sc","bj"],
            nameMap: {sc: "四川", bj: "北京"},
        }
        let t1 = +new Date();
        for (let i = 0; i < 10000; i++) {
            jstl.compile (jsppath, data);
        }
        // let str = jstl.compile(jsppath, data);
        // console.log(str);
        console.log(+new Date() - t1);

    }
}
T.t2();