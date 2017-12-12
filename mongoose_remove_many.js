/**
 * Created by M.C on 2017/7/19.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
const Words = mongoose.model('Words', wordSchema, "word_stats");

mongoose.connection.once("open", function (err) {
    Words.find({word: /bur.*/}, function (err, docs) {
        console.log("\nBefore Removed: ");
        for (let i = 0; i < docs.length; i++) {
            console.log(docs[i].word);
        }

        let query = Words.remove();
        query.where("word");
        query.regex(/burb.*/);
        query.exec(function (err, results) {
            console.log("%d Documents Removed ", results);

            Words.find({word: /bur.*/}, function (err, docs) {
                console.log("\nAfter Removed: ");
                for (let i = 0; i < docs.length; i++) {
                    console.log(docs[i].word);
                }

                mongoose.disconnect();
            });
        });
    });
});