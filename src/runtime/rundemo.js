/**
 * Created by ghy on 2018/1/16.
 */

var fn = function (data, option) {
    with (data || {}) {
        var ForEachIpml = option.ForEachIpml;
        var out = option.out;
        var pageNodes = option.pageNodes;
        service (pageNodes)
        function service (n) {
            out.print ("sdfsdf\n");
            if (for_each_0 (parent.list[0])) {
                return;
            }
        }

        function for_each_0 (n) {
            var foreachTag = new ForEachIpml ();
            try {
                foreachTag.setItems (list);// "${list1}"
                getvalue(list)
                var each_val = foreachTag.doStartTag ();
                if (each_val != foreachTag.SKIP_BODY) {
                    while (true) {
                        out.print ("sdfsdf\n");
                        out.print (name1);
                        if (for_each_1 (n.list[0])) {
                            return true;
                        }
                        let evalDoAfterBody = foreachTag.doAfterBody ();
                        if (evalDoAfterBody != foreachTag.EVAL_BODY_AGAIN) {
                            break;
                        }
                    }
                }
            }
            catch (e) {
                console.log (e);
            }
        }

        function for_each_1 (n) {
            return true;
        }
        function getValue(value){

        }
    }
};
module.exports = fn;
