/**
 * Created by M.C on 2017/6/26.
 */

const util = require("util");

console.log("Current directory: " + process.cwd());
console.log("Environment Settings: " + JSON.stringify(process.env));
console.log("Node args: " + process.argv);
console.log("Execution Path: " + process.execPath);
console.log("Execution args: " + JSON.stringify(process.execArgv));
console.log("Node version " + process.version);

console.log("Process ID " + process.pid);
console.log("Process Title " + process.title);
console.log("Process Platform " + process.platform);
console.log("Process Architecture " + process.arch);
console.log("Memory Usage: " + util.inspect(process.memoryUsage()));

const start = process.hrtime();
setTimeout(function () {
    const delta = process.hrtime(start);
    console.log("Hign-Res timer tooks %dseconds %dnanoseconds.", delta[0], +delta[1]);
    console.log("Node has been runing %d seconds", process.uptime());
}, 1000);