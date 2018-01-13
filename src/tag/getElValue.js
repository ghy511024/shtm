class getElValue {
    constructor(data) {
        this.data = data || {};
    }

    getElValue(exp) {
        var exp_str;
        var reg = /\$\{(.*?)\}/gi
        exp.replace(reg, function (_, $1) {
            exp_str = $1;
        })
        let tmpData = this.data||{};
        let ret_value = null;
      var exp_array=  exp_str.split(".");
        for (let i = 0; i < exp_array.length; i++) {
            var c_key = exp_array[i];
            ret_value = tmpData[c_key];

            if (ret_value == null) {
                break;
            }
            tmpData = ret_value;
        }
        return ret_value;
    }
}

let d = {
    str: "str11",
    a1: [1, 2, "3"],
    a2: [{a: "2"}],
    o1: {ghy: "1"},
    o2: {

        o2_a1: ["ss", "s"],
        o2_s1: "sdf",
        o2_a3: [{bb: "sd"}],
        o2_o1: {xixi: "xixistr"}
    }
}
let a = new getElValue(d);
a.getElValue("${o2.o2_o1.xixi}");