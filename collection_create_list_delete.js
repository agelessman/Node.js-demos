/**
 * Created by M.C on 2017/6/29.
 */
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://dbadmin:test@localhost:27017/admin";

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log("Connect Error: \n" + err);
    } else {
        const newDB = db.db("newDB");
        newDB.collections(function (err, collections) {
            if (err) {
                console.log("Get Collections Error: \n" + err);
            } else {
                console.log("Initial collections: ");
                console.log(collections);

                // 创建
                newDB.createCollection("newCollection", function (err, collection) {
                    if (err) {
                        console.log("Create Collection Error: \n" + err);
                    } else {
                        // 查看特性
                        collection.stats(function (err, stats) {
                            console.log(stats);
                        });

                        newDB.collections(function (err, collections) {
                            if (err) {
                                console.log("Get Collections Error: \n" + err);
                            } else {
                                console.log("After Collection creation:");
                                console.log(collections);
                                
                                // 删除
                                newDB.dropCollection("newCollection", function (err, results) {
                                    newDB.collections(function (err, collections) {
                                        if (err) {
                                            console.log("Get Collections Error: \n" + err);
                                        } else {
                                            console.log("After Collection deletion:");
                                            console.log(collections);
                                            db.close();
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});