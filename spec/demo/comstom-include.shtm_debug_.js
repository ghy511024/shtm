
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
ghy_shtm_tmp_out_str+="parent-\r\n"

if(_js_meth_c_include_1()){return true;}
ghy_shtm_tmp_out_str+="\r\n"
 }

function _js_meth_c_include_1(n){
let js_th_c_include_1 =new IncludeImpl();
  try {
//c:include
js_th_c_include_1.setPageContext(pageContext);
js_th_c_include_1.setErrInfo("ERROR:  position:(2,0)\r\n   1|parent-\r\n>> 2|<c:include page=\"child/child1.shtm\"></c:include>\r\n   3|");

        let each_val = js_th_c_include_1.doStartTag();
        if (each_val != js_th_c_include_1.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="child1-"
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
      catch(e){
      var msg = js_th_c_include_1.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            return ghy_shtm_tmp_out_str;
 }