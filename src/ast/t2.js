/**
 * Created by ghy on 2018/1/11.
 */

var data={
    a:"sss"
}
var str="with(data){console.log(a)}";
try {
    var fn = new Function('data', str);
    data.__proto__ = data.locals;
    fn.call(data.scope, data);
} catch (err) {
    console.log("sssssssss",err)
}
