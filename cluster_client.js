/**
 * Created by M.C on 2017/6/26.
 */

const http = require("http");

const options = {
    port: 8080
};

function sendRequest() {
    http.request(options, function (res) {
        let serverData = "";
        res.on("data", function (chunk) {
            serverData += chunk;
        });
        res.on("end", function () {
            console.log(serverData);
        });
    }).end();
}

for (let i = 0; i< 5; i++) {
    console.log("Send Reqest");
    sendRequest();
}