/**
 * Created by M.C on 2017/6/29.
 */
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://dbadmin:test@localhost:27017/admin";

MongoClient.connect(url, function (err, db) {
    const testDB = db.db("test");
    testDB.collection("nebulae", function (err, nebulae) {
        if (!err) {
            nebulae.find(function (err, items) {
                items.toArray(function (err, itemArray) {
                    console.log("Item Array:" );
                    console.log(itemArray);
                });
            });

            nebulae.findOne({ngc:"NGC 7293"}, function (err, item) {
                console.log("Find One:" );
                console.log(item);
            });
        }
    });

    setTimeout(function () {
        db.close();
    }, 3000);
});