/**
 * Created by M.C on 2017/6/29.
 */
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://dbadmin:test@localhost:27017/admin";

MongoClient.connect(url, function (err, db) {
    const testDB = db.db("test");
    testDB.collection("nebulae", function (err, nebulae) {
        if (!err) {
            nebulae.findOne({ type: "PPPPPlanetary"}, function (err, item) {
                console.log("Find: ");
                console.log(item);
                item.info = "Some Infos";
                nebulae.save(item, function (err, results) {
                    nebulae.findOne({_id: item._id}, function (err, savedItem) {
                        console.log("Saved : ");
                        console.log(savedItem);
                        db.close();
                    });
                });
            });
        }
    });

});