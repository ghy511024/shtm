/**
 * Created by ghy on 2017/11/17.
 */
const path = require("path");
// const fs = require("fs");

const Ut = require("./Ut");
const Mark = require("./Mark");
const TagInfo = require("../taglib/TagInfo");

class JspReader {
    constructor(baseDir, fname, str) {
        this.sourceFiles = [];
        this.singleFile = true;
        this.size = 0;
        this.currFileId = 0;
        if (str != null) {
            this.pushString(str);
        } else if (str != null) {
            this.pushFile(baseDir, fname, "utf-8");
        }

    }

    getFile(fileId) {
        return this.sourceFiles[fileId];
    }

    showP(msg) {
        console.log(msg, this.current.line, this.current.col, this.current.cursor)
    }

    matches(str) {
        let mark = this.mark();
        let ch = "";
        let i = 0;
        while (i < str.length) {
            ch = this.nextChar();
            if (ch != str.charAt(i++)) {
                this.reset(mark);
                return false;
            }
        }
        return true;
    }

    /**
     *
     * @return {Boolean}
     */
    hasMoreInput() {

        if (this.current.cursor >= this.current.stream.length) {
            if (this.singleFile) {
                return false
            }
            while (this.popFile()) {
                if (this.current.cursor < this.current.stream.length) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    nextChar() {
        if (!this.hasMoreInput()) {
            return null;
        }
        let ch = this.current.stream[this.current.cursor];
        this.current.cursor++;
        if (ch == '\n') {
            this.current.line++;
            this.current.col = 0;
            this.current.line_cursor_map[this.current.line] = this.current.cursor;
        } else {
            this.current.col++;
        }
        return ch;
    }

    pushChar() {
        this.current.cursor--;
        this.current.col--;
    }

// 强验证
    getText(start, stop) {
        let oldstart = this.mark();
        this.reset(start);
        let ret = "";
        let b = 0;
        while (this.hasMoreInput() && !stop.equals(this.mark())) {
            ret += this.nextChar();
            b++;
        }
        this.reset(oldstart);
        return ret;
    }

    // 强验证
    getTextline(start, endLine) {
        if (start.line > endLine) {
            return null;
        }
        let oldstart = this.mark();
        this.reset(start);
        let ret = "";
        let b = 0;
        while (this.hasMoreInput() && (endLine + 1) != this.mark().line) {
            ret += this.nextChar();
            b++;
        }
        this.reset(oldstart);
        return ret;
    }

    pushString(fileStr) {
        if (!fileStr) {
            return;
        }
        try {
            let charArray = fileStr.split("");
            if (this.current == null) {
                this.current = new Mark(this, charArray)
            } else {
                this.current.pushStream(charArray);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    pushFile(baseDir, fname, encoding, reader) {
        let longName = fname;
        let fileid = this.registerSourceFile(longName);
        if (fileid == -1) {
            //TODO 报错异常
        }
        this.currFileId = fileid;
        let absPath;

        if (baseDir == null || fname.indexOf(baseDir) >= 0) {
            absPath = fname;
        } else {
            absPath = path.join(baseDir, longName)
        }
        // let fileStr = fs.readFileSync(absPath, "utf-8");
        let charArray = fileStr.split("");
        try {
            if (this.current == null) {
                this.current = new Mark(this, charArray, fileid, this.getFile(fileid), "utf-8")
            } else {
                this.current.pushStream(charArray, fileid, this.getFile(fileid), longName, "utf-8");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    matchesETag(tagName) {
        let mark = this.mark();
        if (!this.matches("</" + tagName)) {
            return false;
        }
        this.skipSpaces();
        if (this.nextChar() == '>') {
            return true;
        }
        this.reset(mark);
        return false;
    }

    popFile() {
        if (this.current == null || this.currFileId < 0) {
            return false;
        }
        let fname = this.getFile(this.currFileId);
        this.currFileId = this.unregisterSourceFile(fname);
        if (this.currFileId < -1) {
            //todo err
            // console.error("jsp.error.file.not.registered", fname)
        }
        let previous = this.current.popStream();
        if (previous != null) {
            this.master = this.current.baseDir;
            this.current = previous;
            return true;
        }
        return false;
    }

    mark() {
        return Mark.newMark(this.current);
    }

    reset(mark) {
        this.current = Mark.newMark(mark);
    }

    peekChar() {
        if (!this.hasMoreInput()) {
            return -1;
        }
        return this.current.stream[this.current.cursor];
    }

    registerSourceFile(fileName) {
        if (Ut.arrayContain(this.sourceFiles, fileName)) {
            return -1;
        } else {
            this.sourceFiles.push(fileName);
        }
        return this.sourceFiles.length - 1;
    }

    unregisterSourceFile(fileName) {
        let index = Ut.getIndexFromArray(this.sourceFiles, fileName)
        if (index < 0) {
            return -1;
        }
        this.sourceFiles.splice(index, 1);
        this.size--;
        return this.sourceFiles.length - 1;
    }

    skipUntilETag() {

    }

    parseToken() {
        let ret = "";
        this.skipSpaces();
        if (!this.hasMoreInput()) {
            return "";
        }
        let ch = this.peekChar();
        if (!this.isDelimiter()) {
            while (!this.isDelimiter()) {
                ch = this.nextChar();
                if (ch == '\\') {
                    if (this.peekChar() == '"' || this.peekChar() == '\''
                        || this.peekChar() == '>' || this.peekChar() == '%') {
                        ch = nextChar();
                    }
                }
                ret += ch;
            }

        }
        return ret;
    }

    isDelimiter() {
        if (!this.isSpace()) {
            let ch = this.peekChar();
            if (ch == '=' || ch == '>' || ch == '"' || ch == '\'' || ch == '/') {
                return true;
            }
            if (ch == '-') {
                let mark = this.mark();
                if (((ch = this.nextChar()) == '>')
                    || ((ch == '-') && (this.nextChar() == '>'))) {
                    this.reset(mark);
                    return true;
                } else {
                    this.reset(mark);
                    return false;
                }
            }
            return false;
        } else {
            return true;
        }
    }

    /**
     * 跳过空格
     * @param null
     * @return {Ineger}
     */
    skipSpaces() {
        let i = 0;
        while (this.hasMoreInput() && this.isSpace()) {
            i++;
            this.nextChar();
        }
        return i;
    }

    isSpace() {
        return this.peekChar() <= ' ';
    }

    /**
     * 寻找以limit 结束得字符串位置  ，忽略转义符号 '\',当返回时候，reader 得位置将移动到匹配结束位置
     *
     * @param limit {String} 需要匹配得结束字符串 比如 单引号 '\''，或者双引号 '"'
     * @return {Mark} 结束位置
     */
    skipUntilIgnoreEsc(limit) {
        let ret = null;
        let limlen = limit.length;
        let ch;
        let prev = 'x'; // Doesn't matter
        outer:
            for (ret = this.mark(), ch = this.nextChar(); ch != null; ret = this.mark(), prev = ch, ch = this.nextChar()) {
                if (ch == '\\' && prev == '\\') {
                    ch = null;
                } else if (ch == limit.charAt(0) && prev != '\\') {
                    inter:
                        for (let i = 1; i < limlen; i++) {
                            if (this.peekChar() == limit.charAt(i)) {
                                this.nextChar();
                            } else {
                                continue outer
                            }
                        }
                    return ret;
                }

            }
        return null;
    }
}

JspReader.prototype = {
    current: null,//Mark
    master: "",
    sourceFiles: [],
    currFileId: 0,
    size: 0,
    singleFile: true
}
module.exports = JspReader;