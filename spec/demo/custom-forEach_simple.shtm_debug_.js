
    var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    var IncludeImpl = option.IncludeImpl;
    var Mark = option.Mark;
    var pageContext = new option.PageContext(data);
    var ghy_shtm_tmp_out_str="";
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
ghy_shtm_tmp_out_str+="begin-\r\n"

if(_js_meth_c_forEach_1(n.list[1])){return true;}
ghy_shtm_tmp_out_str+="\r\n-map-\r\n"

if(_js_meth_c_forEach_3(n.list[3])){return true;}
ghy_shtm_tmp_out_str+="\r\n-str-\r\n"

if(_js_meth_c_forEach_4(n.list[5])){return true;}
ghy_shtm_tmp_out_str+="\r\n-end"
 }

function _js_meth_c_forEach_1(n){
  try {
//c:forEach
let js_th_c_forEach_1 =new ForEachImpl();
js_th_c_forEach_1.setPageContext(pageContext);
js_th_c_forEach_1.setItems(list);js_th_c_forEach_1.setVar("item");
        let each_val = js_th_c_forEach_1.doStartTag();
        if (each_val != js_th_c_forEach_1.SKIP_BODY){
         while (true) {ghy_shtm_tmp_out_str+=""

if(_js_meth_c_forEach_2(n.list[0])){return true;}ghy_shtm_tmp_out_str+=""
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
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_forEach_2(n){
  try {
//c:forEach
let js_th_c_forEach_2 =new ForEachImpl();
js_th_c_forEach_2.setPageContext(pageContext);
js_th_c_forEach_2.setItems(item.list);js_th_c_forEach_2.setVar("item2");
        let each_val = js_th_c_forEach_2.doStartTag();
        if (each_val != js_th_c_forEach_2.SKIP_BODY){
         while (true) {ghy_shtm_tmp_out_str+=""+(item2==null?"":item2)+""
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
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_forEach_3(n){
  try {
//c:forEach
let js_th_c_forEach_3 =new ForEachImpl();
js_th_c_forEach_3.setPageContext(pageContext);
js_th_c_forEach_3.setItems(maps);js_th_c_forEach_3.setVar("item");
        let each_val = js_th_c_forEach_3.doStartTag();
        if (each_val != js_th_c_forEach_3.SKIP_BODY){
         while (true) {ghy_shtm_tmp_out_str+=""+(item.value==null?"":item.value)+""
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
      catch(e){
      var msg = getErrInfo(n);
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_forEach_4(n){
  try {
//c:forEach
let js_th_c_forEach_4 =new ForEachImpl();
js_th_c_forEach_4.setPageContext(pageContext);
js_th_c_forEach_4.setItems(str);js_th_c_forEach_4.setVar("item");
        let each_val = js_th_c_forEach_4.doStartTag();
        if (each_val != js_th_c_forEach_4.SKIP_BODY){
         while (true) {ghy_shtm_tmp_out_str+=""+(item==null?"":item)+""
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
      catch(e){
      var msg = getErrInfo(n);
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            
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