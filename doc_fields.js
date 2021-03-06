/**
 * Created by M.C on 2017/7/4.
 */
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    const myDB = db.db("words");
    myDB.collection("word_stats", limitFields);
    setTimeout(function () {
        db.close();
    }, 3000);
});

function limitFields(err, words) {
    words.findOne({word: "the"}, {fields: { charsets: 0}}, function (err, item) {
        console.log("Excluding fieldsd object: ");
        console.log(JSON.stringify(item, null, 2));
    });

    words.findOne({word: "the"}, {fields: { word: 1, size: 1, stats: 1}}, function (err, item) {
        console.log("Including fieldsd object: ");
        console.log(JSON.stringify(item, null, 2));
    });
}