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