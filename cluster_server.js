/**
 * Created by M.C on 2017/6/26.
 */

const cluster = require("cluster");
const http = require("http");

if (cluster.isMaster) {
    cluster.on("fork", function (worker) {
        console.log("Worker " + worker.id + "created");
    });
    cluster.on("listening", function (worker, address) {
        console.log("Worker " + worker.id + " is listening on " + address.address + ":" + address.port);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });

    cluster.setupMaster({ exec: "cluster_worker.js"});
}

const numCPUs = require("os").cpus().length;
for (let i = 0; i < numCPUs; i++) {
    if (i >= 4) {
        break;
    }
    cluster.fork();
}

Object.keys(cluster.workers).forEach(function (index) {
    cluster.workers[index].on("message", function (message) {
        console.log(message);
    })
});
