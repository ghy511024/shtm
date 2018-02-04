
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
        function service (n) {ghy_shtm_tmp_out_str+=""

if(_js_meth_c_if_1()){return true;}ghy_shtm_tmp_out_str+=""
 }

function _js_meth_c_if_1(n){
let js_th_c_if_1 =new IfImpl();
  try {
//c:if
js_th_c_if_1.setPageContext(pageContext);
js_th_c_if_1.setErrInfo("ERROR:  position:(1,1)\r\n>> 1|<c:if test=\"${gg}\"><c:if>\r\n   2|<c:include page=\"../header/header.shtm\"></c:include>\r\n");
js_th_c_if_1.setTest(gg);
        let each_val = js_th_c_if_1.doStartTag();
        if (each_val != js_th_c_if_1.SKIP_BODY){
         while (true) {ghy_shtm_tmp_out_str+=""

if(_js_meth_c_if_2()){return true;}ghy_shtm_tmp_out_str+=""
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
      var msg = js_th_c_if_1.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_if_2(n){
let js_th_c_if_2 =new IfImpl();
  try {
//c:if
js_th_c_if_2.setPageContext(pageContext);
js_th_c_if_2.setErrInfo("ERROR:  position:(1,20)\r\n>> 1|<c:if test=\"${gg}\"><c:if>\r\n   2|<c:include page=\"../header/header.shtm\"></c:include>\r\n");
js_th_c_if_2.setTest(null);
        let each_val = js_th_c_if_2.doStartTag();
        if (each_val != js_th_c_if_2.SKIP_BODY){
         while (true) {ghy_shtm_tmp_out_str+=""

if(_js_meth_c_include_1()){return true;}

ghy_shtm_tmp_out_str+="<div class=\"header-wrap\">\r\n    <div class=\"header-inner\">\r\n        <a href=\"/\"> <div class=\"logo\"></div></a>\r\n        <div class=\"menu-wrap\">\r\n            <a href=\"/\" calss=\""

if(_js_meth_c_if_4()){return true;}
ghy_shtm_tmp_out_str+="\">下载</a>\r\n            <a href=\"/about\">关于我们</a>\r\n            <a href=\"/contact\">站长合作</a>\r\n        </div>\r\n    </div>\r\n</div>"
ghy_shtm_tmp_out_str+="asddddddddd"
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
      var msg = js_th_c_if_2.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_include_1(n){
let js_th_c_include_1 =new IncludeImpl();
  try {
//c:include
js_th_c_include_1.setPageContext(pageContext);
js_th_c_include_1.setErrInfo("ERROR:  position:(2,0)\r\n   1|<c:if test=\"${gg}\"><c:if>\r\n>> 2|<c:include page=\"../header/header.shtm\"></c:include>\r\n   3|asddddddddd");

        let each_val = js_th_c_include_1.doStartTag();
        if (each_val != js_th_c_include_1.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="<div class=\"header-wrap\">\r\n    <div class=\"header-inner\">\r\n        <a href=\"/\"> <div class=\"logo\"></div></a>\r\n        <div class=\"menu-wrap\">\r\n            <a href=\"/\" calss=\""

if(_js_meth_c_if_3()){return true;}
ghy_shtm_tmp_out_str+="\">下载</a>\r\n            <a href=\"/about\">关于我们</a>\r\n            <a href=\"/contact\">站长合作</a>\r\n        </div>\r\n    </div>\r\n</div>"
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
            

function _js_meth_c_if_3(n){
let js_th_c_if_3 =new IfImpl();
  try {
//c:if
js_th_c_if_3.setPageContext(pageContext);
js_th_c_if_3.setErrInfo("ERROR:  position:(5,31)\r\n   3|        <a href=\"/\"> <div class=\"logo\"></div></a>\r\n   4|        <div class=\"menu-wrap\">\r\n>> 5|            <a href=\"/\" calss=\"<c:if test=\"${str==\'download\'}\">active</c:if>\">下载</a>\r\n   6|            <a href=\"/about\">关于我们</a>\r\n");
js_th_c_if_3.setTest(str=='download');
        let each_val = js_th_c_if_3.doStartTag();
        if (each_val != js_th_c_if_3.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="active"
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
      var msg = js_th_c_if_3.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_if_4(n){
let js_th_c_if_4 =new IfImpl();
  try {
//c:if
js_th_c_if_4.setPageContext(pageContext);
js_th_c_if_4.setErrInfo("ERROR:  position:(5,31)\r\n   3|        <a href=\"/\"> <div class=\"logo\"></div></a>\r\n   4|        <div class=\"menu-wrap\">\r\n>> 5|            <a href=\"/\" calss=\"<c:if test=\"${str==\'download\'}\">active</c:if>\">下载</a>\r\n   6|            <a href=\"/about\">关于我们</a>\r\n");
js_th_c_if_4.setTest(str=='download');
        let each_val = js_th_c_if_4.doStartTag();
        if (each_val != js_th_c_if_4.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="active"
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
      var msg = js_th_c_if_4.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            return ghy_shtm_tmp_out_str;
 }