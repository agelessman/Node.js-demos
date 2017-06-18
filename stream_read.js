/**
 * Created by machao on 17/6/18.
 */

const stream = require("stream");
const util = require("util");
util.inherits(Answers, stream.Readable);

function Answers(opt) {
    stream.Readable.call(this, opt);
    this.quotes = ["yes", "no", "maybe"];
    this._index = 0;
}

// 这个_read函数就相当于我们可以自定义文件的写入和写出函数，我们可以自己制定这样的规则
Answers.prototype._read = function () {
  if (this._index > this.quotes.length) {
      this.push(null);
  } else {
      this.push(this.quotes[this._index]);
      this._index += 1;
  }
};

const answer = new Answers();
console.log("Direct read: " + answer.read().toString());

answer.on("data", function (data) {
    console.log("Callback read: " + data.toString());
});

answer.on("end", function (data) {
    console.log("No more answers.");
});