/**
 * Created by cyl on 2018/2/1.
 */
const Parser = require("../../src/compile/Parser");
const Node = require("../../src/node/Node-Api");
const JspReader = require("../../src/compile/JspReader");
describe("Parser test", function () {
//     let str = `
// asdf"'
// \${item}
// <c:if test='\${if_test}'></c:if>
// <c:forEach var='item' items='\${list}'>
//     <p>foreach inner</p>
//     <c:if test='\${if_test}'>
//        <span>if inner</span>
//     </c:if>
// </c:forEach>
// $123
// $`

    it("parser", function () {
        var str = ""
        let reader = new JspReader(str);
        let parser = new Parser(reader);
        let pages = Parser.parse(reader, null);
        expect(pages.list[0].body).toBe(undefined);
    });
    it("parser", function () {
        var str = "${123}$123\${item}\\${123}$123$"
        let reader = new JspReader(str);
        let parser = new Parser(reader);
        let pages = Parser.parse(reader, null);
        expect(pages.list[0].body.list[0].name).toBe("ELExpression");
        expect(pages.list[0].body.list[0].text).toBe("${123}");
        expect(pages.list[0].body.list[1].name).toBe("TemplateText");
        expect(pages.list[0].body.list[1].text).toBe("$123");
        expect(pages.list[0].body.list[2].name).toBe("ELExpression");
        expect(pages.list[0].body.list[2].text).toBe("${item}");
        expect(pages.list[0].body.list[3].name).toBe("TemplateText");
        expect(pages.list[0].body.list[3].text).toBe("${123}$123$");
    });
    //
    it("parser", function () {
        var str = "\\"
        let reader = new JspReader(str);
        let parser = new Parser(reader);
        let pages = Parser.parse(reader, null);
        expect(pages.list[0].body.list[0].name).toBe("TemplateText");
        expect(pages.list[0].body.list[0].text).toBe("\\");
    });
    //
    it("parser", function () {
    let str = `
<c:if test='\${if_test}'></c:if>
<c:forEach var='item' items='\${list}'>
    <c:if test='\${if_test}'>
       <span>if inner</span>
    </c:if>
    <c:out value="1" />
</c:forEach>
`
        let reader = new JspReader(str);
        let parser = new Parser(reader);
        let pages = Parser.parse(reader, null);
    });
})