const PageContext = require("../../src/ctx/PageContext");
const ForEachIpml = require("../../src/tag/ipml/ForEachIpml");
const Tag = require("../../src/tag/Tag");

class demojs {
    constructor() {
        this.ret = "";
    }
    outjs(data) {
        let _jspx_page_context = new PageContext(data);
        try {
            if (this._js_fun_c_forEach_0(_js_page_context)) {
                return this.ret;
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    _js_fun_c_forEach_0(_js_page_context) {
        let js_th_c_forEach = new forEachIpml();
        // 设置变量
        let items = _js_page_context.getElValue("${list1}");
        js_th_c_forEach.context = _js_page_context;
        js_th_c_forEach.parent = null;
        js_th_c_forEach.setItems(items);
        js_th_c_forEach.setVar("item");
        try {
            let _js_eval_c_forEach_0 = js_th_c_forEach.doStartTag();
            if (_js_eval_c_forEach_0 != Tag.SKIP_BODY) {
                do {
                    this.ret += "nnn";
                    // 结束判断标志
                    let evalDoAfterBody = js_th_c_forEach.doAfterBody();
                    if (evalDoAfterBody != Tag.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
                while (true);
                if (_js_eval_c_forEach_0.doEndTag() == Tag.SKIP_PAGE) {
                    return true;
                }
            }
        }
        catch (e) {
        }
        finally {
            //todo 释放上下文变量
            //js_th_c_forEach.doFinally();
            //todo 回收对象，重新使用
        }
        return false;
        //=== end 部分开始结束
    }

    _js_fun_c_if_0(parent, context) {
        let js_th_c_if = new TagIpml();
        js_th_c_if.parent = parent;
        js_th_c_if.context = context;
        let _js_eval_c_if_0 = js_th_c_if.doStartTag();
        if (_js_eval_c_if_0 != Tag.SKIP_BODY) {
            do {

                // 结束判断标志
                let evalDoAfterBody = js_th_c_forEach.doAfterBody();
                if (evalDoAfterBody != Tag.EVAL_BODY_AGAIN) {
                    break;
                }
            } while (true)
            if (_js_eval_c_if_0.doEndTag() == Tag.SKIP_PAGE) {
                return true;
            }
        }
        return false;
    }
}

let d = new demojs();