/**
 * Created by ghy on 2017/12/1.
 * http://nodejs.cn/api/fs.html#fs_fs_writefilesync_file_data_options
 */

const fs = require ("fs");
const Writer = require ("./Writer");
class FileWriter extends Writer {
    constructor (outFilePath) {
        super ();
        this.filePath = outFilePath;
        fs.writeFileSync (this.filePath, "");
    }

    _write_str (s) {
        fs.appendFileSync (this.filePath, s);
    }

    _write_num (s) {
        fs.appendFileSync (this.filePath, s);
    }

    _write_bol (s) {
        fs.appendFileSync (this.filePath, s);
    }

    _write_obj (s) {
        fs.appendFileSync (this.filePath, "[Object]");
    }

    _write_arr (s) {
        fs.appendFileSync (this.filePath, "[Array]");
    }

}
module.exports = FileWriter;