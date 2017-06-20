/**
 * Created by M.C on 2017/6/20.
 */

const stream = require("stream");
const util = require("util");
util.inherits(Reader, stream.Readable);
util.inherits(Writer, stream.Writable);

function Reader(opt) {
    stream.Readable.call(this, opt);
    this._index = 1;
}

Reader.prototype._read = function (size) {
    const i = this._index++;
    if (i < 10) {
        this.push("Item" + i.toString());
    } else {
        this.push(null);
    }
};


function Writer(opt) {
    stream.Writable.call(this, opt);
    this.data = [];
}

Writer.prototype._write = function (data, encoding, callback) {
    console.log(data.toString());
    this.data.push(data.toString());
    callback();
};


const r = new Reader();
const w = new Writer();
r.pipe(w);

// 要想结束写的操作，使用write.end()
