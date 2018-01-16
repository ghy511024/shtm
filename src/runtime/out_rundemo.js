var fn = function (data, option) {
    var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    with (data || {}) {

        var out = option.out;
        var pageNodes = option.pageNodes;
        service(pageNodes)
        function service(n) {
            out.print("<ul>\r\n    ");
            console.log(n.list[0].body.list,"bbbbbbbbbbbbbb")
            if (_js_meth_c_forEach_1(n.list[1])) {
                return true;
            }
            out.print("\r\n</ul>\r\n");
        };
// 开始输出函数体
        function _js_meth_c_forEach_1(n) {
            try {
//c:forEach

                let js_th_c_forEach_1 = new ForEachImpl()
                js_th_c_forEach_1.setItems(list);
                let each_val = js_th_c_forEach_1.doStartTag();
                if (each_val != js_th_c_forEach_1.SKIP_BODY);
                while (true) {
                    out.print("<li>\r\n            ");
                    console.log()
                    if (_js_meth_c_if_1(n.list[4])) {
                        return true;
                    }
                    out.print("\r\n            <p>");
                    out.print(item.name);
                    out.print("</p>\r\n            <ol>\r\n                ");
                    if (_js_meth_c_forEach_2(n.list[2])) {
                        return true;
                    }
                    out.print("\r\n            </ol>\r\n        </li>\r\n    ");
                    let evalDoAfterBody = eachtag.doAfterBody();
                    if (evalDoAfterBody != this.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
                if (_jspx_th_c_forEach_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
                    return true;
                }
            }
            catch (e) {
                console.log(e)
            }
            return false;
        }

// 开始输出函数体
        function _js_meth_c_if_1(n) {
            try {
//c:if

                let js_th_c_if_1 = new IfImpl()
                js_th_c_if_1.setTest(undefined);
                let each_val = js_th_c_if_1.doStartTag();
                if (each_val != js_th_c_if_1.SKIP_BODY);
                while (true) {
                    let evalDoAfterBody = eachtag.doAfterBody();
                    if (evalDoAfterBody != this.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
                if (_jspx_th_c_forEach_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
                    return true;
                }
            }
            catch (e) {
                console.log(e)
            }
            return false;
        }

// 开始输出函数体
        function _js_meth_c_forEach_2(n) {
            try {
//c:forEach

                let js_th_c_forEach_2 = new ForEachImpl()
                js_th_c_forEach_2.setItems(item.data);
                let each_val = js_th_c_forEach_2.doStartTag();
                if (each_val != js_th_c_forEach_2.SKIP_BODY);
                while (true) {
                    out.print("<li>\r\n                        ");
                    out.print(li);
                    out.print("\r\n                    </li>\r\n                ");
                    let evalDoAfterBody = eachtag.doAfterBody();
                    if (evalDoAfterBody != this.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
                if (_jspx_th_c_forEach_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
                    return true;
                }
            }
            catch (e) {
                console.log(e)
            }
            return false;
        }
    }
}
module.exports = fn