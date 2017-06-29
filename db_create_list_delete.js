/**
 * Created by M.C on 2017/6/29.
 */
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://dbadmin:test@localhost:27017/admin";

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log("Connect Error: \n" + err);
    } else {
        const adminDB = db.admin();
        // 打印数据库状态
        adminDB.serverStatus(function (err, status) {
            console.log(status);
        });
        adminDB.listDatabases(function (err, databases) {
            if (err) {
                console.log("ListDatabase Error: \n" + err);
            } else {
                console.log("Before Add Database List: ");
                console.log(databases);
            }
        });
        
        const newDB = db.db("newDB");
        newDB.createCollection("newCollection", function (err, collection) {
            if (err) {
                console.log("Create Collection Error: \n" + err);
            } else {
                console.log("New Database And Collection Created");
                adminDB.listDatabases(function (err, databases) {
                    if (err) {
                        console.log("ListDatabase Error: \n" + err);
                    } else {
                        console.log("After Add Database List: ");
                        console.log(databases);
                        db.db("newDB").dropDatabase(function (err, results) {
                            if (err) {
                                console.log("Drop Database Error: \n" + err);
                            } else {
                                console.log("Database dropped.");
                                setTimeout(function () {
                                    adminDB.listDatabases(function (err, databases) {
                                        let found = false;
                                        for (let i = 0; i < databases.length; i++) {
                                            if (results.database[i].name === "newDB") {
                                                found = true;
                                            }
                                        }
                                        if (!found) {
                                            console.log("After Delete Database List: ");
                                            console.log(databases);
                                        }
                                        db.close();
                                    });
                                }, 15000);
                            }
                        })
                    }
                })
            }
        })
    }
});