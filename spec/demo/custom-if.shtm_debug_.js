
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
        function service (n) {ghy_shtm_tmp_out_str+=""

if(_js_meth_c_if_1()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_if_2()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_if_3()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_if_4()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_if_5()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_if_6()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_if_7()){return true;}
ghy_shtm_tmp_out_str+="\r\n"
 }

function _js_meth_c_if_1(n){
let js_th_c_if_1 =new IfImpl();
  try {
//c:if
js_th_c_if_1.setPageContext(pageContext);
js_th_c_if_1.setErrInfo("ERROR:  position:(1,1)\r\n>> 1|<c:if test=\"${test1}\">t1</c:if>\r\n   2|<c:if test=\"${test2}\">t2</c:if>\r\n");
js_th_c_if_1.setTest(test1);
        let each_val = js_th_c_if_1.doStartTag();
        if (each_val != js_th_c_if_1.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="t1"
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
            

function _js_meth_c_if_2(n){
let js_th_c_if_2 =new IfImpl();
  try {
//c:if
js_th_c_if_2.setPageContext(pageContext);
js_th_c_if_2.setErrInfo("ERROR:  position:(2,0)\r\n   1|<c:if test=\"${test1}\">t1</c:if>\r\n>> 2|<c:if test=\"${test2}\">t2</c:if>\r\n   3|<c:if test=\"${test1&&test2}\">t3</c:if>\r\n");
js_th_c_if_2.setTest(test2);
        let each_val = js_th_c_if_2.doStartTag();
        if (each_val != js_th_c_if_2.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="t2"
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
      catch(e){
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_if_2.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            

function _js_meth_c_if_3(n){
let js_th_c_if_3 =new IfImpl();
  try {
//c:if
js_th_c_if_3.setPageContext(pageContext);
js_th_c_if_3.setErrInfo("ERROR:  position:(3,0)\r\n   1|<c:if test=\"${test1}\">t1</c:if>\r\n   2|<c:if test=\"${test2}\">t2</c:if>\r\n>> 3|<c:if test=\"${test1&&test2}\">t3</c:if>\r\n   4|<c:if test=\"${test1||test2}\">t4</c:if>\r\n");
js_th_c_if_3.setTest(test1&&test2);
        let each_val = js_th_c_if_3.doStartTag();
        if (each_val != js_th_c_if_3.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="t3"
let evalDoAfterBody = js_th_c_if_3.doAfterBody();
                    if (evalDoAfterBody != js_th_c_if_3.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_if_3.doEndTag() == js_th_c_if_3.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_if_3.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            

function _js_meth_c_if_4(n){
let js_th_c_if_4 =new IfImpl();
  try {
//c:if
js_th_c_if_4.setPageContext(pageContext);
js_th_c_if_4.setErrInfo("ERROR:  position:(4,0)\r\n   2|<c:if test=\"${test2}\">t2</c:if>\r\n   3|<c:if test=\"${test1&&test2}\">t3</c:if>\r\n>> 4|<c:if test=\"${test1||test2}\">t4</c:if>\r\n   5|<c:if test=\"${test3}\">t5</c:if>\r\n");
js_th_c_if_4.setTest(test1||test2);
        let each_val = js_th_c_if_4.doStartTag();
        if (each_val != js_th_c_if_4.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="t4"
let evalDoAfterBody = js_th_c_if_4.doAfterBody();
                    if (evalDoAfterBody != js_th_c_if_4.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_if_4.doEndTag() == js_th_c_if_4.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_if_4.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            

function _js_meth_c_if_5(n){
let js_th_c_if_5 =new IfImpl();
  try {
//c:if
js_th_c_if_5.setPageContext(pageContext);
js_th_c_if_5.setErrInfo("ERROR:  position:(5,0)\r\n   3|<c:if test=\"${test1&&test2}\">t3</c:if>\r\n   4|<c:if test=\"${test1||test2}\">t4</c:if>\r\n>> 5|<c:if test=\"${test3}\">t5</c:if>\r\n   6|<c:if test=\"${\'xixihaha\'}\">t6</c:if>\r\n");
js_th_c_if_5.setTest(test3);
        let each_val = js_th_c_if_5.doStartTag();
        if (each_val != js_th_c_if_5.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="t5"
let evalDoAfterBody = js_th_c_if_5.doAfterBody();
                    if (evalDoAfterBody != js_th_c_if_5.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_if_5.doEndTag() == js_th_c_if_5.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_if_5.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            

function _js_meth_c_if_6(n){
let js_th_c_if_6 =new IfImpl();
  try {
//c:if
js_th_c_if_6.setPageContext(pageContext);
js_th_c_if_6.setErrInfo("ERROR:  position:(6,0)\r\n   4|<c:if test=\"${test1||test2}\">t4</c:if>\r\n   5|<c:if test=\"${test3}\">t5</c:if>\r\n>> 6|<c:if test=\"${\'xixihaha\'}\">t6</c:if>\r\n   7|<c:if test=\"${\'xixihaha\'.length>0}\">t7</c:if>\r\n");
js_th_c_if_6.setTest('xixihaha');
        let each_val = js_th_c_if_6.doStartTag();
        if (each_val != js_th_c_if_6.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="t6"
let evalDoAfterBody = js_th_c_if_6.doAfterBody();
                    if (evalDoAfterBody != js_th_c_if_6.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_if_6.doEndTag() == js_th_c_if_6.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_if_6.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            

function _js_meth_c_if_7(n){
let js_th_c_if_7 =new IfImpl();
  try {
//c:if
js_th_c_if_7.setPageContext(pageContext);
js_th_c_if_7.setErrInfo("ERROR:  position:(7,0)\r\n   5|<c:if test=\"${test3}\">t5</c:if>\r\n   6|<c:if test=\"${\'xixihaha\'}\">t6</c:if>\r\n>> 7|<c:if test=\"${\'xixihaha\'.length>0}\">t7</c:if>\r\n   8|");
js_th_c_if_7.setTest('xixihaha'.length>0);
        let each_val = js_th_c_if_7.doStartTag();
        if (each_val != js_th_c_if_7.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="t7"
let evalDoAfterBody = js_th_c_if_7.doAfterBody();
                    if (evalDoAfterBody != js_th_c_if_7.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_if_7.doEndTag() == js_th_c_if_7.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
        var msg;
 if(typeof e=="string"){
 msg=e;
 }else{
  msg = js_th_c_if_7.getErrInfo();
 }
    throw msg;
      return true;
      }
         return false;}
            return ghy_shtm_tmp_out_str;
 }