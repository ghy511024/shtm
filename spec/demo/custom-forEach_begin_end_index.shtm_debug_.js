
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

if(_js_meth_c_forEach_1()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_forEach_2()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_forEach_3()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_forEach_4()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_forEach_5()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_forEach_6()){return true;}
ghy_shtm_tmp_out_str+="\r\n"

if(_js_meth_c_forEach_7()){return true;}ghy_shtm_tmp_out_str+=""
 }

function _js_meth_c_forEach_1(n){
let js_th_c_forEach_1 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_1.setPageContext(pageContext);
js_th_c_forEach_1.setErrInfo("ERROR:  position:(1,1)\r\n>> 1|<c:forEach items=\"${list}\" var=\"item\" begin=\"2\" end=\"3\">\r\n   2|    a${item}\r\n");
js_th_c_forEach_1.setItems(list);js_th_c_forEach_1.setVar("item");js_th_c_forEach_1.setBegin(2);js_th_c_forEach_1.setEnd(3);
        let each_val = js_th_c_forEach_1.doStartTag();
        if (each_val != js_th_c_forEach_1.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="a"+(item==null?"":item)+""
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
            

function _js_meth_c_forEach_2(n){
let js_th_c_forEach_2 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_2.setPageContext(pageContext);
js_th_c_forEach_2.setErrInfo("ERROR:  position:(4,0)\r\n   2|    a${item}\r\n   3|</c:forEach>\r\n>> 4|<c:forEach items=\"${list}\" var=\"item\" begin=\"3\" end=\"7\">\r\n   5|    b${item}\r\n");
js_th_c_forEach_2.setItems(list);js_th_c_forEach_2.setVar("item");js_th_c_forEach_2.setBegin(3);js_th_c_forEach_2.setEnd(7);
        let each_val = js_th_c_forEach_2.doStartTag();
        if (each_val != js_th_c_forEach_2.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="b"+(item==null?"":item)+""
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
      var msg = js_th_c_forEach_2.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_forEach_3(n){
let js_th_c_forEach_3 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_3.setPageContext(pageContext);
js_th_c_forEach_3.setErrInfo("ERROR:  position:(7,0)\r\n   5|    b${item}\r\n   6|</c:forEach>\r\n>> 7|<c:forEach items=\"${list}\" var=\"item\" end=\"1\">\r\n   8|    c${item}\r\n");
js_th_c_forEach_3.setItems(list);js_th_c_forEach_3.setVar("item");js_th_c_forEach_3.setEnd(1);
        let each_val = js_th_c_forEach_3.doStartTag();
        if (each_val != js_th_c_forEach_3.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="c"+(item==null?"":item)+""
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
      var msg = js_th_c_forEach_3.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_forEach_4(n){
let js_th_c_forEach_4 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_4.setPageContext(pageContext);
js_th_c_forEach_4.setErrInfo("ERROR:  position:(10,0)\r\n   8|    c${item}\r\n   9|</c:forEach>\r\n>> 10|<c:forEach items=\"${list}\" var=\"item\" begin=\"3\">\r\n   11|    d${item}\r\n");
js_th_c_forEach_4.setItems(list);js_th_c_forEach_4.setVar("item");js_th_c_forEach_4.setBegin(3);
        let each_val = js_th_c_forEach_4.doStartTag();
        if (each_val != js_th_c_forEach_4.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="d"+(item==null?"":item)+""
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
      var msg = js_th_c_forEach_4.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_forEach_5(n){
let js_th_c_forEach_5 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_5.setPageContext(pageContext);
js_th_c_forEach_5.setErrInfo("ERROR:  position:(13,0)\r\n   11|    d${item}\r\n   12|</c:forEach>\r\n>> 13|<c:forEach items=\"${list}\" var=\"item\" begin=\"7\" end=\"3\">\r\n   14|    e${item}\r\n");
js_th_c_forEach_5.setItems(list);js_th_c_forEach_5.setVar("item");js_th_c_forEach_5.setBegin(7);js_th_c_forEach_5.setEnd(3);
        let each_val = js_th_c_forEach_5.doStartTag();
        if (each_val != js_th_c_forEach_5.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="e"+(item==null?"":item)+""
let evalDoAfterBody = js_th_c_forEach_5.doAfterBody();
                    if (evalDoAfterBody != js_th_c_forEach_5.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_forEach_5.doEndTag() == js_th_c_forEach_5.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
      var msg = js_th_c_forEach_5.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_forEach_6(n){
let js_th_c_forEach_6 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_6.setPageContext(pageContext);
js_th_c_forEach_6.setErrInfo("ERROR:  position:(16,0)\r\n   14|    e${item}\r\n   15|</c:forEach>\r\n>> 16|<c:forEach items=\"${list}\" var=\"item\" begin=\"0\" end=\"3\" index=\"c\">\r\n   17|    f${c}\r\n");
js_th_c_forEach_6.setItems(list);js_th_c_forEach_6.setVar("item");js_th_c_forEach_6.setBegin(0);js_th_c_forEach_6.setEnd(3);js_th_c_forEach_6.setIndex("c");
        let each_val = js_th_c_forEach_6.doStartTag();
        if (each_val != js_th_c_forEach_6.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="f"+(c==null?"":c)+""
let evalDoAfterBody = js_th_c_forEach_6.doAfterBody();
                    if (evalDoAfterBody != js_th_c_forEach_6.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_forEach_6.doEndTag() == js_th_c_forEach_6.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
      var msg = js_th_c_forEach_6.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            

function _js_meth_c_forEach_7(n){
let js_th_c_forEach_7 =new ForEachImpl();
  try {
//c:forEach
js_th_c_forEach_7.setPageContext(pageContext);
js_th_c_forEach_7.setErrInfo("ERROR:  position:(19,0)\r\n   17|    f${c}\r\n   18|</c:forEach>\r\n>> 19|<c:forEach begin=\"0\" end=\"3\" index=\"c\">\r\n   20|    g${c}\r\n");
js_th_c_forEach_7.setItems(null);js_th_c_forEach_7.setVar("null");js_th_c_forEach_7.setBegin(0);js_th_c_forEach_7.setEnd(3);js_th_c_forEach_7.setIndex("c");
        let each_val = js_th_c_forEach_7.doStartTag();
        if (each_val != js_th_c_forEach_7.SKIP_BODY){
         while (true) {
ghy_shtm_tmp_out_str+="g"+(c==null?"":c)+""
let evalDoAfterBody = js_th_c_forEach_7.doAfterBody();
                    if (evalDoAfterBody != js_th_c_forEach_7.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (js_th_c_forEach_7.doEndTag() == js_th_c_forEach_7.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
      var msg = js_th_c_forEach_7.getErrInfo();
      msg += e;
      ghy_shtm_tmp_out_str=msg;
      return true;
      }
         return false;}
            return ghy_shtm_tmp_out_str;
 }