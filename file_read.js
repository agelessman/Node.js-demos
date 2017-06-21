/**
 * Created by M.C on 2017/6/21.
 */

const fs = require("fs");

const options = {encoding: "utf8", flag: "r"};

fs.readFile("config.txt", options, function (err, data) {
    if (err) {
        console.log("Failed to Open Config File");
    } else {
        console.log("File loaded");
        const config = JSON.parse(data);
        console.log(config);
    }
});