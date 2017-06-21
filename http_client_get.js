/**
 * Created by M.C on 2017/6/21.
 */
const http = require("http");

const options = {
    hostname: "localhost",
    port: "8080",
};

function responseHandler(response) {
    let result = "";
    response.on("data", function (chunk) {
        console.log(chunk);
        result += chunk;
    });
    response.on("end", function () {
        console.log(result);
    });
}

http.request(options, function (response) {
    responseHandler(response);
}).end();