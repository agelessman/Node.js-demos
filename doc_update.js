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

                    // 更新
                    const queryObj = {
                        type: "planetary",
                        $isolated: 1
                    };
                    const updateObj = {
                        $set: {
                            type: "PPPPPlanetary",
                            update: true,
                        }
                    };
                    const options = {
                        upsert: false,
                        multi: true,
                        w: 1
                    };
                    nebulae.update(queryObj, updateObj, options, function (err, results) {
                        nebulae.find(function (err, items) {
                            items.toArray(function (err, itemArray) {
                                console.log("Item Array:" );
                                console.log(itemArray);
                                db.close();
                            });
                        });
                    })
                });
            });

        }
    });

});