/**
 * Created by machao on 17/6/18.
 */

const bufferUTF8 = new Buffer("Some UTF8 Text \u00b6 \u30c6 \u20ac", "utf8");

console.log(bufferUTF8.toString());
console.log(bufferUTF8.toString("utf8", 5, 9));

const StringDecoder = require("string_decoder").StringDecoder;
const decoder = new StringDecoder("utf8");
console.log(decoder.write(bufferUTF8));

console.log(bufferUTF8[18].toString(16));
console.log(bufferUTF8.readUInt16BE(18).toString(16));


// 获取Buffer的长度需要您注意的是，它跟获取字符串的长度不一样，获取的是总的字节数
const testStr = "UTF8 text \u00b6";

console.log(testStr.length); // => 11
console.log(Buffer.byteLength(testStr, "utf8")); // => 12

console.log(Buffer(testStr).length); // => 12