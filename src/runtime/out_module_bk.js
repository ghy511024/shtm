var fn = function (data, option) {
    var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    var Mark = option.Mark;
    var pageContext = new option.PageContext(data);
    var str = "";
    let foreachImpl = new ForEachImpl();
    let ifImpl = new IfImpl();
    foreachImpl.setPageContext(pageContext);
    ifImpl.setPageContext(pageContext);
    with (data || {}) {
// console.log("ghy");
        var out = option.out;
        var pageNodes = option.pageNodes;
        try {
            service(pageNodes.list[0])
        }
        catch (e) {
            str = e.message;
        }
        function service(n) {
            str += "=========before==========\r\n";
            if (_js_meth_c_forEach_1(n.body.list[2])) {
                return true;
            }
            str += "\r\n=========after==========";
        };

        function _js_meth_c_forEach_1(n) {
            try {
//c:forEach
                let js_th_c_forEach_1 = foreachImpl;
                js_th_c_forEach_1.setItems(list);
                js_th_c_forEach_1.setVar("item");
                let each_val = js_th_c_forEach_1.doStartTag();
                if (each_val != js_th_c_forEach_1.SKIP_BODY) {
                    while (true) {
                        str += "<li>" + item.user + "/Web Site:" + item.site + "</li>\r\n";
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
                var msg = getErrInfo(n);
                throw  new Error(msg);
            }
            return false;
        }
    }

    function getErrInfo(node) {
        let mark = node.startMark;
        let line = mark.line;
        let col = mark.col;
        let name = mark.name;
        let preline = 2;
        let nextline = 2;
        var msginfo = "ERROR: " + " position:(" + line + "," + col + ")\n";

        let sline = Math.max(mark.line - preline, 1)
        let retstr = "";
        for (let i = sline; i < mark.line; i++) {
            let start = Mark.newMark(mark);
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

    return str;
};
module.exports = fn