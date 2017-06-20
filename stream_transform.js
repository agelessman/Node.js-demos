/**
 * Created by M.C on 2017/6/20.
 */

const stream = require("stream");
const util = require("util");
util.inherits(JSONObjectStream, stream.Transform);

function JSONObjectStream(opt) {
    stream.Transform.call(this, opt);
}

JSONObjectStream.prototype._transform = function (data, encoding, callback) {
    const object = data ? JSON.parse(data.toString()) : "";
    this.emit("object", object);
    object.handle = true;
    this.push(JSON.stringify(object));
    callback();
};

JSONObjectStream.prototype._flush = function (cb) {
  cb();
};


const tc = new JSONObjectStream();

tc.on("object", function (object) {
   console.log("Name: " + object.name);
   console.log("age: " + object.age);
});

tc.on("data", function (data) {
    console.log("Data : " + data.toString());
});

tc.write('{"name": "James", "age": "20"}');
tc.write('{"name": "zhangsan", "age": "30"}');
tc.write('{"name": "lisi", "age": "50"}');
