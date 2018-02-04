var ForEachImpl = option.ForEachImpl;
var IfImpl = option.IfImpl;
var IncludeImpl = option.IncludeImpl;
var Mark = option.Mark;
var pageContext = new option.PageContext(data);
var ghy_shtm_tmp_out_str = "";
with (data || {}) {
    var out = option.out;
    var pageNodes = option.pageNodes;
    try {
        service(pageNodes.list[0])
    }
    catch (e) {
        str = e.message;
    }
    function service(n) {
        ghy_shtm_tmp_out_str += "asdf\r\n"

        if (_js_meth_c_include_1(n.body.list[1])) {
            return true;
        }
        ghy_shtm_tmp_out_str += "\r\nasddddddddd"
    }

    function _js_meth_c_include_1(n) {
        try {
//c:include
            let js_th_c_include_1 = new IncludeImpl();
            js_th_c_include_1.setPageContext(pageContext);

            let each_val = js_th_c_include_1.doStartTag();
            if (each_val != js_th_c_include_1.SKIP_BODY) {
                while (true) {
                    ghy_shtm_tmp_out_str += "<div class=\"header-wrap\">\r\n    <div class=\"header-inner\">\r\n        <a href=\"/\"> <div class=\"logo\"></div></a>\r\n        <div class=\"menu-wrap\">\r\n            <a href=\"/about\">关于我们</a>\r\n            <a href=\"/contact\">站长合作</a>\r\n        </div>\r\n    </div>\r\n</div>"
                    let evalDoAfterBody = js_th_c_include_1.doAfterBody();
                    if (evalDoAfterBody != js_th_c_include_1.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_include_1.doEndTag() == js_th_c_include_1.SKIP_PAGE) {
                return true;
            }
        }
        catch (e) {
            var msg = getErrInfo(n);
            msg += e;
            ghy_shtm_tmp_out_str = msg;
            return true;
        }
        return false;
    }

    function getErrInfo(node) {
        var mark = node.startMark;
        var line = mark.line;
        var col = mark.col;
        var name = mark.name;
        var preline = 2;
        var nextline = 2;
        var msginfo = "ERROR: " + " position:(" + line + "," + col + ")\r\n";

        var sline = Math.max(mark.line - preline, 1)
        var retstr = "";
        for (let i = sline; i < mark.line; i++) {
            var start = Mark.newMark(mark);
            start.resetLine(i);
            retstr += ("   " + i + "|" + mark.reader.getTextline(start, i));
        }
        let cmark = Mark.newMark(mark);
        cmark.resetLine(mark.line);
        retstr += (">> " + cmark.line + "|" + cmark.reader.getTextline(cmark, cmark.line));
        for (let i = 1; i < nextline; i++) {
            let start = Mark.newMark(mark);
            start.resetLine(mark.line + i);
            retstr += "   " + start.line + "|" + mark.reader.getTextline(start, start.line)
        }
        return msginfo + retstr;
    }

    return ghy_shtm_tmp_out_str;
}