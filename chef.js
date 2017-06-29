/**
 * Created by M.C on 2017/6/26.
 */

process.on("message", function (message, parent) {
    let meal = [];
    switch (message.cmd) {
        case "makeBreakfast":
            meal = ["ham", "eggs", "toast"];
            break;
        case "makeLunch":
            meal = ["burger", "fries", "shake"];
            break;
        case "makeDinner":
            meal = ["soup", "salad", "steak"];
            break;
    }

    process.send(meal);
});