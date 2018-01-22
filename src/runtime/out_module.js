var fn = function (data, option) {
    var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    var pageContext = new option.PageContext (data);
    var str = "";
    let foreachImpl = new ForEachImpl ();
    let ifImpl = new IfImpl ();
    foreachImpl.setPageContext (pageContext);
    ifImpl.setPageContext (pageContext);
    with (data || {}) {
// console.log("ghy");
        var out = option.out;
        var pageNodes = option.pageNodes;
        service (pageNodes.list[0])
        function service (n) {
            str += "<html>\r\n<head>\r\n\r\n</head>\r\n<body>\r\n<h1>";
            str += title;
            str += "</h1>\r\n\r\n";
            if (_js_meth_c_if_1 (n.body.list[4])) {
                return true;
            }
            if (_js_meth_c_if_2 (n.body.list[6])) {
                return true;
            }
            str += "\r\n<h3>for 循环，多重嵌套</h3>\r\n<ul>\r\n    ";
            if (_js_meth_c_forEach_1 (n.body.list[8])) {
                return true;
            }
            str += "\r\n</ul>\r\n\r\n<h3>for 循环 map</h3>\r\n";
            if (_js_meth_c_forEach_3 (n.body.list[10])) {
                return true;
            }
            str += "\r\n\r\n<h3>map 混合使用</h3>\r\n";
            if (_js_meth_c_forEach_4 (n.body.list[12])) {
                return true;
            }
            str += "\r\n\r\n<h3>include 外部页面</h3>\r\n<p>与handbares 不同，无需设置额外的模版跟路径，即可直接在模版使用</p>\r\n</body>\r\n</html>";
        };

        function _js_meth_c_if_1 (n) {
            try {
//c:if
                let js_th_c_if_1 = ifImpl;
                js_th_c_if_1.setTest (if_test1);
                let each_val = js_th_c_if_1.doStartTag ();
                if (each_val != js_th_c_if_1.SKIP_BODY) {
                    while (true) {
                        str += "<p>show if_test1</p>\r\n";
                        let evalDoAfterBody = js_th_c_if_1.doAfterBody ();
                        if (evalDoAfterBody != js_th_c_if_1.EVAL_BODY_AGAIN) {
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


        function _js_meth_c_if_2 (n) {
            try {
//c:if
                let js_th_c_if_2 = ifImpl;
                js_th_c_if_2.setTest (if_test1 && if_test2);
                let each_val = js_th_c_if_2.doStartTag ();
                if (each_val != js_th_c_if_2.SKIP_BODY) {
                    while (true) {
                        str += "<p>两个都显示</p>\r\n";
                        let evalDoAfterBody = js_th_c_if_2.doAfterBody ();
                        if (evalDoAfterBody != js_th_c_if_2.EVAL_BODY_AGAIN) {
                            break;
                        }
                    }
                }
                if (js_th_c_if_2.doEndTag () == js_th_c_if_2.SKIP_PAGE) {
                    return true;
                }
            }
            catch (e) {
                console.log (e)
            }
            return false;
        }


        function _js_meth_c_forEach_1 (n) {
            try {
//c:forEach
                let js_th_c_forEach_1 = foreachImpl;
                js_th_c_forEach_1.setItems (list);
                js_th_c_forEach_1.setVar ("item");
                let each_val = js_th_c_forEach_1.doStartTag ();
                if (each_val != js_th_c_forEach_1.SKIP_BODY) {
                    while (true) {
                        str += "<li>\r\n            <p>";
                        str += item.name;
                        str += "</p>\r\n            <ol>\r\n                ";
                        if (_js_meth_c_forEach_2 (n.body.list[4])) {
                            return true;
                        }
                        str += "\r\n            </ol>\r\n        </li>\r\n    ";
                        let evalDoAfterBody = js_th_c_forEach_1.doAfterBody ();
                        if (evalDoAfterBody != js_th_c_forEach_1.EVAL_BODY_AGAIN) {
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


        function _js_meth_c_forEach_2 (n) {
            try {
//c:forEach
                let js_th_c_forEach_2 = foreachImpl;
                js_th_c_forEach_2.setItems (item.data);
                js_th_c_forEach_2.setVar ("li");
                let each_val = js_th_c_forEach_2.doStartTag ();
                if (each_val != js_th_c_forEach_2.SKIP_BODY) {
                    while (true) {
                        str += "<li>\r\n                        ";
                        str += li;
                        str += "\r\n                    </li>\r\n                ";
                        let evalDoAfterBody = js_th_c_forEach_2.doAfterBody ();
                        if (evalDoAfterBody != js_th_c_forEach_2.EVAL_BODY_AGAIN) {
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


        function _js_meth_c_forEach_3 (n) {
            try {
//c:forEach
                let js_th_c_forEach_3 = foreachImpl;
                js_th_c_forEach_3.setItems (maps);
                js_th_c_forEach_3.setVar ("item");
                let each_val = js_th_c_forEach_3.doStartTag ();
                if (each_val != js_th_c_forEach_3.SKIP_BODY) {
                    while (true) {
                        str += "<p><span>";
                        str += item.key;
                        str += ":</span><span>";
                        str += item.value;
                        str += "</span></p>\r\n";
                        let evalDoAfterBody = js_th_c_forEach_3.doAfterBody ();
                        if (evalDoAfterBody != js_th_c_forEach_3.EVAL_BODY_AGAIN) {
                            break;
                        }
                    }
                }
                if (js_th_c_forEach_3.doEndTag () == js_th_c_forEach_3.SKIP_PAGE) {
                    return true;
                }
            }
            catch (e) {
                console.log (e)
            }
            return false;
        }


        function _js_meth_c_forEach_4 (n) {
            try {
//c:forEach
                let js_th_c_forEach_4 = foreachImpl;
                js_th_c_forEach_4.setItems (list2);
                js_th_c_forEach_4.setVar ("item");
                let each_val = js_th_c_forEach_4.doStartTag ();
                if (each_val != js_th_c_forEach_4.SKIP_BODY) {
                    while (true) {
                        str += "<p><span>";
                        str += item;
                        str += ":</span><span>";
                        str += nameMap[item];
                        str += "</span></p>\r\n";
                        let evalDoAfterBody = js_th_c_forEach_4.doAfterBody ();
                        if (evalDoAfterBody != js_th_c_forEach_4.EVAL_BODY_AGAIN) {
                            break;
                        }
                    }
                }
                if (js_th_c_forEach_4.doEndTag () == js_th_c_forEach_4.SKIP_PAGE) {
                    return true;
                }
            }
            catch (e) {
                console.log (e)
            }
            return false;
        }
    }
    return str;
};
module.exports = fn