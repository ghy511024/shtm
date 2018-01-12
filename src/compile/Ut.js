/**
 * Created by ghy on 2017/11/17.
 */
var Ut = {
    arrayContain: function (array, item) {
        var ret = false;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === item) {
                ret = true;
                break;
            }
        }
        return ret;
    },
    getIndexFromArray(array, item) {
        let ret = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === item) {
                ret = i;
                break;
            }
        }
        return ret;
    },
    isLetter(ch) {
        //todo 校验是否为字母,需要优化
        return /[A-Za-z]/.test(ch);
    },
    isDigit(ch) {
        //todo 校验是否为数字,需要优化
        return /0-9/.test(ch);
    }
}
module.exports = Ut;