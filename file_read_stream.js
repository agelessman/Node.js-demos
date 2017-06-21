/**
 * Created by M.C on 2017/6/21.
 */

const fs = require("fs");

const options = {encoding: "utf8", flag: "r"};

const fileReadStream = fs.createReadStream("grains.txt", options);

fileReadStream.on("data", function (chunk) {
    console.log("%s", chunk);
    console.log("Read %d bytes", chunk.length);
});

fileReadStream.on("close", function () {
    console.log("Read done");
});