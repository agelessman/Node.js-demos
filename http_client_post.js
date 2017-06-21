/**
 * Created by M.C on 2017/6/21.
 */

const http = require("http");

const options = {
    hostname: "127.0.0.1",
    port: "8080",
    path: "/",
    method: "POST"
};

function readJSONResponse(response) {
    let result = "";
    response.on("data", function (chunk) {
        result += chunk;
    });
    response.on("end", function () {
        const responseObj = JSON.parse(result);
        console.log(responseObj);
    });
}

const postRequest = http.request(options, readJSONResponse);
postRequest.write('{"name": "James", "occupation": "Burglar"}');
postRequest.end();