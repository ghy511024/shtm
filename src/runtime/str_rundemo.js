module.exports = `var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    var pageContext = new option.PageContext(data);
    var str="";
    with (data || {}) {

        var out = option.out;
        var pageNodes = option.pageNodes;
       
        service (pageNodes.list[0])
        
        function service (n) {

if(_js_meth_c_forEach_1(n.body.list[2])){return true;}

if(_js_meth_c_forEach_2(n.body.list[4])){return true;}
return;
// 开始输出函数体
function _js_meth_c_forEach_1(n){
  try {
//c:forEach

        let js_th_c_forEach_1 =new ForEachImpl()
js_th_c_forEach_1.setPageContext(pageContext);js_th_c_forEach_1.setItems(list);js_th_c_forEach_1.setVar("item");
        let each_val = js_th_c_forEach_1.doStartTag();
        if (each_val != js_th_c_forEach_1.SKIP_BODY){
       var i=0;
         while (true) {

// out.print (item.user);
// out.print("/Web Site:");
// out.print (item.site);

str+=item.user;
str+="/Web Site:";
str+=item.site;
if(i--<0){
break;
}
let evalDoAfterBody = js_th_c_forEach_1.doAfterBody();
                    if (evalDoAfterBody != js_th_c_forEach_1.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
              // return;
            if (js_th_c_forEach_1.doEndTag() == js_th_c_forEach_1.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
      console.log(e)
      }
         return false;}
            
// 开始输出函数体
function _js_meth_c_forEach_2(n){
  try {
//c:forEach

        let js_th_c_forEach_2 =new ForEachImpl()
js_th_c_forEach_2.setPageContext(pageContext);js_th_c_forEach_2.setItems(list);js_th_c_forEach_2.setVar("item");
        let each_val = js_th_c_forEach_2.doStartTag();
        if (each_val != js_th_c_forEach_2.SKIP_BODY){
         while (true) {




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
      console.log(e)
      }
         return false;}
            }
            }
`