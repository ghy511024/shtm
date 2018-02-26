
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
ghy_shtm_tmp_out_str+="begin-\r\n"

if(_js_meth_c_forEach_1()){return true;}

ghy_shtm_tmp_out_str+="\r\nend\r\n"+_js_meth_c_el_2()+"\r\n"

if(_js_meth_c_forEach_2()){return true;}
ghy_shtm_tmp_out_str+="\r\noyo"
 }

function _js_meth_c_forEach_1(n){
let js_th_c_forEach_1 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_1.setPageContext(pageContext);
js_th_c_forEach_1.setErrInfo("ERROR:  position:(2,0)\r\n   1|begin-\r\n>> 2|<c:forEach items=\"${list}\" var=\"item\">\r\n   3|mid\r\n");
js_th_c_forEach_1.setItems(_js_meth_forEach_el_1());js_th_c_forEach_1.setVar("item");
        let each_val = js_th_c_forEach_1.doStartTag();
        if (each_val != js_th_c_forEach_1.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="mid\r\n"
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
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_forEach_1.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            
    function _js_meth_forEach_el_1() {
    var ret=null;
        try {
        if(typeof list=="undefined"){
     ret=null
        }else{
       ret= list
        }
            return ret;
        } catch (e) {
            throw  "ERROR:  position:(2,0)\r\n   1|begin-\r\n>> 2|<c:forEach items=\"${list}\" var=\"item\">\r\n   3|mid\r\n";
        }
    }

    function _js_meth_c_el_2() {
        try {
        if(xixi==null){
        xixi="";}
            return xixi;
        } catch (e) {
             return "";
             // 暂时不按异常处理，当空处理
            // throw  "ERROR:  position:(6,2)\r\n   4|</c:forEach>\r\n   5|end\r\n>> 6|${xixi}\r\n   7|<c:forEach items=\"${listdd}\" var=\"item\">\r\n";
        }
    }


function _js_meth_c_forEach_2(n){
let js_th_c_forEach_2 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_2.setPageContext(pageContext);
js_th_c_forEach_2.setErrInfo("ERROR:  position:(7,0)\r\n   5|end\r\n   6|${xixi}\r\n>> 7|<c:forEach items=\"${listdd}\" var=\"item\">\r\n   8|    mid\r\n");
js_th_c_forEach_2.setItems(_js_meth_forEach_el_3());js_th_c_forEach_2.setVar("item");
        let each_val = js_th_c_forEach_2.doStartTag();
        if (each_val != js_th_c_forEach_2.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="mid\r\n"
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
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_forEach_2.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            
    function _js_meth_forEach_el_3() {
    var ret=null;
        try {
        if(typeof listdd=="undefined"){
     ret=null
        }else{
       ret= listdd
        }
            return ret;
        } catch (e) {
            throw  "ERROR:  position:(7,0)\r\n   5|end\r\n   6|${xixi}\r\n>> 7|<c:forEach items=\"${listdd}\" var=\"item\">\r\n   8|    mid\r\n";
        }
    }
return ghy_shtm_tmp_out_str;
 }