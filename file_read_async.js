/**
 * Created by M.C on 2017/6/21.
 */

const fs = require("fs");

function readFruit(fd, fruit) {
    const buffer = new Buffer(5);
    buffer.fill();

    fs.read(fd, buffer, 0, 5, null, function (err, bytes, data) {
        if (err) {
            console.log("Failed to read fruit");
        } else {
            if (bytes > 0) {
                console.log("Read: %sbytes", bytes);
                fruit += data;
                readFruit(fd, fruit);
            } else {
                fs.close(fd);
                console.log("Read: " + fruit);
            }
        }
    })
}

fs.open("fruit.txt", "r", function (err, fd) {
    readFruit(fd, "");
});