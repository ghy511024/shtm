/**
 * Created by ghy on 2017/11/17.
 */
const Compiler = require("../src/compile/Compiler")
const shtm = require("../src/shtm");
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
    /**
     * 直接编译文件成字符串
     *
     * */
    t1: function () {
        var filename = path.join(__dirname, "./view/demo.shtm");
        var str = shtm.compile(filename, data);
        console.log(str)
    }

}
T.t1();