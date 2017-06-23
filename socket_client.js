/**
 * Created by M.C on 2017/6/23.
 */

const net = require("net");

function getConnect(connName) {
    var client = net.connect({port: "8108", host: "localhost"}, function () {
        console.log(connName + "Connected: ");
        console.log("local = %s:%s", this.localAddress, this.localPort);

        this.setTimeout(50000);
        this.setEncoding("utf8");

        // 监听服务器写数据
        this.on("data", function (data) {
            console.log(data);
            this.end();
        });

        // 监听完成
        this.on("end", function () {
            console.log(connName + "Client disconnected");
        });

        // 监听错误
        this.on("error", function (err) {
            console.log("Socket Error: " + JSON.stringify(err));
        });

        // 监听超时
        this.on("timeout", function () {
            console.log("Socket Time Out");
        });

        // 监听关闭
        this.on("close", function () {
            console.log("Socket Closeed");
        });

        this.write("ddddddd");
    });

    return client;
}

function writeData(socket, data) {
    const success = !socket.write(data);
    if (!success) {
        (function (socket, data) {
            socket.once("drain", function () {
                socket.write(data);
            });
        })(socket, data);
    }

}

const a = getConnect("a");
const b = getConnect("b");
const c = getConnect("c");

writeData(a, "aaaaaaaaaaa");
writeData(b, "bbbbbbbbbbbbbbb");
writeData(c, "cccccccccccccccccc");

