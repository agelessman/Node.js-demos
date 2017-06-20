/**
 * Created by M.C on 2017/6/20.
 */

const stream = require("stream");
const util = require('util');
util.inherits(Writer, stream.Writable);

function Writer(opt) {
    stream.Writable.call(this, opt);
    this.data = [];
}

Writer.prototype._write = function (data, encoding, callback) {
    this.data.push(data.toString('utf8'));
    console.log("Add: " + data);
    callback();
};

const writer = new Writer();
for (let i = 0; i < 5; i++) {
    writer.write("item " + i, 'utf8');
}
writer.end("Last Item");

console.log(writer.data);
