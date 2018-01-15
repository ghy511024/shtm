/**
 * Created by ghy on 2018/1/15.
 */
var reg = /([^1-9]){1,}/gi
var str = "sdfsdf123123asdf"
console.log (str.replace (reg, ""));

// with 关键字，市面上的模版引擎基本都采用这套方案，代码量少，使用简单，其实最终执行环境还是走AST 那一套


function getElvalue (el, data) {
    let str = "with(data||{}){return " + el + "}";
    let value = null;
    try {
        let fn = new Function ('ctx', str);
        let value = fn.call (data, data) || "";
        return value;
    }
    catch (e) {

    }
}

var reg = /\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g;
var data = { name: "老王", list: [1, 2, 3, 4, 5] };
var tmp = "老铁：{{@list}}6{{/@list}}"
var str = tmp.replace (reg, function (_, $1, $2, $3, $4) {
    var tmp = "";
    data[$3].forEach (function (i) {
        tmp += $4;
    });
    return tmp;
})
console.log (str)//老铁：66666

var data = { test1: 2, test2: 3 };
var str = "test1=2&&5>3||false"

function getValue (el, data) {
    var str = "with(data||{}){return " + el + "}";
    var fn = new Function ('ctx', str);
    var value = fn.call (data, data) || "";
    return value;
};

var p={
    "type": "Program",
    "body": [
    {
        "type": "ExpressionStatement",
        "expression": {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": {
                "type": "Identifier",
                "name": "test1"
            },
            "right": {
                "type": "LogicalExpression",
                "operator": "&&",
                "left": {
                    "type": "Literal",
                    "value": 2,
                    "raw": "2"
                },
                ...
            }
        }
    }
],
}
