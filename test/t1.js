/**
 * Created by ghy on 2017/11/17.
 */
const Compiler = require ("../src/compile/Compiler")
const jstl = require ("../src/ptl");
const path = require ("path");
var T = {
    t1: function () {
        var dir = path.join (__dirname, "./jsp");
        let outPath = path.join (__dirname, "./out/xixi.jsp");

        let cp = new Compiler (dir)
        // cp.compileTofile ("x1.jsp", outPath)
        let data = {
            num1: "1",
            list1: [
                { a: [1, true,] },
                { a: [{ "x": "dd" }, [1, 2, 3]] }]
        }
        let str = cp.compile ("x1.jsp", data)
        console.log (str);
    },
    t2: function () {
        var jsppath = path.join (__dirname, "./jsp/x1.jsp");
        jstl.setBaseDir (path.join (__dirname, "./jsp"))
        let data = {
            num1: "1",
            list1: [
                { a: [1, true,] },
                { a: [{ "x": "dd" }, [1, 2, 3]] }],
            maps: { ghy: "1", xixi: 2 }
        }
        // let t1 = +new Date ();
        // for (let i = 0; i < 10000; i++) {
        //     jstl.compile (jsppath, data);
        // }
        // console.log (+new Date () - t1);
        let str = jstl.compile (jsppath, data);
        console.log (str);
    }
}
T.t2 ();