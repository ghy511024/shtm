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
        ghy_shtm_tmp_out_str += "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>下载-闪电盒子</title>\r\n    <link rel=\"stylesheet\" href=\"/static/all.css\">\r\n</head>\r\n<body class=\"forbid_sc\">\r\n"

        if (_js_meth_c_include_1(n.body.list[1])) {
            return true;
        }
        ghy_shtm_tmp_out_str += "\r\n<div class=\"fullpage-wrapper\">\r\n    <div class=\"section fp-section active s1\">\r\n        <div class=\"inner\">\r\n            <div class=\"pic pic1\"></div>\r\n            <div class=\"info\">一键直达 删繁就简</div>\r\n            <div class=\"desc\">一个闪电盒子相当于1000个主流应用</div>\r\n            <div class=\"btn\">立即下载</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"section fp-section s2\">\r\n        <div class=\"inner\">\r\n            <div class=\"pic pic2\"></div>\r\n            <div class=\"info\">节能节电 加速运行</div>\r\n            <div class=\"desc\">清理偷跑运用，告别卡顿延迟</div>\r\n            <div class=\"btn\">立即下载</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"section fp-section s2\">\r\n        <div class=\"inner\">\r\n            <div class=\"pic pic3\"></div>\r\n            <div class=\"info\">隔离危险 捍卫隐私</div>\r\n            <div class=\"desc\">远离隐私泄漏，全家桶和捆绑安装</div>\r\n            <div class=\"btn\">立即下载</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"section fp-section s2\">\r\n        <div class=\"inner\">\r\n            <div class=\"pic pic4\"></div>\r\n            <div class=\"info\">闪电盒子</div>\r\n            <div class=\"desc\">你唯一需要安装的APP</div>\r\n            <div class=\"btn\">立即下载</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

        if (_js_meth_c_include_2(n.body.list[3])) {
            return true;
        }
        ghy_shtm_tmp_out_str += "\r\n<script src=\"http://static.ws.kukuplay.com/common/lib/jquery/jquery-1.9.4.js\"></script>\r\n<script src=\"/static/download.js\"></script>\r\n</body>\r\n</html>"
    }

    function _js_meth_c_include_1(n) {
        try {
//c:include
            let js_th_c_include_1 = new IncludeImpl();
            js_th_c_include_1.setPageContext(pageContext);

            let each_val = js_th_c_include_1.doStartTag();
            if (each_val != js_th_c_include_1.SKIP_BODY) {
                while (true) {
                    ghy_shtm_tmp_out_str += "<div class=\"header-wrap\">\r\n    <div class=\"header-inner\">\r\n        <a href=\"/\"> <div class=\"logo\"></div></a>\r\n        <div class=\"menu-wrap\">\r\n            <a href=\"/\" calss=\""

                    if (_js_meth_c_if_1(n.body.list[1])) {
                        return true;
                    }
                    ghy_shtm_tmp_out_str += "\">下载</a>\r\n            <a href=\"/about\">关于我们</a>\r\n            <a href=\"/contact\">站长合作</a>\r\n        </div>\r\n    </div>\r\n</div>"
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


    function _js_meth_c_if_1(n) {
        try {
//c:if
            let js_th_c_if_1 = new IfImpl();
            js_th_c_if_1.setPageContext(pageContext);
            js_th_c_if_1.setTest(cpage == 'download');
            let each_val = js_th_c_if_1.doStartTag();
            if (each_val != js_th_c_if_1.SKIP_BODY) {
                while (true) {
                    ghy_shtm_tmp_out_str += "active"
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
            var msg = getErrInfo(n);
            msg += e;
            ghy_shtm_tmp_out_str = msg;
            return true;
        }
        return false;
    }


    function _js_meth_c_include_2(n) {
        try {
//c:include
            let js_th_c_include_2 = new IncludeImpl();
            js_th_c_include_2.setPageContext(pageContext);

            let each_val = js_th_c_include_2.doStartTag();
            if (each_val != js_th_c_include_2.SKIP_BODY) {
                while (true) {
                    ghy_shtm_tmp_out_str += "<div class=\"footer-wrap "

                    if (_js_meth_c_if_2(n.body.list[1])) {
                        return true;
                    }
                    ghy_shtm_tmp_out_str += "\">\r\n    <p>copyright@201d7 北京流体网络科技有限公司 版权所有 京ICP备17027430</p>\r\n</div>\r\n"
                    let evalDoAfterBody = js_th_c_include_2.doAfterBody();
                    if (evalDoAfterBody != js_th_c_include_2.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_include_2.doEndTag() == js_th_c_include_2.SKIP_PAGE) {
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


    function _js_meth_c_if_2(n) {
        try {
//c:if
            let js_th_c_if_2 = new IfImpl();
            js_th_c_if_2.setPageContext(pageContext);
            js_th_c_if_2.setTest(cpage == 'home');
            let each_val = js_th_c_if_2.doStartTag();
            if (each_val != js_th_c_if_2.SKIP_BODY) {
                while (true) {
                    ghy_shtm_tmp_out_str += "fixed"
                    let evalDoAfterBody = js_th_c_if_2.doAfterBody();
                    if (evalDoAfterBody != js_th_c_if_2.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_if_2.doEndTag() == js_th_c_if_2.SKIP_PAGE) {
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
        var msginfo = "ERROR: " + " position:(" + line + "," + col + ")\n";

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