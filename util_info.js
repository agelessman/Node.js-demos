/**
 * Created by M.C on 2017/6/27.
 */

const util = require("util");

// 格式化字符串
// 正常情况
const str1 = util.format("%s : %d", "age", 30);
console.log(str1); // age : 30

// 当后边的参数少于第一个格式化参数中的占位符个数,后边的占位符直接输出
const  str2 = util.format("%s : %d", "age");
console.log(str2); // age : %d

// 当后边的参数多于占位符的个数的时候，参数会直接拼接到字符串中，以空格分隔
const  str3 = util.format("%s : %d", "age", 20, "hello");
console.log(str3); // age : 20 hello

// 没有占位符，同样拼接成字符串，以空格分隔
const  str4 = util.format("James", "age", 20, "hello");
console.log(str4); // James age 20 hello

// 判断类型，有很多相似的方法
console.log(util.isArray([1, 2, 3])); // true

// 同步的写入打破output stream util.debug/error/puts/prints/log
util.log("some text"); // 27 Jun 10:58:53 - some text

// 打印对象，util.inspect(object, [options])
console.log(util.inspect({name: 'James', age: 30}, { colors: true}));

const obj = {
    name: "James",
    age: 30
};
obj.inspect = function (depth) {
    return '{ name: "' + this.name + '" age: ' + this.age + ' }';
};
console.log(util.inspect(obj));

// 使用继承特性
const events = require("events");

function Writer() {
    events.EventEmitter.call(this);
}

util.inherits(Writer, events.EventEmitter);
Writer.prototype.write = function (data) {
    this.emit("data", data);
};

const w = new Writer();
console.log(w instanceof events.EventEmitter);
console.log(w.super_ === events.EventEmitter);

w.on("data", function (data) {
    console.log("Received data: " + data);
});

w.write("Some Data!");

// dns
const dns = require("dns");

console.log("Resolving www.baidu.com...");
dns.resolve4('www.baidu.com', function (err, addresses) {
    console.log('IPv4 addresses: ' + JSON.stringify(addresses, false, ' '));
    addresses.forEach(function (addr) {
        dns.reverse(addr, function (err, domains) {
            console.log("Reverse for "+ addr + ': ' + JSON.stringify(domains));
        });
    })
});
