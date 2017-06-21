/**
 * Created by M.C on 2017/6/21.
 */

const fs = require("fs");

const fd = fs.openSync("veggie.txt", "r");

let veggies = "";
let bytes = 0;

do {
    const buffer = new Buffer(5);
    buffer.fill();

    bytes = fs.readSync(fd, buffer, null, 5);
    console.log("Read: %sbytes", bytes);
    veggies += buffer.toString();
} while (bytes > 0);

fs.closeSync(fd);

console.log("Read: " + veggies);
