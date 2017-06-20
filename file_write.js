/**
 * Created by M.C on 2017/6/20.
 */

const fs = require("fs");

const config = {
    maxFiles: 20,
    maxConnections: 15,
    rootPath: "/webroot"
};

const configText = JSON.stringify(config);
const options = { encoding: "utf8", flag: "w"};

fs.writeFile("config.txt", configText, options, function (err) {
    if (err) {
        console.log("Config write Failed");
    } else {
        console.log("Config saved");
    }
});