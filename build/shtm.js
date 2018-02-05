/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by ghy on 2017/11/17.
 */
const Nodes = __webpack_require__(8);

class Node {
    constructor(qName, localName, attrs, start, parent) {
        this.qName = qName;//full name [c:forEach]
        this.localName = localName;// [forEach]
        this.attrs = attrs;
        // this.taglibAttrs = taglibAttrs;
        this.startMark = start;
        this.isDummy = (start == null);
        this.addToParent(parent);
        this.name = "node";
        this.buffer = "";
    }

    /**
     * 写入buffer,进入缓冲
     * */
    write(s) {
        this.buffer += s;
    }

    getBuffer() {
        return this.buffer;
    }

    /**
     * 输出缓冲
     * */
    flush() {
        var buffer = this.buffer;
        this.buffer = "";
        return buffer;
    }

    addToParent(parent) {
        if (parent != null) {
            this.parent = parent;
            let parentBody = parent.body;
            if (parentBody == null) {
                parentBody = new Nodes();
                parent.body = parentBody;
            }
            parentBody.add(this);
        }
    }

    static getCustomTag() {

    }

    getBody() {
        return this.body;
    }

    /**
     * @abstract 抽象方法
     * @param v {Visitor}
     */
    accept(v, i, parent_index) {
        v.visit(this, i, parent_index);

    }

}

Node.prototype = {
    body: null,//<Nodes>
    parent: null,//<node>
    text: "",// 文本内容
    qName: "",
    startMark: null,
    localName: "",
    beginJSLine: 0,
    endJSLine: 0,
    root: null,
    taglibAttrs: null,
}
module.exports = Node;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);
const CustomTag = __webpack_require__(23);
const TempleteText = __webpack_require__(24);
const Nodes = __webpack_require__(8);
const Root = __webpack_require__(25);
const ELExpression = __webpack_require__(26);
const Visitor = __webpack_require__(27);

Node.CustomTag = CustomTag;
Node.TempleteText = TempleteText;
Node.Nodes = Nodes;
Node.Root = Root;
Node.ELExpression = ELExpression;
Node.Visitor = Visitor;

module.exports = Node;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * 标记类，辅助字符串输入操作
 * @author ghy
 * @date 20171117
 *
 */
class Mark {
    constructor(reader, stream, fileid, name, baseDir, encoding) {
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
        this.line_cursor_map = {1: 0};
    }

    // getIncludeMark(inCursor, inLine, inCol, inFileid, name, inBaseDir, inEncoding, inStream) {
    //     let mark = new Mark(null, inStream, inFileid, name, inBaseDir, inEncoding);
    //     mark.col = inCol;
    //     mark.cursor = inCursor;
    //     mark.line = inLine;
    //     return mark;
    // }

    /**
     * 判断两个mark 是否相等
     * @param mark {Mark}
     * @return {Boolean}
     */
    equals(mark) {
        if (mark instanceof Mark) {
            return this.reader == mark.reader && this.fileId == mark.fileId
                && this.cursor == mark.cursor && this.line == mark.line
                && this.col == mark.col;
        }
        return false;
    }


    static newMark(inMark) {
        if (inMark == null) {
            return null;
        }
        let mark = new Mark(inMark.reader, inMark.stream, inMark.fileId, inMark.baseDir, inMark.encoding);
        mark.line = inMark.line;
        mark.col = inMark.col;
        mark.cursor = inMark.cursor;
        mark.line_cursor_map = inMark.line_cursor_map;
        // for (let i = 0; i < inMark.includeStack.length; i++) {
        //     mark.includeStack.push(inMark.includeStack[i]);
        // }
        return mark;
    }

// 涉及到
    resetLine(line) {
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
    // pushStream(inStream, inFileid, name, inBaseDir, inEncoding) {
    //     // 当前文件mark压栈
    //     this.includeStack.push(this.getIncludeMark(this.cursor, this.line, this.fileId, this.fileName, this.baseDir, this.encoding, this.stream))
    //     this.cursor = 0;
    //     this.line = 1;
    //     this.col = 1;
    //     this.fileId = inFileid;
    //     this.fileName = name;
    //     this.baseDir = inBaseDir;
    //     this.encoding = inEncoding;
    //     this.stream = inStream;
    //
    // }


    getInfo() {
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by ghy on 2018/1/11.
 */
const Node = __webpack_require__(1);
const Mark = __webpack_require__(2);

class jspErr {
    constructor() {

    }

    static err(node, msg, e) {

        let mark
        if (node instanceof Node) {
            mark = node.startMark;
        } else if (node instanceof Mark) {
            mark = node;
        }
        if (mark == null) {
            throw  new Error(msg, e);
            return;
        }
        let line = mark.line;
        let col = mark.col;
        let name = mark.name;
        var msginfo = "ERROR: " + msg + " position:(" + line + "," + col + ")";
        let tmpText = jspErr.getErrInfo(mark, 2, 2)
        msginfo += "\r\n" + tmpText;
        throw  new Error(msginfo);
    }

    static getErrInfo(mark, preline, nextline) {
        let sline = Math.max(mark.line - preline, 1)
        let retstr = "";
        for (let i = sline; i < mark.line; i++) {
            let start = Mark.newMark(mark);
            start.resetLine(i);
            retstr += ("   " + i + "|" + mark.reader.getTextline(start, i));
        }
        let cmark = Mark.newMark(mark);
        cmark.resetLine(mark.line);
        retstr += (">> " + cmark.line + "|" + cmark.reader.getTextline(cmark, cmark.line));
        for (let i = 1; i < nextline; i++) {
            let start = Mark.newMark(mark);
            start.resetLine(mark.line + i);
            retstr += "   " + start.line + "|" + mark.reader.getTextline(start, start.line)
        }
        return retstr;
    }

    static  getErrInfoByNode(node) {
        var mark = node.startMark;
        var line = mark.line;
        var col = mark.col;
        var name = mark.name;
        var preline = 2;
        var nextline = 2;
        var msginfo = "ERROR: " + " position:(" + line + "," + col + ")\r\n";

        var sline = Math.max(mark.line - preline, 1)
        var retstr = "";
        for (let i = sline; i < mark.line; i++) {
            var start = Mark.newMark(mark);
            start.resetLine(i);
            retstr += ("   " + i + "|" + mark.reader.getTextline(start, i));
        }
        let cmark = Mark.newMark(mark);
        cmark.resetLine(mark.line);
        retstr += (">> " + cmark.line + "|" + cmark.reader.getTextline(cmark, cmark.line));
        for (let i = 1; i < nextline; i++) {
            let start = Mark.newMark(mark);
            start.resetLine(mark.line + i);
            retstr += "   " + start.line + "|" + mark.reader.getTextline(start, start.line)
        }
        var str = (msginfo + retstr).replace(/(\n)/g, "\\n");
        str = str.replace(/(\r)/g, "\\r");
        str = str.replace(/(\")/g, "\\\"");
        str = str.replace(/(\')/g, "\\\'");
        return str
    }
}

module.exports = jspErr;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Tag = __webpack_require__(9);

class TagSupport extends Tag {
    constructor() {
        super();
        this.pageContext = null;
        this.parent = null;
        this.id = null;
        this.values = {};
        this.errInfo = "";
    }

    setPageContext(pageContext) {
        this.pageContext = pageContext;
    }

    setErrInfo(errInfo) {
        this.errInfo = errInfo;
    }

    getErrInfo(errInfo) {
        return this.errInfo;
    }

    /**
     * @abstract
     *
     * */
    doStartTag() {

    }

    doEndTag() {
        return this.EVAL_PAGE;
    }
}

module.exports = TagSupport;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

const TAB_WIDTH = 2;
const SPACES = "                          ";
/**
 * writer 本来应该是最后再写的，前面应该把各种约定定义好
 * */

class ServletWriter {
    /**
     * @param writer {StringWriter}
     * */
    constructor(writer) {
        this.indent = 0;
        this.vertual_indent = 0;
        this.javaLine = 1;
        // if (writer instanceof Writer) {
        //     this.writer = writer;
        // }
        this.writer = writer;
    }

    pushIndent() {
        this.vertual_indent += TAB_WIDTH;
        if (this.vertual_indent >= 0 && this.vertual_indent < SPACES.length) {
            this.indent = this.vertual_indent;
        }
    }

    print(str) {
        this.writer.print(str);
    }

    printin() {
        this.writer.print(SPACES.substring(0, this.indent));

    }

    println(s) {
        this.javaLine++;
        this.writer.println(s)
    }

    /**
     * 尾部换行打印
     * */
    printil(s) {
        this.javaLine++;
        this.writer.print(SPACES.substring(0, this.indent));
        this.writer.println(s)
    }


    printMultiLn(s) {
        let index = 0;
        while ((index = s.indexOf('\n', index)) > -1) {
            this.javaLine++;
            index++;
        }
        this.writer.print(s);
    }

    toString() {
        return this.writer.toString();
    }


}

(function () {
// let path=path.join()
//     let swriter = new StringWriter ();
    // let out = new ServletWriter (swriter);
    // out.println ("if(");
    // out.print ("x>0");
    // out.printil ("sdfsdf");
    // out.print (")");
    // console.log (swriter.toString ())
})()

module.exports = ServletWriter;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 字符串直出
 * */

const Node = __webpack_require__ (1);
const Tag = __webpack_require__ (9);
const PageContext = __webpack_require__ (10);

// tag 解析实现类
const ForEachImpl = __webpack_require__ (11);
const IfImpl = __webpack_require__ (12);
const Parser = __webpack_require__ (13);
const jerr = __webpack_require__ (4);
const path = __webpack_require__ (3)
const GenBuffer = __webpack_require__ (31);

const OUT_STR = "ghy_shtm_tmp_out_str"//名字取这么长，防止，用户数据中，传入字变量与此重名，届时会冲突造成模板解析不正确
class GenerateVisitor extends Node.Visitor {
    constructor (out, pageContext, compiler) {
        super ();
        this.out = out;
        this.tagVarNumbers = {};
        this.out = out;
        this.compiler = compiler;
        this.methodsBuffered = [];
    }

    /**
     * 覆盖父类visit 抽象方-----+-+法
     */
    visit (n) {
        if (n instanceof Node.CustomTag) {
            this.out.println (OUT_STR + "+=\"" + n.parent.flush () + "\"")
            this._vCustomTag (n);
        }
        else if (n instanceof Node.Root) {
            this._vRoot (n);
        } else if (n instanceof Node.TempleteText) {
            this._vTempleteText (n);
        } else if (n instanceof Node.ELExpression) {
            this._vELExpression (n);
        }
    }

    /**
     * 打印根目录
     * */
    _vRoot (n) {
        this.visitBody (n);
        this.out.println (OUT_STR + "+=\"" + n.flush () + "\"")
    }

    /**
     * 技巧处理，存缓存，然后回退打印父类
     */
    _vCustomTag (n) {
        let outSave = null;
        let baseVar = this.createTagVarName (n.qName, n.prefix, n.localName)
        let tagEvalVar = "_js_eval_" + baseVar;
        let tagHandlerVar = "js_th_" + baseVar;
        let tagPushBodyCountVar = "_js_push_body_count_" + baseVar;
        let tagMethod = "_js_meth_" + baseVar;

        this.out.println ();
        this.out.print (`if(${tagMethod}()){return true;}`)
        let genBuffer = new GenBuffer ();
        this.methodsBuffered.push (genBuffer);
        outSave = this.out;// 存档
        this.out = genBuffer.getOut ();
        this.out.println ()
        // this.out.print("// 开始输出函数体");
        this.out.println ()
        this.out.println (`function ${tagMethod}(n){`)
        let implName = this.getImplMethName (n);
        this.out.println (`let ${tagHandlerVar} =new ${implName}();`)
        this.out.println (`  try {`)
        this.generateCustomStart (n, tagHandlerVar);

        if (n.localName == "include") {
            this._vIncludeAction (n);
            // this.out.println (OUT_STR + "+=\"" + n.flush () + "\"")
        } else {
            this.visitBody (n);
            this.out.println (OUT_STR + "+=\"" + n.flush () + "\"")
        }

        this.generateCustomEnd (n, tagHandlerVar);
        this.out = outSave;
    }

    /**
     * include 实现，
     * */
    _vIncludeAction (n, i) {
        if (this.compiler.getBaseDir () == null || this.compiler.getBaseDir ().length == 0) {
            return;
        }
        // let pageNodes = this.compiler.getPageNode(path.join(this.compiler.getBaseDir(), n.attrs.getValue("page")), n.parent);
        let pageNodes = this.compiler.getPageNode (path.join (this.compiler.getBaseDir (), n.attrs.getValue ("page")), n);
        if (pageNodes == null) {
            jerr.err ("GetnnerateVisitor.visitInclude err")
            return;
        }
        pageNodes.visit (this, (n.parent.body.list.length - 1));
    }


    /**
     * 打印普通文本
     * */
    _vTempleteText (n) {
        let text = n.text || "";
        if (text.length == 0) {
            return;
        }
        this.out.println ();
        let sb = "";
        let count = 1024;
        for (let i = 0; i < text.length; i++) {
            let ch = text[i];
            --count;
            switch (ch) {
                case '"':
                    sb += '\\\"';
                    break;
                case '\\':
                    sb += '\\\\';
                    break;
                case '\r':
                    sb += '\\r';
                    break;
                case '\n':
                    sb += '\\n';
                    break;
                case '\t':
                    sb += '\\t';
                    break;
                case '$':
                    if ((i + 1 < text.length) && (text.charAt (i + 1) == '{')) {
                        sb += '\\\\';
                    }
                    sb += ch;
                    break;
                default:
                    sb += ch;
            }
        }
        n.parent.write (sb);
    }

    /**
     * 打印el 表达式
     *
     * */
    _vELExpression (n) {
        if (n.parent.write) {
            n.parent.write ("\"+(" + this.getAfterElexpress (n.text) + "==null?\"\":" + this.getAfterElexpress (n.text) + ")+\"");
        }
    }

    /**
     * 自定义函数，foreach,if 等输出函数体头部
     * @param n {Node}
     * @param tagHandlerVar {String} 变量名
     * */
    generateCustomStart (n, tagHandlerVar) {
        this.out.println ("//" + n.qName);
        let errinfo = jerr.getErrInfoByNode (n);// 预先获取错误信息，当异常得时候，可以直接拿出来输出
        this.out.pushIndent ();
        this.out.println (`${tagHandlerVar}.setPageContext(pageContext);`)
        this.out.println (`${tagHandlerVar}.setErrInfo("${errinfo}");`)
        this.generateSetters (n, tagHandlerVar);
        this.out.print (`
        let each_val = ${tagHandlerVar}.doStartTag();
        if (each_val != ${tagHandlerVar}.SKIP_BODY){
         while (true) {`);
    }

    generateSetters (n, tagHandlerVar) {
        // this.out.print(`${tagHandlerVar}.setPageContext(pageContext);`);//
        if (n.localName == "forEach") {
            let valName = this.getAfterElexpress (n.attrs.getValue ("items"));
            this.out.print (`${tagHandlerVar}.setItems(${valName});`);//
            this.out.print (`${tagHandlerVar}.setVar("${n.attrs.getValue ("var")}");`);//
            if (/^\d+$/g.test (n.attrs.getValue ("begin"))) {
                this.out.print (`${tagHandlerVar}.setBegin(${n.attrs.getValue ("begin")});`);//
            }
            if (/^\d+$/g.test (n.attrs.getValue ("end"))) {
                this.out.print (`${tagHandlerVar}.setEnd(${n.attrs.getValue ("end")});`);//
            }
            if (n.attrs.getValue ("index") != null && n.attrs.getValue ("index").length > 0) {
                this.out.print (`${tagHandlerVar}.setIndex("${n.attrs.getValue ("index")}");`);//
            }

        }
        else if (n.localName == "if") {
            let valName = this.getAfterElexpress (n.attrs.getValue ("test"));
            this.out.print (`${tagHandlerVar}.setTest(${valName});`);//
        }
    }

    generateCustomEnd (n, tagHandlerVar) {
        this.out.print (`let evalDoAfterBody = ${tagHandlerVar}.doAfterBody();
                    if (evalDoAfterBody != ${tagHandlerVar}.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
            if (${tagHandlerVar}.doEndTag() == ${tagHandlerVar}.SKIP_PAGE) {
            return true;
        }
      }
      catch(e){
      var msg = ${tagHandlerVar}.getErrInfo();
      msg += e;
      ${OUT_STR}=msg;
      return true;
      }
         return false;}
            `)
    }

    /**
     * 输出结束代码
     *
     * */
    generatePostamble (n) {
        this.genCommonPostamble ();
    }

    /**
     * 输出缓存区间的的，代码
     * */
    genCommonPostamble () {
        for (let i = 0; i < this.methodsBuffered.length; i++) {
            let buffer = this.methodsBuffered[i];
            this.out.printMultiLn (buffer.toString ());
        }
        this.out.printil ("return " + OUT_STR + ";");// with 函数结尾

    }

    /**
     * 传入node ，根据node 类型返回对应的tagimpul 实例函数名
     * @param n {Node}
     * */
    getImplMethName (n) {
        let implName = "";
        if (n.localName == "forEach") {
            implName = "ForEachImpl";
        } else if (n.localName == "if") {
            implName = "IfImpl";
        } else if (n.localName == "include") {
            implName = "IncludeImpl";
        }
        return implName;
    }

    getAfterElexpress (exp) {
        if (exp == null) {
            return null;
        }
        let exp_str;
        let reg = /\$\{(.*?)\}/gi
        exp.replace (reg, function (_, $1) {
            exp_str = $1;
        })
        return exp_str
    }

    createTagVarName (fullName, prefix, shortName) {
        let varName;
        varName = prefix + "_" + shortName + "_"
        if (this.tagVarNumbers[fullName] != null) {
            let i = Number (this.tagVarNumbers[fullName]) || 0;
            varName = varName + (i + 1);
            this.tagVarNumbers[fullName] = i + 1;
        } else {
            varName = varName + 1;
            this.tagVarNumbers[fullName] = 1;
        }
        return varName;
    }
}

GenerateVisitor.prototype = {
    tagVarNumbers: {},
    parent: "",
    isFragment: "",
    methodNesting: 0,
    arrayCount: 0,
    textMap: {},
}
GenerateVisitor.OUT_STR = OUT_STR;

module.exports = GenerateVisitor;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);

class Nodes {

    constructor(root) {
        this.root = root;
        this.list = [];
        if (root != null) {
            this.list.push(root);
        }
        this.name = "nodes"

    }

    add(n) {
        this.list.push(n);
        this.root = null;
    }


    /**
     * 设计模式之 访问模式
     * @abstract
     * @param v {Visitor}
     */
    visit(v, parent_index) {
        let iter = this.list;
        for (let i = 0; i < iter.length; i++) {
            let item = iter[i]
            if (item != null) {
                item.accept(v, i, parent_index);
            }
        }
    }

}

Nodes.prototype = {
    root: null,
    generatedInBuffer: false
}

module.exports = Nodes;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Tag {
    constructor () {
        this.SKIP_BODY = 0;
        this.EVAL_BODY_INCLUDE = 1;
        this.EVAL_BODY_AGAIN = 2;
        this.SKIP_PAGE = 5;
        this.EVAL_PAGE = 6;
    }
}
Tag.prototype = {
    SKIP_BODY: 0,
    EVAL_BODY_INCLUDE: 1,
    EVAL_BODY_AGAIN: 2,
    SKIP_PAGE: 5,
    EVAL_PAGE: 6,
}
module.exports = Tag;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const PAGE_SCOPE = 1;
const REQUEST_SCOPE = 2;
const SESSION_SCOPE = 3;
const APPLICATION_SCOPE = 4;

const PAGE = "node.jstl.jsPage";
const REQUEST = "node.jstl.jsRequest";
const SESSION = "node.jstl.jsSession";

const ELparser = __webpack_require__(28);
const path = __webpack_require__(3);

class PageContext {
    constructor(data) {
        this.data = data;
        this.attributes = {};
        this.isNametableInitialized = false;
    }

    setAttribute(name, attribute) {
        if (attribute != null) {
            if (!this.isNametableInitialized) {
                this.initializePageScopeNameTable();
            }
            this.data[name] = attribute;
        } else {
            this.data[name] = null;
        }
    }

    removeAttribute(name) {
        this.data[name] = null;
    }

    hasValue(itemName) {
        return this.data[itemName] != null;
    }

    getAttribute(name) {
        if (!this.isNametableInitialized) {
            this.initializePageScopeNameTable();
        }
        return this.data[name];
    }

    initializePageScopeNameTable() {
        // 留着以后扩展吧，暂时用不到
        this.isNametableInitialized = true;
        this.setAttribute(PAGE, {})
        this.setAttribute(REQUEST, {})
        this.setAttribute(SESSION, {})
    }
}

module.exports = PageContext;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const TagSupport = __webpack_require__(5);


class ForEachIpml extends TagSupport {
    constructor() {
        super();
        this.items = null;
        this.index = 0;
        this.indexId = "index";
        this.count = 1;
        this.end = -1;
        this.begin = 0;
        this.step = 1;
        this.item = null;
        this.last = false;
        this.statusId = null;
        this.all_len = 0;
        this.cindex = 0;// 当前索引
    }

    hasNext() {
        return this.items != null && this.items.length > 0;
    }

    next() {
        return this.items.shift();

    }

    setItems(o) {
        this.rawItems = o;
    }

    setVar(_id) {
        if (this.pageContext.hasValue(_id)) {
            this.saveVar = this.pageContext.getAttribute(_id)
        }
        this.itemId = _id;
    }

    resetVar() {
        if (this.saveVar != null) {
            this.pageContext.setAttribute(this.itemId, this.saveVar)
        } else {
            this.pageContext.removeAttribute(this.itemId)
        }
        if (this.saveIndex != null) {
            this.pageContext.setAttribute(this.indexId, this.saveIndex)
        } else {
            this.pageContext.removeAttribute(this.indexId)
        }
    }

    setBegin(begin) {
        if (begin !== null) {
            this.begin = begin;
        }
    }

    setEnd(end) {
        if (end !== null) {
            this.end = end;
        }
    }

    setIndex(indexId) {
        if (this.pageContext.hasValue(indexId)) {
            this.saveIndex = this.pageContext.getAttribute(indexId);
        }
        this.indexId = indexId;
    }

    exposeVariables(firstTime) {
        if (this.itemId != null) {
            if (this.getCurrent() == null) {
            } else if (this.deferredExpression != null) {

            } else {
                this.pageContext.setAttribute(this.itemId, this.getCurrent())
                this.pageContext.setAttribute(this.indexId, this.index + 1)
            }
        }

    }

    discard(n) {
        let oldIndex = this.index;
        while (n-- > 0 && !this.atEnd() && this.hasNext()) {
            this.index++;
            this.next();
        }
        this.index = oldIndex;
    }

    doStartTag() {

        if (this.end != -1 && this.begin > this.end) {
            return
        }
        this.index = 0;
        this.count = 1;
        this.cindex = 0;// 重置游标
        this.last = false;
        this.iteratedExpression = null;
        this.deferredExpression = null;

        this.prepare();// 数据转换
        this.all_len = this.items.length;// 重置长度

        // 设置了开始标签，直接从开始标签起步
        this.discardIgnoreSubset(this.begin);
        if (this.hasNext()) {
            this.item = this.next();
        } else {
            return this.SKIP_BODY;
        }
        this.discard(this.step - 1);

        // 设置临时变量，比如循环中第一个object 赋值为 item
        this.exposeVariables(true);
        this.calibrateLast();

        return this.EVAL_BODY_INCLUDE;
    }


    doAfterBody() {
        this.index += this.step - 1;
        this.count++;
        // console.log("开始判断", this.item, this.hasNext(), !this.atEnd(), this.end, this.begin, this.index)
        if (this.hasNext() && !this.atEnd()) {
            this.index++;
            this.item = this.next();
        } else {
            this.resetVar();
            return this.SKIP_BODY;
        }

        this.discard(this.step - 1)
        this.exposeVariables(false);
        this.calibrateLast();
        return this.EVAL_BODY_AGAIN;
    }

    /**
     * 将 rawItems 转换设置为items
     * */
    prepare() {
        if (this.rawItems != null) {
            // 数据转换
            this.rawItems = this.supportedTypeForEachIterator(this.rawItems)
            this.items = this.rawItems;

        } else {
            // 没有items 就使用begin ,end
            this.items = this.beginEndForEachIterator();
        }

    }

    discardIgnoreSubset(n) {
        while (n-- > 0 && this.hasNext()) {
            this.next();
        }
    }

    atEnd() {
        return ((this.end != -1) && (this.begin + this.index >= this.end));
    }

    calibrateLast() {
        this.last = !this.hasNext() || this.atEnd() || (this.end != -1 && (this.begin + this.index + this.step > this.end));
    }

    beginEndForEachIterator() {
        let ia = [];
        for (let i = 0; i <= this.end; i++) {
            ia[i] = i;
        }
        return ia;
    }

    getCurrent() {
        return this.item;
    }

    /**
     * 遍历数据类型转换
     * @param o{Object}
     * */
    supportedTypeForEachIterator(o) {
        let ret = [];
        if (o instanceof Array) {
            ret = Object.assign([], o);
        } else if (typeof o == "object") {
            for (let key in o) {
                if (typeof o[key] !== "function") {
                    let obj = {key: key, value: o[key]};
                    ret.push(obj);
                }
            }
        } else if (typeof o == "string") {
            ret = o.split(",")
        } else {

        }
        return ret;
    }
}

module.exports = ForEachIpml;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const TagSupport = __webpack_require__(5);

class IfIpml extends TagSupport {
    constructor() {
        super();
        this.test = false;
        this.result = false;
        this.var;
    }

    setTest(el) {

        if (typeof el == "boolean") {
            this.test = el;
        } else {
            this.test = false;
        }
    }

    exposeVariables(firstTime) {
        if (this.var != null) {
            this.pageContext.setAttribute(this.var, this.result);
        }
    }


    condition() {
        return this.test;
    }

    doStartTag() {
        this.result = this.condition();
        this.exposeVariables();
        if (this.result)
            return this.EVAL_BODY_INCLUDE;
        else
            return this.SKIP_BODY;
    }


    doAfterBody() {
        return this.SKIP_BODY;
    }

}

module.exports = IfIpml;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by ghy on 2017/11/17.
 */


const Node = __webpack_require__ (1);
const JspReader = __webpack_require__ (14);
const Ut = __webpack_require__ (15);
const Mark = __webpack_require__ (2);
const Attributes = __webpack_require__ (30)
const TagInfo = __webpack_require__ (16);
const jerr = __webpack_require__ (4);

const JSP_BODY_CONTENT_PARAM = "JSP_BODY_CONTENT_PARAM"

class Parser {
    constructor (reader) {
        this.reader = reader;
        this.start = reader.mark ();
    }

    /**
     * parse 函数入口 非常
     * @param path {String} 文件绝对路径
     * @param reader {JspReader} 字符读取处理类实例
     * @param parent {Node} 字符读取处理类实例
     * @return {Node.Nodes} page 对象，
     */
    static parse (reader, parent) {
        let parser = new Parser (reader);
        let root = new Node.Root (reader.mark (), parent);
        let i = 0;
        while (reader.hasMoreInput ()) {
            parser.parseElements (root);
            i++;
        }
        let page = new Node.Nodes (root);
        return page;
    }

    parseElements (parent) {

        this.start = this.reader.mark ();
        if (this.reader.matches ("${")) {
            this.parseELExpression (parent, "${")
        }
        // else if (this.reader.matches("<jsp:")) {
        //     this.parseStandardAction(parent);
        // }
        else if (!this.parseCustomTag (parent)) {
            this.parseTempleteText (parent);
        }
    }


    parseTempleteText (parent) {

        // if (!this.reader.hasMoreInput()) {
        //     return;// 不会执行到这儿，因为上层已经屏蔽了
        // }
        let ttext = "";
        let ch = this.reader.nextChar ();
        if (ch == '\\') {
            this.reader.pushChar ();
        } else {
            ttext += ch;
        }
        while (this.reader.hasMoreInput ()) {
            ch = this.reader.nextChar ();
            if (ch == '<') {
                let c1 = this.reader.nextChar ();
                if (!this.reader.hasMoreInput ()) {
                    ttext += ch+c1;
                    break;
                }
                let c2 = this.reader.nextChar ();
                if (!this.reader.hasMoreInput ()) {
                    ttext += ch+c1+c2;
                    break;
                }
                let c3 = this.reader.nextChar ();
                if (!this.reader.hasMoreInput ()) {
                    ttext += ch+c1+c2+c3;
                    break;
                }
                if (c1 == 'c' && c2 == ':') {
                    this.reader.pushChar ();
                    this.reader.pushChar ();
                    this.reader.pushChar ();
                    this.reader.pushChar ();
                    break;
                } else if (c1 == '/' && c2 == 'c' && c3 == ':') {
                    this.reader.pushChar ();
                    this.reader.pushChar ();
                    this.reader.pushChar ();
                    this.reader.pushChar ();
                    break;
                }
                this.reader.pushChar ();
                this.reader.pushChar ();
                this.reader.pushChar ();
                ttext += ch;
                continue;
                // this.reader.pushChar();
                // break;
            } else if (ch == '$' || ch == '$') {
                if (!this.reader.hasMoreInput ()) {
                    ttext += ch;
                    break;
                }
                if (this.reader.nextChar () == '{') {
                    this.reader.pushChar ();
                    this.reader.pushChar ();
                    break;
                }
                ttext += ch;
                this.reader.pushChar ();
                continue;
            }
            else if (ch == '\\') { // abc\\${123 连个斜杠情况下
                if (!this.reader.hasMoreInput ()) {
                    ttext += ch;
                    break;
                }
                let next = this.reader.peekChar ();
                if (next == '%' || next == '$' || next == '#') {
                    ch = this.reader.nextChar ();
                }
            }
            ttext += ch;
        }
        new Node.TempleteText (ttext, this.start, parent);
    }

    /**
     * 解析jsp: 标准语法
     * */
    // parseStandardAction(parent) {
    //     let start = this.reader.mark();
    //     if (this.reader.matches("include")) {
    //         this.parseInclude(parent)
    //     }
    // }

    /**
     * 解析<jsp:include>
     * */
    // parseInclude(parent) {
    //     let attrs = this.parseAttributes();
    //     this.reader.skipSpaces();
    //     // Node 类型
    //     let includeNode = new Node.IncludeAction(attrs, this.start, parent);
    //     this.parseOptionalBody(includeNode, "jsp:include", TagInfo.BODY_CONTENT_PARAM)
    // }

    parseCustomTag (parent) {
        // this.reader.showP("Parser.parseCustomTag")
        if (this.reader.peekChar () != '<') {
            return false;
        }

        this.reader.nextChar ();
        // let tagnName = "c:forEach"// 这儿tag 应该从一个方法中获取，暂时写死
        let tagName = this.reader.parseToken ();
        let i = tagName.indexOf (':');
        if (i == -1) {
            this.reader.reset (this.start);
            return false;
        }
        let prefix = tagName.substring (0, i);
        let shortTagName = tagName.substring (i + 1);

        let attrs = this.parseAttributes ();
        let uri = "";
        this.reader.skipSpaces ();
        if (this.reader.matches ("/>")) {
            new Node.CustomTag (
                tagName,
                prefix,
                shortTagName,
                uri,
                attrs,
                this.start,
                parent);
            return true;
        }
        // 有内容
        let tagNode = new Node.CustomTag (
            tagName,
            prefix,
            shortTagName,
            uri,
            attrs,
            this.start,
            parent);
        this.parseOptionalBody (tagNode, tagName, "JSP")
        return true;
    }

    /**
     * ELExpressionBody
     *  (举个栗子 "${" or "#{"to first unquoted "}")
     * @param
     * @return
     */
    parseELExpression (parent, typeEL) {
        this.start = this.reader.mark ();
        let singleQuoted = false;
        let doubleQuoted = false;
        let curl = 0;
        let ch;
        while (ch != '}' || curl >= 0 || singleQuoted || doubleQuoted) {
            ch = this.reader.nextChar ();
            if (ch == '\\' && (singleQuoted || doubleQuoted)) {
                this.reader.nextChar ();
                ch = this.reader.nextChar ();
            }
            if (ch == null) {
                jerr.err (this.reader.mark (), "parser.parseELExpression")
            }
            if (ch == '"') {
                doubleQuoted = !doubleQuoted;
            } else if (ch == '\'') {
                singleQuoted = !singleQuoted;
            }
            else if (ch == '{') {
                curl++;
            } else if (ch == '}') {
                curl--;
            }
        }
        let text = typeEL + this.reader.getText (this.start, this.reader.mark ())
        new Node.ELExpression (text, this.start, parent);
    }

    parseOptionalBody (parent, tagName, bodyType) {
        // this.reader.showP("Parser.parseOptionalBody")

        // if (this.reader.matches("/>")) {
        //     // EmptyBody 一般不会走到这儿
        //     return;
        // }
        if (!this.reader.matches (">")) {
            jerr.err (this.reader.mark (), "parser.parseOptionalBody")
        }
        this.reader.skipSpaces ();
        if (this.reader.matchesETag (tagName)) {
            // EmptyBody
            return;
        }
        if (!this.parseJspAttributeAndBody (parent, tagName, bodyType)) {
            // Must be ( '>' # Body ETag )
            this.parseBody (parent, tagName, bodyType);
        }
    }

    /**
     *先留着吧
     * */
    parseJspAttributeAndBody () {
        let result = false;
        //todo 这块可以去掉优化
        return result;
    }

    /**
     * 开始解析 foreach 这种自定义标签内部，为了防止程序陷入死循环，加入限制锁，4086,基本上没有网页能有4千个节点
     *
     * */
    parseBody (parent, tag, bodyType) {
        // throw  new Error ("parsebody");
        // this.reader.showP("Parser.parseBody  " + tag + " " + bodyType + " " + (bodyType == TagInfo.BODY_CONTENT_JSP))
        let c = 0;
        while (this.reader.hasMoreInput () && ++c < 4086) {
            if (this.reader.matchesETag (tag)) {
                return;
            }
            if (bodyType == TagInfo.BODY_CONTENT_JSP) {
                this.parseElements (parent);
            }
            // else if (bodyType == TagInfo.BODY_CONTENT_PARAM) {
            //     this.reader.skipSpaces();
            //     this.parseParam(parent);
            // }
        }
    }

    /**
     * @param parent {Node}
     * */
    // parseParam(parent) {
    //     if (!this.reader.matches("<jsp:param")) {
    //         jerr.err(this.reader.mark(), "parser.parseParam err")
    //
    //     }
    //     let attrs = this.parseAttributes();
    //     this.reader.skipSpaces();
    //     let paramActionNode = new Node("jsp:param", "param", attrs, this.start, parent);
    //     this.parseEmptyBody(paramActionNode, "jsp:param");
    // }

    // parseEmptyBody() {
    //     if (this.reader.matches("/>")) {
    //         // done
    //     }
    //     else if (this.reader.matches(">")) {
    //         if (this.reader.matchesETag(tag)) {
    //
    //         } else if (this.reader.matchesOptionalSpacesFollowedBy("<jsp:attribute")) {
    //             this.parseNamedAttributes(parent);
    //             if (!this.reader.matchesETag(tag)) {
    //                 jerr.err(this.reader.mark(), "parser.parseEmptyBody err")
    //             }
    //         }
    //         else {
    //             jerr.err(this.reader.mark(), "parser.parseEmptyBody err")
    //         }
    //     }
    //     else {
    //         jerr.err(this.reader.mark(), "parser.parseEmptyBody err")
    //     }
    // }

    // parseNamedAttributes(parent) {
    //     // 先不支持吧，回头再写，2：10了
    //     while (this.reader.matches("<jsp:attribute")) {
    //         let start = this.reader.mark();
    //         let attrs = this.parseAttributes();
    //         if (attr == null || attrs.getValue("name") == null) {
    //             jerr.err(this.reader.mark(), "parser.parseNamedAttributes err")
    //         }
    //     }
    // }

    /**
     * @param attrs {Attributes}
     */
    parseAttributes () {
        let attribute = new Attributes ();
        this.reader.skipSpaces ();
        while (this.parseAttribute (attribute)) {
            this.reader.skipSpaces ();
        }
        return attribute;
    }

    parseAttribute (attrs) {
        let qName = this.parseName ();
        if (qName == null) {
            return false;
        }
        let localName = qName;
        let index = qName.indexOf (':');
        if (index != -1) {
            let prefix = qName.substring (0, index);
            localName = qName.substring (index + 1);
        }
        this.reader.skipSpaces ();
        if (!this.reader.matches ("=")) {
            jerr.err (this.reader.mark (), "parser.parseAttribute err")
        }
        this.reader.skipSpaces ();
        let quote = this.reader.nextChar ();
        if (quote != '\'' && quote != '"') {
            jerr.err (this.reader.mark (), "parser.parsequote err")
        }
        let watchString = quote;// java jsp 中 还有 <%=%> 这种情况（此时 watchString=%>"），js 版本中不考虑了
        let attrValue = this.parseAttributeValue (watchString);
        attrs.addAttribute (localName, qName, "CDATA", attrValue)
        return true;
    }

    parseAttributeValue (watch) {
        let start = this.reader.mark ();
        let stop = this.reader.skipUntilIgnoreEsc (watch);
        if (stop == null) {
            jerr.err (this.reader.mark (), "parser.parseAttributeValue err")
        }
        //todo 需要转义 parseQuoted （这一版先不做，不影响功能）
        // let ret = this.parseQuoted(this.reader.getText(start, stop));
        let ret = this.reader.getText (start, stop);

        return ret;
    }

    /**
     * Name ::= (Letter | '_' | ':') (Letter | Digit | '.' | '_' | '-' | ':')*
     * @param null
     * @return {String}
     */

    parseName () {
        let ch = this.reader.peekChar ();
        if (Ut.isLetter (ch) || ch == '_' || ch == ':') {
            let ret = ch;
            this.reader.nextChar ();
            ch = this.reader.peekChar ();
            while (Ut.isLetter (ch) || Ut.isDigit (ch) || ch == '.' || ch == '_' || ch == ':') {
                ret += ch;
                this.reader.nextChar ();
                ch = this.reader.peekChar ();
            }
            return ret;
        }
        return null;
    }
}

module.exports = Parser;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by ghy on 2017/11/17.
 */
const path = __webpack_require__ (3);

const Ut = __webpack_require__ (15);
const Mark = __webpack_require__ (2);
const TagInfo = __webpack_require__ (16);

class JspReader {
    constructor (str) {
        this.size = 0;
        this.pushString (str);
    }

    showP (msg) {
        // console.log (msg, this.current.line, this.current.col, this.current.cursor, ":end")
    }

    matches (str) {
        let mark = this.mark ();
        let ch = "";
        let i = 0;
        while (i < str.length) {
            ch = this.nextChar ();
            if (ch != str.charAt (i++)) {
                this.reset (mark);
                return false;
            }
        }
        return true;
    }

    /**
     *
     * @return {Boolean}
     */
    hasMoreInput () {
        if (!this.current) {
            return false;
        }
        else if (this.current.cursor >= this.current.stream.length) {
            return false;
        }
        return true;
    }

    nextChar () {
        if (!this.hasMoreInput ()) {
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

    pushChar () {
        this.current.cursor--;
        this.current.col--;
    }

// 强验证
    getText (start, stop) {
        let oldstart = this.mark ();
        this.reset (start);
        let ret = "";
        let b = 0;
        while (this.hasMoreInput () && !stop.equals (this.mark ())) {
            ret += this.nextChar ();
            b++;
        }
        this.reset (oldstart);
        return ret;
    }

    // 强验证
    getTextline (start, endLine) {
        if (start.line > endLine) {
            return null;
        }
        let oldstart = this.mark ();
        this.reset (start);
        let ret = "";
        let b = 0;
        while (this.hasMoreInput () && (endLine + 1) != this.mark ().line) {
            ret += this.nextChar ();
            b++;
        }
        this.reset (oldstart);
        return ret;
    }

    pushString (fileStr) {
        if (fileStr == null || fileStr.length == 0) {
            return;
        }
        try {
            let charArray = fileStr.split ("");
            if (this.current == null) {
                this.current = new Mark (this, charArray)
            } else {
                // todo include 使用另外一种方式实现了 暂时去掉
                // this.current.pushStream (charArray);
            }
        }
        catch (e) {
            console.log (e);
        }
    }


    matchesETag (tagName) {
        let mark = this.mark ();
        // console.log("开始匹配结束标签",tagName)
        this.skipSpaces ();
        if (!this.matches ("</" + tagName)) {
            return false;
        }

        if (this.nextChar () == '>') {
            return true;
        }
        this.reset (mark);
        return false;
    }


    mark () {
        return Mark.newMark (this.current);
    }

    reset (mark) {
        this.current = Mark.newMark (mark);
    }

    peekChar () {
        if (!this.hasMoreInput ()) {
            return -1;
        }
        return this.current.stream[this.current.cursor];
    }

    /**
     * 核心函数，转换token,解析文档中的 tocken,比如单词，自定义语句，以特殊分隔符为界限
     *
     * */
    parseToken () {
        let ret = "";
        this.skipSpaces ();
        if (!this.hasMoreInput ()) {
            return "";
        }
        let ch = this.peekChar ();
        if (!this.isDelimiter ()) {
            while (!this.isDelimiter ()) {
                ch = this.nextChar ();
                // 以下逻辑暂时用不到
                if (ch == '\\') {
                    if (this.peekChar () == '"' || this.peekChar () == '\''
                        || this.peekChar () == '>' || this.peekChar () == '%') {
                        ch = nextChar ();
                    }
                }
                ret += ch;
            }

        }
        return ret;
    }

    /**
     * 是否是分隔符
     *
     * */
    isDelimiter () {
        if (!this.isSpace ()) {
            let ch = this.peekChar ();
            if (ch == '=' || ch == '>' || ch == '"' || ch == '\'' || ch == '/') {
                return true;
            }
            if (ch == '-') {
                let mark = this.mark ();
                if (((ch = this.nextChar ()) == '>')
                    || ((ch == '-') && (this.nextChar () == '>'))) {
                    this.reset (mark);
                    return true;
                } else {
                    this.reset (mark);
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
    skipSpaces () {
        let i = 0;
        while (this.hasMoreInput () && this.isSpace ()) {
            i++;
            this.nextChar ();
        }
        return i;
    }

    isSpace () {
        return this.peekChar () <= ' ';
    }

    /**
     * 寻找以limit 结束得字符串位置  ，忽略转义符号 '\',当返回时候，reader 得位置将移动到匹配结束位置
     *
     * @param limit {String} 需要匹配得结束字符串 比如 单引号 '\''，或者双引号 '"'
     * @return {Mark} 结束位置
     */
    skipUntilIgnoreEsc (limit) {
        let ret = null;
        let limlen = limit.length;
        let ch;
        let prev = 'x'; // Doesn't matter
        outer:
            for (ret = this.mark (), ch = this.nextChar (); ch != null; ret = this.mark (), prev = ch, ch = this.nextChar ()) {
                if (ch == '\\' && prev == '\\') {
                    ch = null;
                } else if (ch == limit.charAt (0) && prev != '\\') {
                    inter:
                        for (let i = 1; i < limlen; i++) {
                            if (this.peekChar () == limit.charAt (i)) {
                                this.nextChar ();
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

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Created by ghy on 2017/11/17.
 */
var Ut = {
    // arrayContain: function (array, item) {
    //     var ret = false;
    //     for (var i = 0; i < array.length; i++) {
    //         if (array[i] === item) {
    //             ret = true;
    //             break;
    //         }
    //     }
    //     return ret;
    // },
    // getIndexFromArray(array, item) {
    //     let ret = -1;
    //     for (var i = 0; i < array.length; i++) {
    //         if (array[i] === item) {
    //             ret = i;
    //             break;
    //         }
    //     }
    //     return ret;
    // },
    isLetter(ch) {
        //todo 校验是否为字母,需要优化
        return /[A-Za-z]/.test(ch);
    },
    isDigit(ch) {
        //todo 校验是否为数字,需要优化
        return /0-9/.test(ch);
    }
}
module.exports = Ut;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

class TagInfo {
    // static BODY_CONTENT_JSP = "JSP";
    // static BODY_CONTENT_TAG_DEPENDENT = "tagdependent";
    // static BODY_CONTENT_EMPTY = "empty";
    // static BODY_CONTENT_SCRIPTLESS = "BODY_CONTENT_SCRIPTLESS";


    constructor() {

    }
}

TagInfo.BODY_CONTENT_JSP = "JSP";
TagInfo.BODY_CONTENT_PARAM = "BODY_CONTENT_PARAM";

TagInfo.prototype = {
    tagName: null,
    tagClassName: null,
    bodyContent: null,
    infoString: null,
    tagLibrary: null,
    tagExtraInfo: null,
    attributeInfo: null,
    displayName: null,
    smallIcon: null,
    largeIcon: null,
    tagVariableInfo: null,
    dynamicAttributes: null,
}
module.exports = TagInfo;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Created by ghy on 2017/12/1.
 */
const lineSeparator = "\n";

class StringWriter  {
    constructor () {
        // super ();
        this.str = "";
    }
    print(s) {
        this.str += s;
        // if (s == null) {
        //     s = "";
        // }
        // this.write(s);
    }
    println(x) {
        if (x != null) {
            this.print(x);
        }
        this.write(lineSeparator);
    }
    write(s) {
        this.str += s;
    }
    // _write_str (s) {
    //     this.str += s;
    // }
    //
    // _write_num (s) {
    //     this.str += s;
    // }
    //
    // _write_bol (s) {
    //     this.str += s;
    // }
    //
    // _write_obj (s) {
    //     try {
    //         this.str += JSON.stringify (s);
    //     }
    //     catch (e) {
    //         this.str += "[Object]";
    //     }
    //
    // }
    //
    // _write_arr (s) {
    //     console.log (s)
    //     try {
    //         this.str += JSON.stringify (s);
    //     }
    //     catch (e) {
    //         this.str += "[Array]";
    //     }
    // }

    toString () {
        return this.str;
    }
}

module.exports = StringWriter;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const Compiler = __webpack_require__ (20)
/**
 * 提供给pc 用,主要是与其他模板引擎跑性能对比
 *
 * */
class SHTM {
    constructor () {
        this.cp = new Compiler ();
    }

    compile (tmpstr) {
        let fn = this.cp.getFnByStr (tmpstr);
        return fn;
    }
}
let shtm = new SHTM ();
alert (typeof window)
if (typeof window != "undefined") {

    window.shtm = shtm;
}
// module.exports=window.shtm;
module.exports = shtm;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by ghy on 2017/11/17.
 */
const Generator = __webpack_require__ (21);
const JspReader = __webpack_require__ (14);
const Parser = __webpack_require__ (13);
const path = __webpack_require__ (3);
const StringWriter = __webpack_require__ (17);
const ServletWriter = __webpack_require__ (6)

// 测试
const ForEachImpl = __webpack_require__ (11)
const IfImpl = __webpack_require__ (12)
const IncludeImpl = __webpack_require__ (33)
const PageContext = __webpack_require__ (10)
const Mark = __webpack_require__ (2)

class Compiler {
    constructor () {
    }

    /**
     * fnstr 这个参数一般不传，通常是自定义调试的时候在test 函数中传过来，方便调试
     * @return {fnction}
     *
     * */
    getFnByStr (tmpstr) {

        let pageNodes = this.getPageNode (tmpstr, null);
        let fnstr = this.getFnStrByPageNode (pageNodes);
        var rundemo = new Function ('data, option', fnstr);

        var option = {
            ForEachImpl: ForEachImpl,
            IfImpl: IfImpl,
            PageContext: PageContext
        }
        return function (data) {
            var option = {
                ForEachImpl: ForEachImpl,
                IfImpl: IfImpl,
                IncludeImpl: IncludeImpl,
                out: null,
                PageContext: PageContext,
            }
            var strs = rundemo.call (data, data, option)
            return strs;
        }
    }

    getBaseDir () {
    }

    getFnStrByPageNode (pageNodes) {
        let fn_stringWriter = new StringWriter ();
        let fn_out = new ServletWriter (fn_stringWriter);
        Generator.generateFn (this, fn_out, pageNodes);
        let fnstr = fn_out.toString ();

        return fnstr;
    }

    getPageNode (fileStr, parent) {
        let pageNodes;
        let reader = new JspReader (fileStr);
        if (reader != null) {
            pageNodes = Parser.parse (reader, parent)
        }
        return pageNodes;
    }

}

module.exports = Compiler;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const Generator = __webpack_require__(22);
const GenerateVisitor = __webpack_require__(7);

Generator.GenerateVisitor = GenerateVisitor;

module.exports = Generator;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const GenerateVisitor = __webpack_require__(7);
const GenerateVisitor_tree = __webpack_require__(32);
const ServletWriter = __webpack_require__(6);

/**
 * @param outpath {String} 输出绝对路径
 * @param compiler {Compiler} 编译实例
 * @param page {Node.Nodes} 节点链表
 * @return
 */
class Generator {
    /**
     *  生成树用于dom 树分析用
     * */
    static generateTree(page) {
        let a = new GenerateVisitor_tree();
        page.visit(a);
        // console.log(JSON.stringify(a.getTree()));
        return a.getTree();
    }

    static generateFn(compiler, out, page) {
        let gen = new GenerateVisitor(out, null, compiler)
        Generator.genStart(out)
        page.visit(gen);
        Generator.genEnd(out)// service }
        gen.generatePostamble(page);
        Generator.genEnd(out)//with }

    }

    static genStart(out) {
        out.print(`
    var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    var IncludeImpl = option.IncludeImpl;
    var pageContext = new option.PageContext(data);
    var ${GenerateVisitor.OUT_STR}="";
    with (data || {}) {
        var out = option.out;
        try {
            service()
        }
        catch (e) {
            str = e.message;
        }
        function service (n) {`)
    }

    static genEnd(out) {
        out.print(` }`)
    }
}

module.exports = Generator;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);

class CustomTag extends Node {
    constructor(qName, prefix, localName, uri, attrs, start, parent) {
        super(qName, localName, attrs, start, parent);

        this.prefix = prefix;
        this.uri = uri;
        this.name = "customTag"
        this.outstr = "\"";

    }
}

CustomTag.prototype = {
    uri: null,
    prefix: null,
    tagData: null,//tagData
    tagHandlerPoolName: null,
    tagInfo: null,
    tagFileInfo: null,
    tagHandlerClass: null,
    varInfos: null,
    customNestingLevel: null,
    childInfo: null,
    implementsBodyTag: null,
    atBeginScriptingVars: null,
    atEndScriptingVars: null,
    nestedScriptingVars: null,
    customTagParent: null,
    numCount: null,
    useTagPlugin: null,
    tagPluginContext: null,
    jspId: null,
    tempVars: null,
    atSTag: null,// node.Nodes
    atETag: null,// node.Nodes
}
module.exports = CustomTag;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);

class TempleteText extends Node {
    constructor(text, start, parent) {
        super(null, null, null, start, parent);
        this.text = text;
        this.name = "TempleteText"
    }
}

module.exports = TempleteText;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__ (0);

class Root extends Node {
    constructor(start, parent) {
        super(null, null, null, start, parent);
        this.name = "root"
    }
}

Root.prototype = {
    parentRoot: null,
}
module.exports = Root;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(0);

class ELExpression extends Node {
    constructor(text, start, parent) {
        super(null, null, null, start, parent);
        this.text = text;
        this.name = "ELExpression"
    }
}

ELExpression.prototype = {
    el: null//ELNode.Nodes

}

module.exports = ELExpression;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

class Visitor {
    visitBody(node,parent_index) {
        if (node.getBody() != null) {
            node.getBody().visit(this,parent_index)
        }
    }
}

module.exports = Visitor;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by ghy on 2018/1/4.
 */

// const AstCompiler = require("./AstCompiler");
const jerr = __webpack_require__(4);

class ELparser {
    static getValue(el, ctx, node) {
        // return "";
        return ELparser.getValueByLocal (el, ctx,node);
        // return ELparser.getValueByAst(el, ctx);
    }

    // 正规 ast 抽象语法树路线，解释器需要自己写，（目前就实现了基础表达式的解析）。
    static getValueByAst(el, ctx) {
        let astCompiler = new AstCompiler(ctx);
        let value = astCompiler.excute(el);
        // console.log("el:",el,value,JSON.stringify(ctx))
        return value;
    }

    // with 关键字，市面上的模版引擎基本都采用这套方案，代码量少，使用简单，其实最终执行环境还是走AST 那一套
    static getValueByLocal(el, ctx, node) {
        let str = "with(ctx){return " + el + "}";
        let value = null;
        try {
            let fn = new Function('ctx', str);
            let value = fn.call(ctx, ctx) || "";
            return value;
        }
        catch (e) {
            jerr.err(node, "Elparser.getelValue err")
        }
    }
}

module.exports = ELparser;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/*
 * 目前就设计为支持一组属性，一组得目前够用了，多组得暂不考虑
 *
 * 上面的那句piapiapia 打脸，实际上必须要多组属性，一组完全不够用.
 **/
class Attributes {
    constructor () {
        this.data = [];
        this.dlength = 0;
        this.len = 5;
    }

    addAttribute (localName, qName, type, value) {
        this.data[this.dlength * this.len + 1] = localName;
        this.data[this.dlength * this.len + 2] = qName;
        this.data[this.dlength * this.len + 3] = type;
        this.data[this.dlength * this.len + 4] = value;
        this.dlength++;
    }

    getLength () {
        return this.dlength;
    }

    getValue (name) {
        let max = this.dlength * this.len;
        for (let i = 0; i < max; i += this.len) {
            if (this.data[i + 2] == name) {
                return this.data[i + 4];
            }
        }
        return null;
    }
    getValueByShortName (name) {
        let max = this.dlength * this.len;
        for (let i = 0; i < max; i += this.len) {
            if (this.data[i + 1] == name) {
                return this.data[i + 4];
            }
        }
        return null;
    }
}

module.exports = Attributes;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by ghy on 2017/12/1.
 */

const ServletWriter = __webpack_require__ (6);
const StringWriter = __webpack_require__ (17);
class GenBuffer {
    constructor () {
        this.stringWriter = new StringWriter ();
        this.out = new ServletWriter (this.stringWriter);
    }

    getOut () {
        return this.out;
    }

    toString () {
        return this.out.toString ();
    }
}
module.exports = GenBuffer;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {


const Node = __webpack_require__(1);

class GenerateVisitor extends Node.Visitor {
    constructor() {
        super();
        this.tagVarNumbers = {};
        this.tree = [];
        this.tmp = this.tree;
    }

    getTree() {
        return this.tree;
    }

    /**
     * 覆盖父类visit 抽象方法
     */
    visit(n) {
        let name = n.name;

         if (n instanceof Node.CustomTag) {
            let obj = {};
            obj.name = name;
            obj.child = [];
            let gtmp = this.tmp
            this.tmp.push(obj);
            this.tmp = obj.child;
            this.visitBody(n)
            this.tmp = gtmp;
        }
        else if (n instanceof Node.Root) {
            let obj = {};
            obj.name = name;
            obj.child = [];
            this.tmp.push(obj);
            let gtmp = this.tmp
            this.tmp = obj.child;
            this.visitBody(n)
            this.tmp = gtmp;
        } else if (n instanceof Node.TempleteText) {
            let obj = {};
            obj.name = name;
            obj.text=n.text;
            this.tmp.push(obj);
        } else if (n instanceof Node.ELExpression) {
            let obj = {};
            obj.name = name;
            this.tmp.push(obj);
        }
    }
}

GenerateVisitor.prototype = {
    tagVarNumbers: {},
    parent: "",
    isFragment: "",
    methodNesting: 0,
    arrayCount: 0,
    textMap: {},
}

module.exports = GenerateVisitor;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

const TagSupport = __webpack_require__(5);

class IncludeIpml extends TagSupport {
    constructor() {
        super();
    }


    doStartTag() {
        return this.EVAL_BODY_INCLUDE;
    }


    doAfterBody() {
        return this.SKIP_BODY;
    }

}

module.exports = IncludeIpml;

/***/ })
/******/ ]);