var fn = function (data, option) {
    var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    with (data || {}) {

        var out = option.out;
        var pageNodes = option.pageNodes;
        service (pageNodes.list[0])
        function service (n) {
            out.print ("<ul>\r\n    ");
            if (_js_meth_c_forEach_1 (n.body.list[2])) {
                return true;
            }
            out.print ("\r\n</ul>\r\n");
        };
// 开始输出函数体
        function _js_meth_c_forEach_1 (n) {
            try {
//c:forEach

                let js_th_c_forEach_1 = new ForEachImpl ()
                js_th_c_forEach_1.setItems (list);
                let each_val = js_th_c_forEach_1.doStartTag ();
                if (each_val != js_th_c_forEach_1.SKIP_BODY) {
                    while (true) {
                        out.print ("<li>\r\n            ");
                        if (_js_meth_c_if_1 (n.body.list[2])) {
                            return true;
                        }
                        out.print ("\r\n            <p>");
                        data["item"] = { name: "ghy" };
                        out.print (item.name);
                        out.print ("</p>\r\n            <ol>\r\n                ");
                        if (_js_meth_c_forEach_2 (n.body.list[6])) {
                            return true;
                        }
                        out.print ("\r\n            </ol>\r\n        </li>\r\n    ");
                        let evalDoAfterBody = js_th_c_forEach_1.doAfterBody ();
                        if (evalDoAfterBody != this.EVAL_BODY_AGAIN) {
                            break;
                        }
                    }
                }
                if (js_th_c_forEach_1.doEndTag () == js_th_c_forEach_1.SKIP_PAGE) {
                    return true;
                }
            }
            catch (e) {
                console.log (e)
            }
            return false;
        }

// 开始输出函数体
        function _js_meth_c_if_1 (n) {
            try {
//c:if

                let js_th_c_if_1 = new IfImpl ()
                js_th_c_if_1.setTest (if_test1 || 3 < 2);
                let each_val = js_th_c_if_1.doStartTag ();
                if (each_val != js_th_c_if_1.SKIP_BODY) {
                    while (true) {
                        let evalDoAfterBody = js_th_c_if_1.doAfterBody ();
                        if (evalDoAfterBody != this.EVAL_BODY_AGAIN) {
                            break;
                        }
                    }
                }
                if (js_th_c_if_1.doEndTag () == js_th_c_if_1.SKIP_PAGE) {
                    return true;
                }
            }
            catch (e) {
                console.log (e)
            }
            return false;
        }

// 开始输出函数体
        function _js_meth_c_forEach_2 (n) {
            try {
//c:forEach

                let js_th_c_forEach_2 = new ForEachImpl ()
                js_th_c_forEach_2.setItems (item.data);
                let each_val = js_th_c_forEach_2.doStartTag ();
                if (each_val != js_th_c_forEach_2.SKIP_BODY) {
                    while (true) {
                        out.print ("<li>\r\n                        ");
                        out.print (li);
                        out.print ("\r\n                    </li>\r\n                ");
                        let evalDoAfterBody = js_th_c_forEach_2.doAfterBody ();
                        if (evalDoAfterBody != this.EVAL_BODY_AGAIN) {
                            break;
                        }
                    }
                }
                if (js_th_c_forEach_2.doEndTag () == js_th_c_forEach_2.SKIP_PAGE) {
                    return true;
                }
            }
            catch (e) {
                console.log (e)
            }
            return false;
        }
    }
}
module.exports = fn