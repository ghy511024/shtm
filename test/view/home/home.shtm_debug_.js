
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
           throw  new Error(e);
        }
        function service (n) {
ghy_shtm_tmp_out_str+="111\r\n"

if(_js_meth_c_if_1()){return true;}
ghy_shtm_tmp_out_str+="\r\n\r\n222"
 }

function _js_meth_c_if_1(n){
let js_th_c_if_1 =new IfImpl();
  try {
//c:if
js_th_c_if_1.setPageContext(pageContext);
js_th_c_if_1.setErrInfo("ERROR:  position:(2,0)\r\n   1|111\r\n>> 2|<c:if test=\"${true}\">\r\n   3|    <script>\r\n");
js_th_c_if_1.setTest(true);
        let each_val = js_th_c_if_1.doStartTag();
        if (each_val != js_th_c_if_1.SKIP_BODY){
         while (true) {

ghy_shtm_tmp_out_str+="<script>\r\n        var a={ss:\""+_js_meth_c_el_2()+"\"\r\n        }\r\n    </script>\r\n"
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
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_if_1.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            
    function _js_meth_c_el_2() {
        try {
        if(ss==null){
        ss="";}
            return ss;
        } catch (e) {
             return "";
             // 暂时不按异常处理，当空处理
            // throw  "ERROR:  position:(4,21)\r\n   2|<c:if test=\"${true}\">\r\n   3|    <script>\r\n>> 4|        var a={ss:\"${ss}\"\r\n   5|        }\r\n";
        }
    }
return ghy_shtm_tmp_out_str;
 }