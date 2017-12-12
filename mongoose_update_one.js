/**
 * Created by M.C on 2017/7/19.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
const Words = mongoose.model('Words', wordSchema, "word_stats");


mongoose.connection.once("open", function () {
    let query = Words.findOne();
    query.where("word", "book");
    query.exec(function (err, doc) {
        console.log("\nBefore Update: ");
        console.log(doc.toJSON());

        // 更新book 在末尾添加一个s
        const query = doc.update({$set: {word: "books", size: 5, last: "s"}, $push: {letters: "s"}});
        query.exec(function (err, results) {
            console.log("%d Documents Updated ", results);
            Words.findOne({word: "books"}, function (err, doc) {
                console.log("\nAfter Update: ");
                console.log(doc.toJSON());
                mongoose.disconnect();
            });
        });
    });
});