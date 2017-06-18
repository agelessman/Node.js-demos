/**
 * Created by machao on 17/6/10.
 */

var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandlers");

var handler = {};
handle["/"] = requestHandler.start;
handler["/start"] = requestHandler.start;
handler["/upload"] = requestHandler.upload;


server.start(router.route, handler);