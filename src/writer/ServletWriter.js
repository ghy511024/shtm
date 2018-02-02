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