/**
 * Created by ghy on 2017/11/17.
 */


const Node = require("../node/Node-Api");
const JspReader = require("./JspReader");
const Ut = require("./Ut");
const Mark = require("./Mark");
const Attributes = require("../taglib/Attributes")
const TagInfo = require("../taglib/TagInfo");
const jerr = require("../err/Err");

const JSP_BODY_CONTENT_PARAM = "JSP_BODY_CONTENT_PARAM"

class Parser {
    constructor(reader) {
        this.reader = reader;
        this.start = reader.mark();
    }

    /**
     * parse 函数入口 非常
     * @param path {String} 文件绝对路径
     * @param reader {JspReader} 字符读取处理类实例
     * @param parent {Node} 字符读取处理类实例
     * @return {Node.Nodes} page 对象，
     */
    static parse(reader, parent) {
        let parser = new Parser(reader);
        let root = new Node.Root(reader.mark(), parent);
        let i = 0;
        while (reader.hasMoreInput()) {
            parser.parseElements(root);
            i++;
        }
        let page = new Node.Nodes(root);
        return page;
    }

    parseElements(parent) {

        this.start = this.reader.mark();
        if (this.reader.matches("${")) {
            this.parseELExpression(parent, "${")
        }
        else if (this.reader.matches("<jsp:")) {
            this.parseStandardAction(parent);
        }
        else if (!this.parseCustomTag(parent)) {
            this.parseTemplateText(parent);
        }
    }


    parseTemplateText(parent) {

        if (!this.reader.hasMoreInput()) {
            return;
        }
        let ttext = "";
        let ch = this.reader.nextChar();
        if (ch == '\\') {
            this.reader.pushChar();
        } else {
            ttext += ch;
        }
        while (this.reader.hasMoreInput()) {
            ch = this.reader.nextChar();
            if (ch == '<') {
                let c1 = this.reader.nextChar();
                let c2 = this.reader.nextChar();
                let c3 = this.reader.nextChar();
                if (c1 == 'c' && c2 == ':') {
                    this.reader.pushChar();
                    this.reader.pushChar();
                    this.reader.pushChar();
                    this.reader.pushChar();
                    break;
                } else if (c1 == '/' && c2 == 'c' && c3 == ':') {
                    this.reader.pushChar();
                    this.reader.pushChar();
                    this.reader.pushChar();
                    this.reader.pushChar();
                    break;
                }
                this.reader.pushChar();
                this.reader.pushChar();
                this.reader.pushChar();
                ttext += ch;
                continue;
                // this.reader.pushChar();
                // break;
            } else if (ch == '$' || ch == '$') {
                if (!this.reader.hasMoreInput()) {
                    ttext += ch;
                    break;
                }
                if (this.reader.nextChar() == '{') {
                    this.reader.pushChar();
                    this.reader.pushChar();
                    break;
                }
                ttext += ch;
                this.reader.pushChar();
                continue;
            }
            else if (ch == '\\') {
                if (this.reader.hasMoreInput()) {
                    ttext += ch;
                    break;
                }
                let next = this.reader.peekChar();
                if (next == '%' || next == '$' || next == '#') {
                    ch = this.reader.nextChar();
                }
            }
            ttext += ch;
        }
        new Node.TemplateText(ttext, this.start, parent);
    }

    /**
     * 解析jsp: 标准语法
     * */
    parseStandardAction(parent) {
        let start = this.reader.mark();
        if (this.reader.matches("include")) {
            this.parseInclude(parent)
        }
    }

    /**
     * 解析<jsp:include>
     * */
    parseInclude(parent) {
        let attrs = this.parseAttributes();
        this.reader.skipSpaces();
        // Node 类型
        let includeNode = new Node.IncludeAction(attrs, this.start, parent);
        this.parseOptionalBody(includeNode, "jsp:include", TagInfo.BODY_CONTENT_PARAM)
    }

    parseCustomTag(parent) {
        // this.reader.showP("Parser.parseCustomTag")
        if (this.reader.peekChar() != '<') {
            return false;
        }
        this.reader.nextChar();
        // let tagnName = "c:forEach"// 这儿tag 应该从一个方法中获取，暂时写死
        let tagName = this.reader.parseToken();
        let i = tagName.indexOf(':');
        if (i == -1) {
            this.reader.reset(this.start);
            return false;
        }
        let prefix = tagName.substring(0, i);
        let shortTagName = tagName.substring(i + 1);

        let attrs = this.parseAttributes();
        let uri = "";
        this.reader.skipSpaces();
        if (this.reader.matches("/>")) {
            new Node.CustomTag(
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
        let tagNode = new Node.CustomTag(
            tagName,
            prefix,
            shortTagName,
            uri,
            attrs,
            this.start,
            parent);
        this.parseOptionalBody(tagNode, tagName, "JSP")
        return true;
    }

    /**
     * ELExpressionBody
     *  (举个栗子 "${" or "#{"to first unquoted "}")
     * @param
     * @return
     */
    parseELExpression(parent, typeEL) {
        this.start = this.reader.mark();
        let singleQuoted = false;
        let doubleQuoted = false;
        let curl = 0;
        let ch;
        while (ch != '}' || curl >= 0 || singleQuoted || doubleQuoted) {
            ch = this.reader.nextChar();
            if (ch == '\\' && (singleQuoted || doubleQuoted)) {
                this.reader.nextChar();
                ch = this.reader.nextChar();
            }
            if (ch == null) {
                //todo err
                jerr.err(this.reader.mark(), "parser.parseELExpression")
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
        let text = typeEL + this.reader.getText(this.start, this.reader.mark())
        new Node.ELExpression(text, this.start, parent);
    }

    parseOptionalBody(parent, tagName, bodyType) {
        // this.reader.showP("Parser.parseOptionalBody")

        if (this.reader.matches("/>")) {
            // EmptyBody
            return;
        }
        if (!this.reader.matches(">")) {
            jerr.err(this.reader.mark(), "parser.parseOptionalBody")
        }
        this.reader.skipSpaces();
        if (this.reader.matchesETag(tagName)) {
            // EmptyBody
            return;
        }
        if (!this.parseJspAttributeAndBody(parent, tagName, bodyType)) {
            // Must be ( '>' # Body ETag )
            this.parseBody(parent, tagName, bodyType);
        }
    }

    /**
     *先留着吧
     * */
    parseJspAttributeAndBody() {
        let result = false;
        //todo 这块可以去掉优化
        return result;
    }

    /**
     * 开始解析 foreach 这种自定义标签内部，为了防止程序陷入死循环，加入限制锁，4086,基本上没有网页能有4千个节点
     *
     * */
    parseBody(parent, tag, bodyType) {
        // throw  new Error ("parsebody");
        // this.reader.showP("Parser.parseBody  " + tag + " " + bodyType + " " + (bodyType == TagInfo.BODY_CONTENT_JSP))
        let c = 0;
        while (this.reader.hasMoreInput() && ++c < 4086) {
            if (this.reader.matchesETag(tag)) {
                return;
            }
            if (bodyType == TagInfo.BODY_CONTENT_JSP) {
                this.parseElements(parent);
            }
            else if (bodyType == TagInfo.BODY_CONTENT_PARAM) {
                this.reader.skipSpaces();
                this.parseParam(parent);
            }
        }
    }

    /**
     * @param parent {Node}
     * */
    parseParam(parent) {
        if (!this.reader.matches("<jsp:param")) {
            jerr.err(this.reader.mark(), "parser.parseParam err")

        }
        let attrs = this.parseAttributes();
        this.reader.skipSpaces();
        let paramActionNode = new Node("jsp:param", "param", attrs, this.start, parent);
        this.parseEmptyBody(paramActionNode, "jsp:param");
    }

    parseEmptyBody() {
        if (this.reader.matches("/>")) {
            // done
        }
        else if (this.reader.matches(">")) {
            if (this.reader.matchesETag(tag)) {

            } else if (this.reader.matchesOptionalSpacesFollowedBy("<jsp:attribute")) {
                this.parseNamedAttributes(parent);
                if (!this.reader.matchesETag(tag)) {
                    jerr.err(this.reader.mark(), "parser.parseEmptyBody err")
                }
            }
            else {
                jerr.err(this.reader.mark(), "parser.parseEmptyBody err")
            }
        }
        else {
            jerr.err(this.reader.mark(), "parser.parseEmptyBody err")
        }
    }

    parseNamedAttributes(parent) {
        // 先不支持吧，回头再写，2：10了
        while (this.reader.matches("<jsp:attribute")) {
            let start = this.reader.mark();
            let attrs = this.parseAttributes();
            if (attr == null || attrs.getValue("name") == null) {
                jerr.err(this.reader.mark(), "parser.parseNamedAttributes err")
            }
        }
    }

    /**
     * @param attrs {Attributes}
     */
    parseAttributes() {
        let attribute = new Attributes();
        this.reader.skipSpaces();
        while (this.parseAttribute(attribute)) {
            this.reader.skipSpaces();
        }
        return attribute;
    }

    parseAttribute(attrs) {
        let qName = this.parseName();
        if (qName == null) {
            return false;
        }
        let localName = qName;
        let index = qName.indexOf(':');
        if (index != -1) {
            let prefix = qName.substring(0, index);
            localName = qName.substring(index + 1);
        }
        this.reader.skipSpaces();
        if (!this.reader.matches("=")) {
            jerr.err(this.reader.mark(), "parser.parseAttribute err")
        }
        this.reader.skipSpaces();
        let quote = this.reader.nextChar();
        if (quote != '\'' && quote != '"') {
            jerr.err(this.reader.mark(), "parser.parsequote err")
        }
        let watchString = quote;// java jsp 中 还有 <%=%> 这种情况（此时 watchString=%>"），js 版本中不考虑了
        let attrValue = this.parseAttributeValue(watchString);
        attrs.addAttribute(localName, qName, "CDATA", attrValue)
        return true;
    }

    parseAttributeValue(watch) {
        let start = this.reader.mark();
        let stop = this.reader.skipUntilIgnoreEsc(watch);
        if (stop == null) {
            jerr.err(this.reader.mark(), "parser.parseAttributeValue err")
        }
        //todo 需要转义 parseQuoted （这一版先不做，不影响功能）
        // let ret = this.parseQuoted(this.reader.getText(start, stop));
        let ret = this.reader.getText(start, stop);

        return ret;
    }

    /**
     * Name ::= (Letter | '_' | ':') (Letter | Digit | '.' | '_' | '-' | ':')*
     * @param null
     * @return {String}
     */

    parseName() {
        let ch = this.reader.peekChar();
        if (Ut.isLetter(ch) || ch == '_' || ch == ':') {
            let ret = ch;
            this.reader.nextChar();
            ch = this.reader.peekChar();
            while (Ut.isLetter(ch) || Ut.isDigit(ch) || ch == '.' || ch == '_' || ch == ':') {
                ret += ch;
                this.reader.nextChar();
                ch = this.reader.peekChar();
            }
            return ret;
        }
        return null;
    }
}

module.exports = Parser;