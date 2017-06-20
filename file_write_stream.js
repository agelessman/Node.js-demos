/**
 * Created by M.C on 2017/6/20.
 */

const fs = require("fs");

const grains = ["wheat", "rice", "oats"];
const options = { encoding: "utf8", flag: "w"};

const fileWriteStream = fs.createWriteStream("grains.txt", options);
fileWriteStream.on("close", function () {
     console.log("File Closed");
});

while (grains.length) {
    const grain = grains.pop() + " ";
    fileWriteStream.write(grain);
    console.log("Wrote %s", grain);
}

fileWriteStream.end();