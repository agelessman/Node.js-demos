/**
 * Created by M.C on 2017/7/17.
 */

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
var Words = mongoose.model('Words', wordSchema, "word_stats");


setTimeout(function () {
    mongoose.disconnect();
}, 3000);

mongoose.connection.once("open", function () {
    let query = Words.count();
    query.where("first");
    query.in(['a', 'e', 'i', 'o', 'u']);
    query.where("last");
    query.in(['a', 'e', 'i', 'o', 'u']);
    query.exec(function (err, count) {
        console.log("\nThere are " + count + "words first and last with a vowel");
    });

    query.find().limit(5).sort({size: -1});
    query.exec(function (err, docs) {
        console.log("\nLongest 5 words that start and end with a vowel:");
        for (let i in docs) {
            console.log(docs[i].word);
        }
    });

    query = Words.find();
    query.mod("size", 2, 0);
    query.where("size");
    query.gt(6);
    query.limit(10);
    // query.select({size: 1, word: 1});
    query.exec(function (err, docs) {
        console.log("\nWords with even lengths and longer than 5 letters:");
        for (let i in docs) {
            console.log(JSON.stringify(docs[i]));
        }
    });
});