
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
ghy_shtm_tmp_out_str+="\r\n\r\n"+_js_meth_c_el_1()+""
 }
    function _js_meth_c_el_1() {
        try {
        if(typeof (user.real_name || user.name || '-')=='undefined'||(user.real_name || user.name || '-')==null){
            return "";
        }
            return user.real_name || user.name || '-';
        } catch (e) {
             return "";
             // 暂时不按异常处理，当空处理
            // throw  "ERROR:  position:(3,2)\r\n   1|\r\n   2|\r\n>> 3|${user.real_name || user.name || \'-\'}   4|user.real_name || user.name || \'-\'}";
        }
    }
return ghy_shtm_tmp_out_str;
 }