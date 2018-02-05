
    var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    var IncludeImpl = option.IncludeImpl;
    var pageContext = new option.PageContext(data);
    var ghy_shtm_tmp_out_str="";
    with (data || {}) {
        var out = option.out;
        try {
            service()
        }
        catch (e) {
            str = e.message;
        }
        function service (n) {

ghy_shtm_tmp_out_str+=""+(title==null?"":title)+"-"+(cindex==null?"":cindex)+"\r\n"

if(_js_meth_c_forEach_1()){return true;}

ghy_shtm_tmp_out_str+="\r\n"+(title==null?"":title)+"-"+(cindex==null?"":cindex)+""
 }

function _js_meth_c_forEach_1(n){
let js_th_c_forEach_1 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_1.setPageContext(pageContext);
js_th_c_forEach_1.setErrInfo("ERROR:  position:(2,0)\r\n   1|${title}-${cindex}\r\n>> 2|<c:forEach items=\"${list}\" var=\"title\" index=\"cindex\">\r\n   3|    -${title.title}-${cindex}-\r\n");
js_th_c_forEach_1.setItems(list);js_th_c_forEach_1.setVar("title");js_th_c_forEach_1.setIndex("cindex");
        let each_val = js_th_c_forEach_1.doStartTag();
        if (each_val != js_th_c_forEach_1.SKIP_BODY){
         while (true) {


ghy_shtm_tmp_out_str+="-"+(title.title==null?"":title.title)+"-"+(cindex==null?"":cindex)+"-\r\n"
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
      var msg = js_th_c_forEach_1.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            return ghy_shtm_tmp_out_str;
 }