
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
ghy_shtm_tmp_out_str+="child1-\r\n"

if(_js_meth_c_include_2()){return true;}ghy_shtm_tmp_out_str+=""
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
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_include_1.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            

function _js_meth_c_include_2(n){
let js_th_c_include_2 =new IncludeImpl();
  try {
//c:include
js_th_c_include_2.setPageContext(pageContext);
js_th_c_include_2.setErrInfo("ERROR:  position:(2,0)\r\n   1|child1-\r\n>> 2|<c:include page=\"child/child2.shtm\"></c:include>   3|<c:include page=\"child/child2.shtm\"></c:include>");

        let each_val = js_th_c_include_2.doStartTag();
        if (each_val != js_th_c_include_2.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="child2\r\n"

if(_js_meth_c_if_1()){return true;}ghy_shtm_tmp_out_str+=""
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
      catch(e){
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_include_2.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            

function _js_meth_c_if_1(n){
let js_th_c_if_1 =new IfImpl();
  try {
//c:if
js_th_c_if_1.setPageContext(pageContext);
js_th_c_if_1.setErrInfo("ERROR:  position:(2,0)\r\n   1|child2\r\n>> 2|<c:if test=\"${test1}\">-test1</c:if>   3|<c:if test=\"${test1}\">-test1</c:if>");
js_th_c_if_1.setTest(test1);
        let each_val = js_th_c_if_1.doStartTag();
        if (each_val != js_th_c_if_1.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="-test1"
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
            return ghy_shtm_tmp_out_str;
 }