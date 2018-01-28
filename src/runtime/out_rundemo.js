var ForEachImpl = option.ForEachImpl;
var IfImpl = option.IfImpl;
var IncludeImpl = option.IncludeImpl;
var Mark = option.Mark;
var pageContext = new option.PageContext(data);
var str = "";
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

        str += "<html>\r\n<head>\r\n\r\n</head>\r\n<body>\r\n<h1>" + (title || "") + "</h1>\r\n\r\n"

        if (_js_meth_c_if_1(n.body.list[4])) {
            return true;
        }
        str += ""

        if (_js_meth_c_if_2(n.body.list[6])) {
            return true;
        }
        str += "\r\n<h3>for 循环，多重嵌套</h3>\r\n<ul>\r\n    "

        if (_js_meth_c_forEach_1(n.body.list[8])) {
            return true;
        }
        str += "\r\n</ul>\r\n\r\n<h3>for 循环 map</h3>\r\n"

        if (_js_meth_c_forEach_3(n.body.list[10])) {
            return true;
        }
        str += "\r\n\r\n<h3>map 混合使用</h3>\r\n"

        if (_js_meth_c_forEach_4(n.body.list[12])) {
            return true;
        }
        str += "\r\n\r\n<h3>include 外部页面</h3>\r\n"

        if (_js_meth_c_include_1(n.body.list[14])) {
            return true;
        }
        str += "\r\n<p>与handbares 不同，无需设置额外的模版跟路径，即可直接在模版使用</p>\r\n</body>\r\n</html>"
    }
}

function _js_meth_c_if_1(n) {
    try {
//c:if
        let js_th_c_if_1 = new IfImpl();
        js_th_c_if_1.setPageContext(pageContext);
        js_th_c_if_1.setTest(if_test1);
        let each_val = js_th_c_if_1.doStartTag();
        if (each_val != js_th_c_if_1.SKIP_BODY) {
            while (true) {
                str += "<p>show if_test1</p>\r\n"
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
        str = msg;
        return true;
    }
    return false;
}


function _js_meth_c_if_2(n) {
    try {
//c:if
        let js_th_c_if_2 = new IfImpl();
        js_th_c_if_2.setPageContext(pageContext);
        js_th_c_if_2.setTest(if_test1 && if_test2);
        let each_val = js_th_c_if_2.doStartTag();
        if (each_val != js_th_c_if_2.SKIP_BODY) {
            while (true) {
                str += "<p>两个都显示</p>\r\n"
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
        str = msg;
        return true;
    }
    return false;
}


function _js_meth_c_forEach_1(n) {
    try {
//c:forEach
        let js_th_c_forEach_1 = new ForEachImpl();
        js_th_c_forEach_1.setPageContext(pageContext);
        js_th_c_forEach_1.setItems(list);
        js_th_c_forEach_1.setVar("item");
        let each_val = js_th_c_forEach_1.doStartTag();
        if (each_val != js_th_c_forEach_1.SKIP_BODY) {
            while (true) {

                str += "<li>\r\n            <p>" + (item.name || "") + "</p>\r\n            <ol>\r\n                "

                if (_js_meth_c_forEach_2(n.body.list[4])) {
                    return true;
                }
                str += "\r\n            </ol>\r\n        </li>\r\n    "
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
        str = msg;
        return true;
    }
    return false;
}


function _js_meth_c_forEach_2(n) {
    try {
//c:forEach
        let js_th_c_forEach_2 = new ForEachImpl();
        js_th_c_forEach_2.setPageContext(pageContext);
        js_th_c_forEach_2.setItems(item.data);
        js_th_c_forEach_2.setVar("li");
        let each_val = js_th_c_forEach_2.doStartTag();
        if (each_val != js_th_c_forEach_2.SKIP_BODY) {
            while (true) {

                str += "<li>\r\n                        " + (li || "") + "\r\n                    </li>\r\n                "
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
        var msg = getErrInfo(n);
        str = msg;
        return true;
    }
    return false;
}


function _js_meth_c_forEach_3(n) {
    try {
//c:forEach
        let js_th_c_forEach_3 = new ForEachImpl();
        js_th_c_forEach_3.setPageContext(pageContext);
        js_th_c_forEach_3.setItems(maps);
        js_th_c_forEach_3.setVar("item");
        let each_val = js_th_c_forEach_3.doStartTag();
        if (each_val != js_th_c_forEach_3.SKIP_BODY) {
            while (true) {


                str += "<p><span>" + (item.key || "") + ":</span><span>" + (item.value || "") + "</span></p>\r\n"
                let evalDoAfterBody = js_th_c_forEach_3.doAfterBody();
                if (evalDoAfterBody != js_th_c_forEach_3.EVAL_BODY_AGAIN) {
                    break;
                }
            }
        }
        if (js_th_c_forEach_3.doEndTag() == js_th_c_forEach_3.SKIP_PAGE) {
            return true;
        }
    }
    catch (e) {
        var msg = getErrInfo(n);
        str = msg;
        return true;
    }
    return false;
}


function _js_meth_c_forEach_4(n) {
    try {
//c:forEach
        let js_th_c_forEach_4 = new ForEachImpl();
        js_th_c_forEach_4.setPageContext(pageContext);
        js_th_c_forEach_4.setItems(list2);
        js_th_c_forEach_4.setVar("item");
        let each_val = js_th_c_forEach_4.doStartTag();
        if (each_val != js_th_c_forEach_4.SKIP_BODY) {
            while (true) {


                str += "<p><span>" + (item || "") + ":</span><span>" + (nameMap[item] || "") + "</span></p>\r\n"
                let evalDoAfterBody = js_th_c_forEach_4.doAfterBody();
                if (evalDoAfterBody != js_th_c_forEach_4.EVAL_BODY_AGAIN) {
                    break;
                }
            }
        }
        if (js_th_c_forEach_4.doEndTag() == js_th_c_forEach_4.SKIP_PAGE) {
            return true;
        }
    }
    catch (e) {
        var msg = getErrInfo(n);
        str = msg;
        return true;
    }
    return false;
}


function _js_meth_c_include_1(n) {
    try {
//c:include
        let js_th_c_include_1 = new IncludeImpl();
        js_th_c_include_1.setPageContext(pageContext);

        let each_val = js_th_c_include_1.doStartTag();
        if (each_val != js_th_c_include_1.SKIP_BODY) {
            while (true) {
                str += "<p>子页面如斯</p>\r\n<span>，，，，，，，，，</span>\r\n<span>￥￥￥￥￥￥￥￥￥</span>"
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
        str = msg;
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

return str;
