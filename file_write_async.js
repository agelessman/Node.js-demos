/**
 * Created by M.C on 2017/6/20.
 */

const fs = require("fs");

const fruitBowl = ["apple", "orange", "banana", "grapes"];

function writeFruit(fd) {
    if (fruitBowl.length) {
        const fruit = fruitBowl.pop() + " ";
        fs.write(fd, fruit, null, null, function (err, bytes) {
            if (err) {
                console.log("File write failed");
            } else {
                console.log("Wrote %s %dbytes", fruit, bytes);
                writeFruit(fd);
            }
        });
    } else {
        fs.close(fd);
    }
}

fs.open("fruit.txt", "w", function (err, fd) {
    writeFruit(fd);
});