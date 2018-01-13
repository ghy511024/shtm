/**
 * Created by ghy on 2017/12/1.
 */

const ServletWriter = require ("../writer/ServletWriter");
const StringWriter = require ("../writer/StringWriter");
class GenBuffer {
    constructor () {
        this.stringWriter = new StringWriter ();
        this.out = new ServletWriter (this.stringWriter);
    }

    getOut () {
        return this.out;
    }

    toString () {
        return this.stringWriter.toString ();
    }
}
module.exports = GenBuffer;