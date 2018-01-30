function anonymous(data, option
                   /*``*/) {

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
        var out = option.out;
        var pageNodes = option.pageNodes;
        try {
            service(pageNodes.list[0])
        }
        catch (e) {
            str = e.message;
        }
        function service(n) {


            str += "\n    var ForEachImpl = option.ForEachImpl;\n    var IfImpl = option.IfImpl;\n    var Mark = option.Mark;\n    var pageContext = new option.PageContext(data);\n    var str=\"\";\n    let foreachImpl = new ForEachImpl ();\n    let ifImpl = new IfImpl ();\n    foreachImpl.setPageContext(pageContext);\n    ifImpl.setPageContext(pageContext);\n    with (data || {}) {\n        var out = option.out;\n        var pageNodes = option.pageNodes;\n        try {\n            service(pageNodes.list[0])\n        }\n        catch (e) {\n            str = e.message;\n        }\n        function service (n) {\n\nstr+=\"<html>\\n<head>\\n</head>\\n<body>\\n<h1>\"+(title||\"\")+\"</h1>\\n\"\n\nif(_js_meth_c_if_1(n.body.list[4])){return true;}str+=\"\"\n\nif(_js_meth_c_if_2(n.body.list[6])){return true;}\nstr+=\"\\n<h3>for 循环，多重嵌套</h3>\\n<ul>\\n    \"\n\nif(_js_meth_c_forEach_1(n.body.list[8])){return true;}\nstr+=\"\\n</ul>\\n<h3>for 循环 map</h3>\\n\"\n\nif(_js_meth_c_forEach_3(n.body.list[10])){return true;}\nstr+=\"\\n<h3>map 混合使用</h3>\\n\"\n\nif(_js_meth_c_forEach_4(n.body.list[12])){return true;}\nstr+=\"\\n<h3>include 外部页面</h3>\\n<p>与handbares 不同，无需设置额外的模版跟路径，即可直接在模版使用</p>\\n</body>\\n</html>\"\n };\n\nfunction _js_meth_c_if_1(n){\n  try {\n//c:if\nlet js_th_c_if_1 =new IfImpl();\njs_th_c_if_1.setPageContext(pageContext);\njs_th_c_if_1.setTest(if_test1);\n        let each_val = js_th_c_if_1.doStartTag();\n        if (each_val != js_th_c_if_1.SKIP_BODY){\n         while (true) {\nstr+=\"<p>show if_test1</p>\\n\"\nlet evalDoAfterBody = js_th_c_if_1.doAfterBody();\n                    if (evalDoAfterBody != js_th_c_if_1.EVAL_BODY_AGAIN) {\n                        break;\n                    }\n                }\n            }\n            if (js_th_c_if_1.doEndTag() == js_th_c_if_1.SKIP_PAGE) {\n            return true;\n        }\n      }\n      catch(e){\n      var msg = getErrInfo(n);\n      str=msg;\n      return true;\n      }\n         return false;}\n            \n\nfunction _js_meth_c_if_2(n){\n  try {\n//c:if\nlet js_th_c_if_2 =new IfImpl();\njs_th_c_if_2.setPageContext(pageContext);\njs_th_c_if_2.setTest(if_test1&&if_test2);\n        let each_val = js_th_c_if_2.doStartTag();\n        if (each_val != js_th_c_if_2.SKIP_BODY){\n         while (true) {\nstr+=\"<p>两个都显示</p>\\n\"\nlet evalDoAfterBody = js_th_c_if_2.doAfterBody();\n                    if (evalDoAfterBody != js_th_c_if_2.EVAL_BODY_AGAIN) {\n                        break;\n                    }\n                }\n            }\n            if (js_th_c_if_2.doEndTag() == js_th_c_if_2.SKIP_PAGE) {\n            return true;\n        }\n      }\n      catch(e){\n      var msg = getErrInfo(n);\n      str=msg;\n      return true;\n      }\n         return false;}\n            \n\nfunction _js_meth_c_forEach_1(n){\n  try {\n//c:forEach\nlet js_th_c_forEach_1 =new ForEachImpl();\njs_th_c_forEach_1.setPageContext(pageContext);\njs_th_c_forEach_1.setItems(list);js_th_c_forEach_1.setVar(\"item\");\n        let each_val = js_th_c_forEach_1.doStartTag();\n        if (each_val != js_th_c_forEach_1.SKIP_BODY){\n         while (true) {\n\nstr+=\"<li>\\n            <p>\"+(item.name||\"\")+\"</p>\\n            <ol>\\n                \"\n\nif(_js_meth_c_forEach_2(n.body.list[4])){return true;}\nstr+=\"\\n            </ol>\\n        </li>\\n    \"\nlet evalDoAfterBody = js_th_c_forEach_1.doAfterBody();\n                    if (evalDoAfterBody != js_th_c_forEach_1.EVAL_BODY_AGAIN) {\n                        break;\n                    }\n                }\n            }\n            if (js_th_c_forEach_1.doEndTag() == js_th_c_forEach_1.SKIP_PAGE) {\n            return true;\n        }\n      }\n      catch(e){\n      var msg = getErrInfo(n);\n      str=msg;\n      return true;\n      }\n         return false;}\n            \n\nfunction _js_meth_c_forEach_2(n){\n  try {\n//c:forEach\nlet js_th_c_forEach_2 =new ForEachImpl();\njs_th_c_forEach_2.setPageContext(pageContext);\njs_th_c_forEach_2.setItems(item.data);js_th_c_forEach_2.setVar(\"li\");\n        let each_val = js_th_c_forEach_2.doStartTag();\n        if (each_val != js_th_c_forEach_2.SKIP_BODY){\n         while (true) {\n\nstr+=\"<li>\\n                        \"+(li||\"\")+\"\\n                    </li>\\n                \"\nlet evalDoAfterBody = js_th_c_forEach_2.doAfterBody();\n                    if (evalDoAfterBody != js_th_c_forEach_2.EVAL_BODY_AGAIN) {\n                        break;\n                    }\n                }\n            }\n            if (js_th_c_forEach_2.doEndTag() == js_th_c_forEach_2.SKIP_PAGE) {\n            return true;\n        }\n      }\n      catch(e){\n      var msg = getErrInfo(n);\n      str=msg;\n      return true;\n      }\n         return false;}\n            \n\nfunction _js_meth_c_forEach_3(n){\n  try {\n//c:forEach\nlet js_th_c_forEach_3 =new ForEachImpl();\njs_th_c_forEach_3.setPageContext(pageContext);\njs_th_c_forEach_3.setItems(maps);js_th_c_forEach_3.setVar(\"item\");\n        let each_val = js_th_c_forEach_3.doStartTag();\n        if (each_val != js_th_c_forEach_3.SKIP_BODY){\n         while (true) {\n\n\nstr+=\"<p><span>\"+(item.key||\"\")+\":</span><span>\"+(item.value||\"\")+\"</span></p>\\n\"\nlet evalDoAfterBody = js_th_c_forEach_3.doAfterBody();\n                    if (evalDoAfterBody != js_th_c_forEach_3.EVAL_BODY_AGAIN) {\n                        break;\n                    }\n                }\n            }\n            if (js_th_c_forEach_3.doEndTag() == js_th_c_forEach_3.SKIP_PAGE) {\n            return true;\n        }\n      }\n      catch(e){\n      var msg = getErrInfo(n);\n      str=msg;\n      return true;\n      }\n         return false;}\n            \n\nfunction _js_meth_c_forEach_4(n){\n  try {\n//c:forEach\nlet js_th_c_forEach_4 =new ForEachImpl();\njs_th_c_forEach_4.setPageContext(pageContext);\njs_th_c_forEach_4.setItems(list2);js_th_c_forEach_4.setVar(\"item\");\n        let each_val = js_th_c_forEach_4.doStartTag();\n        if (each_val != js_th_c_forEach_4.SKIP_BODY){\n         while (true) {\n\n\nstr+=\"<p><span>\"+(item||\"\")+\":</span><span>\"+(nameMap[item]||\"\")+\"</span></p>\\n\"\nlet evalDoAfterBody = js_th_c_forEach_4.doAfterBody();\n                    if (evalDoAfterBody != js_th_c_forEach_4.EVAL_BODY_AGAIN) {\n                        break;\n                    }\n                }\n            }\n            if (js_th_c_forEach_4.doEndTag() == js_th_c_forEach_4.SKIP_PAGE) {\n            return true;\n        }\n      }\n      catch(e){\n      var msg = getErrInfo(n);\n      str=msg;\n      return true;\n      }\n         return false;}\n            }\n\n        function getErrInfo(node) {\n        var mark = node.startMark;\n        var line = mark.line;\n        var col = mark.col;\n        var name = mark.name;\n        var preline = 2;\n        var nextline = 2;\n        var msginfo = \"ERROR: \" + \" position:(\" + line + \",\" + col + \")\\n\";\n\n        var sline = Math.max(mark.line - preline, 1)\n        var retstr = \"\";\n        for (let i = sline; i < mark.line; i++) {\n            var start = Mark.newMark(mark);\n            start.resetLine(i);\n            retstr += (\"   \" + i + \"|\" + mark.reader.getTextline(start, i));\n        }\n        let cmark = Mark.newMark(mark);\n        cmark.resetLine(mark.line);\n        retstr += (\">> \" + cmark.line + \"|\" + cmark.reader.getTextline(cmark, cmark.line));\n        for (let i = 1; i < nextline; i++) {\n            let start = Mark.newMark(mark);\n            start.resetLine(mark.line + i);\n            retstr += \"   \" + start.line + \"|\" + mark.reader.getTextline(start, start.line)\n        }\n        return msginfo + retstr;\n    }\n        \nreturn str;\n"
        };
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

}