/**
 * Created by M.C on 2017/6/21.
 */

const fs = require("fs");

fs.stat("file_stats.js", function (err, stats) {
    if (!err) {
        console.log("Stats: " + JSON.stringify(stats, null, "  "));
        console.log(stats.isFile() ? "Is a file" : "Is not a file");
        console.log(stats.isDirectory() ? "Is a directory" : "Is not a directory");
        console.log(stats.isFIFO() ? "Is FIFO" : "Is not FIFO");
    }
});