/**
 * Created by M.C on 2017/6/21.
 */

const fs = require("fs");
const Path = require("path");

function walkDirs(dirPath) {
    console.log(dirPath);
    fs.readdir(dirPath, function (err, entries) {
        for (const idx in entries) {
            const fullPath = Path.join(dirPath, entries[idx]);
            (function (fullPath) {
                fs.stat(fullPath, function (err, stats) {
                    if (stats && stats.isFile()) {
                        console.log(fullPath);
                    } else if (stats.isDirectory()) {
                        walkDirs(fullPath);
                    }
                });
            })(fullPath);
        }
    });
}

walkDirs("../node");