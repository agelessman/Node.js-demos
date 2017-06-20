/**
 * Created by M.C on 2017/6/20.
 */

const stream = require("stream");
const util = require("util");
util.inherits(MyDuplexObject, stream.Duplex);

/*Duplex当写入的时候会自动调用写出*/
function MyDuplexObject(opt) {
    stream.Duplex.call(this, opt);
    this.data = [];
}

MyDuplexObject.prototype._read = function readItem(size) {
  const chunk = this.data.shift();
  if (chunk === "stop") {
      this.push(null);
  } else {
      if (chunk) {
          this.push(chunk);
      } else {
          setTimeout(readItem.bind(this), 500, size);
      }
  }
};

MyDuplexObject.prototype._write = function (data, encoding, callback) {
      this.data.push(data);
      callback();
};


const duplex = new MyDuplexObject();

duplex.on("data", function (chunk) {
    console.log("read: " + chunk.toString());
});
duplex.on("end", function (chunk) {
    console.log("Message complete");
});

duplex.write("吃饭了吗？");
duplex.write("吃了啊");
duplex.write("吃的啥？");
duplex.write("你猜？");
duplex.write("吃的米饭");
duplex.write("猜对了");
duplex.write("stop");




