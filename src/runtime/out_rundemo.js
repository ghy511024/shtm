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
        ghy_shtm_tmp_out_str += "<ul>\r\n    "

        if (_js_meth_c_forEach_1()) {
            return true;
        }
        ghy_shtm_tmp_out_str += "\r\n</ul>"
    }

    function _js_meth_c_forEach_1(n) {
        let js_th_c_forEach_1 = new ForEachImpl();
        try {
//c:forEach
            js_th_c_forEach_1.setPageContext(pageContext);
            js_th_c_forEach_1.setItems(list);
            js_th_c_forEach_1.setVar("item");
            var each_val = js_th_c_forEach_1.doStartTag();
            if (each_val != js_th_c_forEach_1.SKIP_BODY) {
                while (true) {


                    ghy_shtm_tmp_out_str += "<li>" + _value.user + "/Web Site:" + _value.site + "</li>\r\n    "
                    let evalDoAfterBody = js_th_c_forEach_1.doAfterBody();
                    if (evalDoAfterBody !== 2) {
                        break;
                    }
                }
            }
            //     if (js_th_c_forEach_1.doEndTag() == js_th_c_forEach_1.SKIP_PAGE) {
            //     return true;
            // }
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

    return ghy_shtm_tmp_out_str;
}