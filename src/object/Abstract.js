/**
 * Created by ghy on 2017/12/1.
 */
class Abstract {
    DT (mth, args) {
        let ext_mth="_"+mth;
        if (args.length > 0) {

            for (let i = 0; i < args.length; i++) {
                if (typeof args[i] == "string") {
                    ext_mth += "_str";
                } else if (typeof args[i] == "number") {
                    ext_mth += "_num";
                }
                else if (typeof args[i] == "boolean") {
                    ext_mth += "_bol";
                } else if (typeof args[i] == "object") {
                    if (args[i] instanceof Array) {
                        ext_mth += "_arr";
                    } else {
                        ext_mth += "_obj";
                    }
                }
            }
        }
        if (typeof  this[ext_mth] == "function") {
            this[ext_mth] (args);
        }
    }
}
module.exports = Abstract;