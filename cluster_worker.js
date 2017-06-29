/**
 * Created by M.C on 2017/6/26.
 */

const cluster = require("cluster");
const http = require("http");

if (cluster.isWorker) {
    http.createServer(function (req, res) {
        res.writeHead(200);
        res.end("Process " + process.pid + "says hello.");
        process.send("Process " + process.pid + "handled request");
    }).listen(8080, function () {
        console.log("Child Server Running On " + process.pid);
    });
}