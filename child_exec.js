/**
 * Created by M.C on 2017/6/26.
 */

const childProcess = require("child_process");

const options = {
    maxBuffer: 100 * 1024,
    encoding: "utf8",
    timeout: 5000
};

// exec最后边的函数参数会在子线程终止的时候被调用，因此下边的exit会先调用，然后再调用这个参数的值
const child = childProcess.exec("ls", options, function (error, stdout, stderr) {
    "use strict";
    if (error) {
        console.log("Error Stack: " + error.stack);
        console.log("Error Code: " + error.code);
        console.log("Error Signal: " + error.signal);
    }

    console.log("Result: \n" + stdout);
    
    if (stderr) {
        console.log("Errors: " + stderr);
    }
});

child.on("exit", function (code) {
    console.log("Completed with code: " + code);
});