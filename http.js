/**
 * Created by M.C on 2017/6/21.
 */

const url = require("url");

const urlStr = "http://user:pass@host.com:80/resource/path?query=string#hash";

const urlObj = url.parse(urlStr);
const urlFormat = url.format(urlObj);

console.log(urlObj);
console.log(urlFormat);

// url resolve
const newUrl = "/test/index";
console.log(url.resolve(urlStr, newUrl)); // http://user:pass@host.com:80/test/index

// querystring
const querystring = require("querystring");

const param = querystring.parse("name=James&age=12");
console.log(param);
console.log(querystring.stringify(param));