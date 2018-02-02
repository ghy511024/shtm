/**
 * Created by ghy on 2018/1/31.
 */
const JspReader = require ("../../src/compile/JspReader");
const Mark = require ("../../src/compile/Mark");

describe ("jspreader test", function () {

    it ("hasmore_input", function () {
        let r1 = new JspReader (`asdf`);
        let r2 = new JspReader (``);
        let r3 = new JspReader (`
        `);
        let r4 = new JspReader ();
        expect (r1.hasMoreInput ()).toBe (true);
        expect (r2.hasMoreInput ()).toBe (false);
        expect (r3.hasMoreInput ()).toBe (true);
        expect (r4.hasMoreInput ()).toBe (false);
    });

    it ("nextChar", function () {
        let r1 = new JspReader (`a
        b`);
        expect (r1.nextChar ()).toBe ("a");
        expect (r1.nextChar ()).toBe ("\n");
        r1.skipSpaces ();
        expect (r1.nextChar ()).toBe ("b");
        expect (r1.hasMoreInput ()).toBe (false);
    });


    it ("matches", function () {
        let r1 = new JspReader (`<c:if asd`);
        expect (r1.matches ("<")).toBe (true);
        expect (r1.matches ("c:if")).toBe (true);
        expect (r1.matches ("c:if")).toBe (false);
        r1.skipSpaces ();
        expect (r1.matches ("asd")).toBe (true);
        expect (r1.hasMoreInput ()).toBe (false);
    });


    it ("pushChar", function () {
        let r1 = new JspReader (`<c:if asd`);
        expect (r1.nextChar ()).toBe ("<");
        r1.pushChar ()
        expect (r1.nextChar ()).toBe ("<");
    });


    it ("matchEtag", function () {
        let r1 = new JspReader (`</c:if>`);
        let r2 = new JspReader (` </c:if>`);
        let r3 = new JspReader (`</c:ifs>`);
        let r4 = new JspReader (`</c:if>abc`);
        let r5 = new JspReader (`< /c:if>abc`);
        let r6 = new JspReader (`</c:if`);
        expect (r1.matchesETag ("c:if")).toBe (true);
        expect (r2.matchesETag ("c:if")).toBe (true);
        expect (r3.matchesETag ("c:if")).toBe (false);
        expect (r4.matchesETag ("c:if")).toBe (true);
        expect (r4.nextChar ()).toBe ("a");
        expect (r4.matches ("bc")).toBe (true);
        expect (r5.matchesETag ("c:if")).toBe (false);
        expect (r6.matchesETag ("c:if")).toBe (false);
    });

    it ("peekChar", function () {
        let r1 = new JspReader (`</c:if>`);
        expect (r1.peekChar ()).toBe ("<");
        expect (r1.peekChar ()).toBe ("<");
        expect (r1.nextChar ()).toBe ("<");
    });
// 空格测试
    it ("isSpace", function () {
        let r1 = new JspReader (` \n\t\babc`);
        expect (r1.isSpace ()).toBe (true);
        r1.nextChar ();
        expect (r1.isSpace ()).toBe (true);
        r1.nextChar ();
        expect (r1.isSpace ()).toBe (true);
        r1.nextChar ();
        expect (r1.isSpace ()).toBe (true);
        r1.nextChar ();
        expect (r1.isSpace ()).toBe (false);
    });
    // lookup 查询测试
    it ("skipUntilIgnoreEsc", function () {
        var str = "\\\\<%=asdf%>"
        let r1 = new JspReader (str);
        let watchstr = "%>";
        r1.matches ("<%");
        let stop = r1.skipUntilIgnoreEsc (watchstr)
        expect (stop).not.toBeNull ();
        expect (stop.line).toBe (1);
        expect (stop.col).toBe (10);
    });
    // 分隔符测试
    it ("isDelimiter", function () {
        var str = " =>'\"/"
        var str2 = "->a"
        let r1 = new JspReader (str);
        let r2 = new JspReader (str2);
        expect (r1.isDelimiter ()).toBe (true);
        r1.skipSpaces ();
        r1.nextChar ();//=
        expect (r1.isDelimiter ()).toBe (true);
        r1.nextChar ();//>
        expect (r1.isDelimiter ()).toBe (true);
        r1.nextChar ();//"
        expect (r1.isDelimiter ()).toBe (true);
        r1.nextChar ();//\"
        expect (r1.isDelimiter ()).toBe (true);
        r1.nextChar ();///
        expect (r1.isDelimiter ()).toBe (true);

        expect (r2.isDelimiter ()).toBe (true);
        r2.matches ("->");///
        expect (r2.isDelimiter ()).toBe (false);
    });

    it ("parseToken", function () {
        var str1 = "<c:if disabled item='${abc}'>"
        let r1 = new JspReader (str1);
        r1.nextChar ()
        expect (r1.parseToken ()).toBe ("c:if");
    });

    it ("getText", function () {
        var str1 = "<c:if disabled item='${abc}'>"
        let r1 = new JspReader (str1);
        r1.nextChar ()
        expect (r1.parseToken ()).toBe ("c:if");
    });

});