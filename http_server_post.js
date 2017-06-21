/**
 * Created by M.C on 2017/6/21.
 */
const http = require("http");

http.createServer(function (request, response) {
    let jsonData = "";
    request.on("data", function (chunk) {
        jsonData += chunk;
    });
    request.on("end", function () {
        const requestObj = JSON.parse(jsonData);
        const responseObj = {
            message: "Hello " + requestObj.name,
            question: "Are you a good " + requestObj.occupation
        };
        response.writeHead(200);
        response.end(JSON.stringify(responseObj));
    });
}).listen(8080);