/**
 * Created by M.C on 2017/6/29.
 */
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://dbadmin:test@localhost:27017/admin";

function addObject(collection, object) {
    collection.insert(object, function (err, result) {
        if (!err) {
            console.log("Inserted: ");
            console.log(object);
        }
    });
}

MongoClient.connect(url, function (err, db) {
    const testDB = db.db("test");
    testDB.createCollection("nebulae", function (err, nebulae) {
        if (!err) {
            addObject(nebulae, {ngc:"NGC 7293", name:"Helix",type:"planetary",location:"Aquila"});
            addObject(nebulae, {ngc:"NGC 7293", name:"Helix",type:"planetary",location:"Aquila"});
            addObject(nebulae, {ngc:"NGC 7293", name:"Helix",type:"planetary",location:"Aquila"});
        }
    });

    setTimeout(function () {
        db.close();
    }, 3000);
});