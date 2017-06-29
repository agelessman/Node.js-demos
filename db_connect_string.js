/**
 * Created by M.C on 2017/6/28.
 */

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://dbadmin:test@localhost:27017/admin";
const options = {
    db: {
        w: 1,
        native_parser: false
    },
    server: {
        poolSize: 5,
        socketOptions: {
            socketTimeoutMS: 500
        },
        auto_reconnect: true
    }
};

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log("Connection Failed Via Connection string." + err);
    } else {
        console.log("Connected Via Connection string...");
        // 创建一个新的db
        const newDB = db.db("newDB");
        newDB.createCollection("newC", function (err, collection) {
            if (!err) {
                console.log("Create a new collection");
                // 查看数据库列表
                const adminDB = db.admin();
                // console.log(adminDB);
                adminDB.listDatabases(function (err, databases) {
                    console.log(err);
                    console.log(databases);
                });
            }
        })

        // db.logout(function (err, result) {
        //     if (!err) {
        //         console.log("Logged out Via Connection string...");
        //         db.close();
        //         console.log("Connection closed...");
        //     }
        // })
    }
});