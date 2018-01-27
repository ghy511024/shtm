
    var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    var Mark = option.Mark;
    var pageContext = new option.PageContext(data);
    var str="";
    let foreachImpl = new ForEachImpl ();
    let ifImpl = new IfImpl ();
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
        function service (n) {
str+="=========before==========\r\n"

if(_js_meth_c_forEach_1(n.body.list[2])){return true;}
str+="\r\n=========after=========="
 };

function _js_meth_c_forEach_1(n){
  try {
//c:forEach
let js_th_c_forEach_1 =new ForEachImpl();
js_th_c_forEach_1.setPageContext(pageContext);
js_th_c_forEach_1.setItems(list);js_th_c_forEach_1.setVar("item");
        let each_val = js_th_c_forEach_1.doStartTag();
        if (each_val != js_th_c_forEach_1.SKIP_BODY){
         while (true) {



str+="中间有 "+(maps[item.key]||"")+"些文字\r\n    <li>"+(item.name||"")+"/Web Site:"+(item.site||"")+" li 里面的文字</li>\r\n\r\n    "

if(_js_meth_c_if_1(n.body.list[8])){return true;}

str+="\r\n    后面有些文字 "+(item.key||"")+"\r\n    "

if(_js_meth_c_forEach_2(n.body.list[12])){return true;}str+=""
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
      catch(e){
      var msg = getErrInfo(n);
      str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_if_1(n){
  try {
//c:if
let js_th_c_if_1 =new IfImpl();
js_th_c_if_1.setPageContext(pageContext);
js_th_c_if_1.setTest(if_test12);
        let each_val = js_th_c_if_1.doStartTag();
        if (each_val != js_th_c_if_1.SKIP_BODY){
         while (true) {
str+="哦啦啦"
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
      catch(e){
      var msg = getErrInfo(n);
      str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_forEach_2(n){
  try {
//c:forEach
let js_th_c_forEach_2 =new ForEachImpl();
js_th_c_forEach_2.setPageContext(pageContext);
js_th_c_forEach_2.setItems(maps);js_th_c_forEach_2.setVar("map");
        let each_val = js_th_c_forEach_2.doStartTag();
        if (each_val != js_th_c_forEach_2.SKIP_BODY){
         while (true) {


str+="<span>"+(map.key||"")+"-->"+(map.value||"")+".....</span>\r\n    "
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
      catch(e){
      var msg = getErrInfo(n);
      str=msg;
      return true;
      }
         return false;}
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
