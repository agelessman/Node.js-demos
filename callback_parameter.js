/**
 * Created by machao on 17/6/18.
 */

const events = require("events");

// CarShow
function CarShow() {
    events.EventEmitter.call(this);
    this.seeCar = function (make) {
        this.emit("sawCar", make);
    }
}

CarShow.prototype.__proto__ = events.EventEmitter.prototype;

// functions
function logCar(make) {
    console.log("Saw a " + make);
}

function logColorCar(make, color) {
    console.log("Saw a %s %s", color, make);
}

// Create a new CarShow object
const show = new CarShow();
// Add listener
show.on("sawCar", logCar);
show.on("sawCar", function (make) {
    const colors = ["red", "blue", "orange"];
    const color = colors[Math.floor(Math.random() * 3)];
    logColorCar(make, color);
});


show.seeCar("Ferrari");
show.seeCar("Porsche");
show.seeCar("Bugatti");
show.seeCar("Lamborghini");
show.seeCar("Aston Martin");
