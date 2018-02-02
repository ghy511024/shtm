/**
 * Created by cyl on 2018/2/1.
 */
const Parser = require ("../../src/compile/Parser");
const Node = require ("../../src/node/Node-Api");
const JspReader = require ("../../src/compile/JspReader");
describe ("Parser test", function () {
    it ("parser", function () {
        var str = ""
        let reader = new JspReader (str);
        let parser = new Parser (reader);
        let pages = Parser.parse (reader, null);
        expect (pages.list[0].body).toBe (undefined);
    });

    it ("parser", function () {
        var str = "${123}$123\${item}\\${123}$123$"
        let reader = new JspReader (str);
        let parser = new Parser (reader);
        let pages = Parser.parse (reader, null);
        expect (pages.list[0].body.list[0].name).toBe ("ELExpression");
        expect (pages.list[0].body.list[0].text).toBe ("${123}");
        expect (pages.list[0].body.list[1].name).toBe ("TemplateText");
        expect (pages.list[0].body.list[1].text).toBe ("$123");
        expect (pages.list[0].body.list[2].name).toBe ("ELExpression");
        expect (pages.list[0].body.list[2].text).toBe ("${item}");
        expect (pages.list[0].body.list[3].name).toBe ("TemplateText");
        expect (pages.list[0].body.list[3].text).toBe ("${123}$123$");
    });
    //
    it ("parser", function () {
        var str = "\\"
        let reader = new JspReader (str);
        let parser = new Parser (reader);
        let pages = Parser.parse (reader, null);
        expect (pages.list[0].body.list[0].name).toBe ("TemplateText");
        expect (pages.list[0].body.list[0].text).toBe ("\\");
    });

    it ("parser", function () {
        let str = `
<p>some string</p>
<c:if test='\${if_test}'></c:if>
<c:forEach var='item' items='\${list}'>
    <c:if test='\${if_test}'>
       <span>if inner</span>
    </c:if>
    <c:out value="1" />
</c:forEach>
`
        let reader = new JspReader (str);
        let parser = new Parser (reader);
        let pages = Parser.parse (reader, null);
        expect (pages.list[0].body.list[0].name).toBe ("TemplateText");
        expect (pages.list[0].body.list[1].name).toBe ("customTag");
        expect (pages.list[0].body.list[2].name).toBe ("TemplateText");// 换行 \n
        expect (pages.list[0].body.list[3].name).toBe ("customTag");// 外层foreach
        expect (pages.list[0].body.list[3].body.list[0].name).toBe ("customTag");// 空格换行,已经被跳过，所以不是 TemplateText
        expect (pages.list[0].body.list[3].body.list[0].body.list[0].name).toBe ("TemplateText");// <span>if inner</span>
        expect (pages.list[0].body.list[3].body.list[1].name).toBe ("customTag");// cout
        expect (pages.list[0].body.list[3].body.list[1].qName).toBe ("c:out");// cout

    });

// el 测试
    it ("parser", function () {
        let str = "${'123'}${{ab,cd}}${\"hehe\"}${'\\abc'}"
        let reader = new JspReader (str);
        let parser = new Parser (reader);
        let pages = Parser.parse (reader, null);
        expect (pages.list[0].body.list[0].name).toBe ("ELExpression");
        expect (pages.list[0].body.list[0].text).toBe ("${'123'}");
        expect (pages.list[0].body.list[1].name).toBe ("ELExpression");
        expect (pages.list[0].body.list[1].text).toBe ("${{ab,cd}}");
        expect (pages.list[0].body.list[2].name).toBe ("ELExpression");
        expect (pages.list[0].body.list[2].text).toBe ("${\"hehe\"}");
        expect (pages.list[0].body.list[3].name).toBe ("ELExpression");
        expect (pages.list[0].body.list[3].text).toBe ("${'\\abc'}");
    });// el 测试
    it ("parser err", function () {
        let str = "${'\"sdf'}"// error
        let str2 = "${'\\'}"
        let reader = new JspReader (str);
        let reader2 = new JspReader (str2);
        let parser = new Parser (reader);
        expect (function () {
            Parser.parse (reader, null)
        }).toThrow ();
        expect (function () {
            Parser.parse (reader2, null)
        }).toThrow ();

    });
// 属性测试
    it ("parser propertity", function () {
        let str = "<c:out x:test='${xixi}'>"
        let reader = new JspReader (str);
        let parser = new Parser (reader);
        let pages = Parser.parse (reader, null);
        expect (pages.list[0].body.list[0].attrs.getValue ("x:test")).toBe ("${xixi}");
        expect (pages.list[0].body.list[0].attrs.getValueByShortName ("test")).toBe ("${xixi}");
    });

    // 属性测试
    it ("parser 边界字符测试", function () {
        let str = "$<>"
        let reader = new JspReader (str);
        let parser = new Parser (reader);
        let pages = Parser.parse (reader, null);
        expect (pages.list[0].body.list[0].name).toBe ("TemplateText");
        expect (pages.list[0].body.list[0].text).toBe ("$<>");
    });
    it ("parser 边界字符测试", function () {
        let str = "abcdefghijklmnopqrstuvwxyz~!#\$%^&*()_+`1234567890-=\;'<>$"
        let reader = new JspReader (str);
        let parser = new Parser (reader);
        let pages = Parser.parse (reader, null);
        expect (pages.list[0].body.list[0].name).toBe ("TemplateText");
        expect (pages.list[0].body.list[0].text).toBe ("abcdefghijklmnopqrstuvwxyz~!#$%^&*()_+`1234567890-=;'<>$");
    });
})