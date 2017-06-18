/**
 * Created by machao on 17/6/18.
 */

function logCar(logMsg, callback) {
    process.nextTick(function () {
       callback(logMsg);
    });
}

const cars = ["A", "B", "C"];
cars.forEach(function (item, index, array) {
    const message = "Saw a " + cars[index];
    logCar(message, function () {
        console.log("Normal Callback: " + message);
    })
});msg


cars.forEach(function (item, index, array) {
    const msg = "Saw a " + cars[index];
    (function (msg) {
        logCar(msg, function () {
            console.log("Closure Callback: " + msg);
        })
    })(msg);
});