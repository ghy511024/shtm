/**
 * Created by ghy on 2018/1/11.
 */
const Node = require ("../node/Node-Api");
const Mark = require ("../compile/Mark");

class jspErr {
    constructor () {

    }

    static err (node, msg, e) {

        let mark
        if (node instanceof Node) {
            mark = node.startMark;
        } else if (node instanceof Mark) {
            mark = node;
        }
        if (mark == null) {
            throw  new Error (msg, e);
            return;
        }
        let line = mark.line;
        let col = mark.col;
        let name = mark.name;
        var msginfo = "ERROR: " + msg + " position:(" + line + "," + col + ")";
        let tmpText = jspErr.getErrInfo (mark, 2, 2)
        msginfo += "\n" + tmpText;
        throw  new Error (msginfo);
    }

    static getErrInfo (mark, preline, nextline) {
        let sline = Math.max (mark.line - preline, 1)
        let retstr = "";
        for (let i = sline; i < mark.line; i++) {
            let start = Mark.newMark (mark);
            start.resetLine (i);
            retstr += ("   "+i + "|" + mark.reader.getTextline (start, i));
        }
        let cmark = Mark.newMark (mark);
        cmark.resetLine (mark.line);
        retstr += (">> "+cmark.line + "|" + cmark.reader.getTextline (cmark,cmark.line));
        for (let i = 1; i < nextline; i++) {
            let start = Mark.newMark (mark);
            start.resetLine (mark.line + i);
            retstr += "   "+start.line + "|" + mark.reader.getTextline (start, start.line)
        }
        return retstr;
    }
}

module.exports = jspErr;
