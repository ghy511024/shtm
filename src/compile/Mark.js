/**
 * 标记类，辅助字符串输入操作
 * @author ghy
 * @date 20171117
 *
 */
class Mark {
    constructor (reader, stream, fileid, name, baseDir, encoding) {
        this.reader = reader;
        this.baseDir = baseDir;
        this.stream = stream;
        this.fileId = fileid;
        this.encoding = encoding;
        this.name = name;
        this.col = 1;
        this.line = 1;
        this.cursor = 0;
        this.includeStack = [];
        this.line_cursor_map = { 1: 0 };
    }

    getIncludeMark (inCursor, inLine, inCol, inFileid, name, inBaseDir, inEncoding, inStream) {
        let mark = new Mark (null, inStream, inFileid, name, inBaseDir, inEncoding);
        mark.col = inCol;
        mark.cursor = inCursor;
        mark.line = inLine;
        return mark;
    }

    /**
     * 判断两个mark 是否相等
     * @param mark {Mark}
     * @return {Boolean}
     */
    equals (mark) {
        if (mark instanceof Mark) {
            return this.reader == mark.reader && this.fileId == mark.fileId
                && this.cursor == mark.cursor && this.line == mark.line
                && this.col == mark.col;
        }
        return false;
    }

    // get one from other
    copyMark () {

    }

    static newMark (inMark) {
        let mark = new Mark (inMark.reader, inMark.stream, inMark.fileId, inMark.baseDir, inMark.encoding);
        mark.line = inMark.line;
        mark.col = inMark.col;
        mark.cursor = inMark.cursor;
        mark.line_cursor_map = inMark.line_cursor_map;
        for (let i = 0; i < inMark.includeStack.length; i++) {
            mark.includeStack.push (inMark.includeStack[i]);
        }
        return mark;
    }

// 涉及到
    resetLine (line) {
        this.line = line;
        this.col = 1;
        this.cursor = this.line_cursor_map[line] != null ? this.line_cursor_map[line] : this.cursor;
    }


    /**
     * 文件流压栈操作
     * @param inStream {Array<Char>} new stream for mark
     * @param inFileid {Integer}
     * @param name {String}
     * @param inBaseDir {String}
     * @param inEncoding {String}
     * @returns null
     */
    pushStream (inStream, inFileid, name, inBaseDir, inEncoding) {
        // 当前文件mark压栈
        this.includeStack.push (this.getIncludeMark (this.cursor, this.line, this.fileId, this.fileName, this.baseDir, this.encoding, this.stream))
        this.cursor = 0;
        this.line = 1;
        this.col = 1;
        this.fileId = inFileid;
        this.fileName = name;
        this.baseDir = inBaseDir;
        this.encoding = inEncoding;
        this.stream = inStream;

    }

    popStream () {

    }

    showP () {

    }


    getInfo () {
        return "(" + this.line + "-" + this.col + "-" + this.cursor + ")";
    }
}

Mark.prototype = {
    reader: null,
    cursor: 1,
    line: 1,
    col: 0,
    fileId: 0,
    fileName: 0,
    includeStack: [],
    stream: null,//Buffer
    encoding: "utf-8",
    fileName: "",
    baseDir: "",
}

module.exports = Mark;