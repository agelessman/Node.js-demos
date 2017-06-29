/**
 * Created by M.C on 2017/6/26.
 */

const childProcess = require("child_process");

const options = {
    env: { user: "M.C"},
    encoding: "utf8"
};

function makeChild() {
    const child = childProcess.fork("chef.js", [], options);
    child.on("message", function (message) {
        console.log("Get Message: " + message);
    });
    return child;
}

function sendCommand(child, command) {
    console.log("Parent Send: " + command);
    child.send({cmd: command});
}


const child1 = makeChild();
const child2 = makeChild();
const child3 = makeChild();

sendCommand(child1, "makeBreakfast");
sendCommand(child2, "makeLunch");
sendCommand(child3, "makeDinner");

