/**
 * Created by M.C on 2017/7/5.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");


const db = mongoose.connection;
db.on('open', function () {
    console.log("ddd");
    // mongoose.Connection.collections(function (err, collections) {
        console.log(mongoose.Connection.collections);
        mongoose.disconnect();
    // });

});
