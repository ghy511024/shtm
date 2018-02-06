var ForEachImpl = option.ForEachImpl;
var IfImpl = option.IfImpl;
var IncludeImpl = option.IncludeImpl;
var pageContext = new option.PageContext(data);
var ghy_shtm_tmp_out_str = "";
with (data || {}) {
    var out = option.out;
    try {
        service()
    }
    catch (e) {
        throw  new Error(e);
    }
    function service(n) {
        ghy_shtm_tmp_out_str += "" + (title == null ? "" : title) + "\r\n"

        if (_js_meth_c_if_1()) {
            return true;
        }
        ghy_shtm_tmp_out_str += "\r\n"

        if (_js_meth_c_forEach_1()) {
            return true;
        }
        ghy_shtm_tmp_out_str += ""
    }

    function _js_meth_c_if_1(n) {
        let js_th_c_if_1 = new IfImpl();
        try {
//c:if
            js_th_c_if_1.setPageContext(pageContext);
            js_th_c_if_1.setErrInfo("ERROR:  position:(2,0)\r\n   1|${title}\r\n>> 2|<c:if test=\"${test1}\">test1</c:if>\r\n   3|<c:forEach items=\"${list}\" var=\"item\">\r\n");
            js_th_c_if_1.setTest(test1);
            let each_val = js_th_c_if_1.doStartTag();
            if (each_val != js_th_c_if_1.SKIP_BODY) {
                while (true) {
                    ghy_shtm_tmp_out_str += "test1"
                    let evalDoAfterBody = js_th_c_if_1.doAfterBody();
                    if (evalDoAfterBody != js_th_c_if_1.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_if_1.doEndTag() == js_th_c_if_1.SKIP_PAGE) {
                return true;
            }
        }
        catch (e) {
            var msg;
            if (typeof e == "string") {
                msg = e;
            } else {
                msg = js_th_c_if_1.getErrInfo();
            }
            throw msg;
            return true;
        }
        return false;
    }


    function _js_meth_c_forEach_1(n) {
        let js_th_c_forEach_1 = new ForEachImpl();
        try {
//c:forEach
            js_th_c_forEach_1.setPageContext(pageContext);
            js_th_c_forEach_1.setErrInfo("ERROR:  position:(3,0)\r\n   1|${title}\r\n   2|<c:if test=\"${test1}\">test1</c:if>\r\n>> 3|<c:forEach items=\"${list}\" var=\"item\">\r\n   4|    ${item.name}\r\n");
            js_th_c_forEach_1.setItems(list);
            js_th_c_forEach_1.setVar("item");
            let each_val = js_th_c_forEach_1.doStartTag();
            if (each_val != js_th_c_forEach_1.SKIP_BODY) {
                while (true) {
                    ghy_shtm_tmp_out_str += "" + (item.name == null ? "" : item.name) + ""

                    if (_js_meth_c_forEach_2()) {
                        return true;
                    }
                    ghy_shtm_tmp_out_str += ""
                    let evalDoAfterBody = js_th_c_forEach_1.doAfterBody();
                    if (evalDoAfterBody != js_th_c_forEach_1.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_forEach_1.doEndTag() == js_th_c_forEach_1.SKIP_PAGE) {
                return true;
            }
        }
        catch (e) {
            var msg;
            if (typeof e == "string") {
                msg = e;
            } else {
                msg = js_th_c_forEach_1.getErrInfo();
            }
            throw msg;
            return true;
        }
        return false;
    }


    function _js_meth_c_forEach_2(n) {
        let js_th_c_forEach_2 = new ForEachImpl();
        try {
//c:forEach
            js_th_c_forEach_2.setPageContext(pageContext);
            js_th_c_forEach_2.setErrInfo("ERROR:  position:(5,4)\r\n   3|<c:forEach items=\"${list}\" var=\"item\">\r\n   4|    ${item.name}\r\n>> 5|    <c:forEach items=\"${item.list}\" var=\"val\">\r\n   6|        -${val}\r\n");
            js_th_c_forEach_2.setItems(item.list);
            js_th_c_forEach_2.setVar("val");
            let each_val = js_th_c_forEach_2.doStartTag();
            if (each_val != js_th_c_forEach_2.SKIP_BODY) {
                while (true) {
                    ghy_shtm_tmp_out_str += "-" + (val == null ? "" : val) + ""
                    let evalDoAfterBody = js_th_c_forEach_2.doAfterBody();
                    if (evalDoAfterBody != js_th_c_forEach_2.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_forEach_2.doEndTag() == js_th_c_forEach_2.SKIP_PAGE) {
                return true;
            }
        }
        catch (e) {
            var msg;
            if (typeof e == "string") {
                msg = e;
            } else {
                msg = js_th_c_forEach_2.getErrInfo();
            }
            throw msg;
            return true;
        }
        return false;
    }

    return ghy_shtm_tmp_out_str;
}