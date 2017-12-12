/**
 * Created by M.C on 2017/7/19.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
const Words = mongoose.model('Words', wordSchema, "word_stats");

mongoose.connection.once("open", function (err) {
    Words.findOne({word: "unhappy"} , function (err, doc) {
        console.log("\nBefore Removed: ");
        console.log(doc.toJSON());

        // 删除
        doc.remove(function (err, deletedDoc) {
            console.log("\nAfter Remoaved: ");
            Words.findOne({word: "unhappy"}, function (err, doc) {
                console.log(doc);
                mongoose.disconnect();
            });
        });
    });
});