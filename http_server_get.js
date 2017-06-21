/**
 * Created by M.C on 2017/6/21.
 */
const http = require("http");

const message = ["Hello world", "From a basic Node.js server", "Take luck"];

http.createServer(function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.write("<html><head><title>Sample Http Server</title></head>");
    res.write("<body>");
    for (const idx in message) {
        res.write("\n<h1>" + message[idx] + "</h1>");
    }
    res.end("\n</body></html>");
}).listen(8080);