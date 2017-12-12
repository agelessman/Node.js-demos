/**
 * Created by M.C on 2017/7/18.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
const Words = mongoose.model('Words', wordSchema, "word_stats");


mongoose.connection.once("open", function () {
    let query = Words.findOne();
    query.where("word", "book");
    query.exec(function (err, doc) {
        console.log("\nIs Document New ? " + doc.isNew);
        console.log("\nBefore Saved: ");
        console.log(doc.toJSON());
        doc.set("word", "Book");
        doc.set("first", "B");
        console.log("\nModifield fields ");
        console.log(doc.modifiedPaths());

        doc.save(function (err) {
            console.log(err);
            Words.findOne({word: "Book"}, function (err, doc) {
                console.log("\nAfter Saved: ");
                console.log(doc.toJSON());
                mongoose.disconnect();
            });
        });
    });
});