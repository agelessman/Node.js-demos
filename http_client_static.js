/**
 * Created by M.C on 2017/6/21.
 */

const http = require("http");

const options = {
    hostname: "jingzhengu.com",
    port: "80",
    path: "/qcds/9796682/"
};

function responseHandler(response) {
    let result = "";
    response.on("data", function (err, chunk) {
        result += chunk;
    });
    response.on("end", function () {
        console.log(result);
    });
}

http.request(options, function (response) {
    console.log(response);
    responseHandler(response);
}).end();