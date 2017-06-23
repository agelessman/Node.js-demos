/**
 * Created by M.C on 2017/6/23.
 */
const net = require("net");

const server = net.createServer(function (client) {
    console.log("Client Connected");
    console.log("Client local: %s:%s", client.localAddress, client.localPort);

    client.setTimeout(500);

    client.on("data", function (data) {
        console.log("Received data from client on port: %d %s", client.localPort, data.toString());
        console.log("Bytes received: " + data.length);

        writeData(client, "Sending: " + data.toString());
        console.log("Bytes sent: " + client.bytesWritten);
    });
    
    client.on("end", function () {
        console.log("Client disconnected");
        server.getConnections(function (err, count) {
            console.log("Remaining Connections: " + count);
        });
    });

    client.on("error", function (err) {
        console.log("Socket Error: " + JSON.stringify(err));
    });

    client.on("timeout", function () {
        console.log("Socket time out");
    });
});

server.listen(8108, function () {
    console.log("Server listening " + JSON
            .stringify(server.address()));
});

server.on("close", function () {
    console.log("Server Terminated");
});

server.on("error", function (err) {
    console.log("Server Error: " + JSON.stringify(err));
});



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