/**
 * Created by M.C on 2017/7/19.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
const Words = mongoose.model('Words', wordSchema, "word_stats");


mongoose.connection.once("open", function () {
    let query = Words.find({word: /count.*/}, function (err, docs) {
        console.log("\nBefore Updated: ");
        for (let i = 0; i < docs.length; i++) {
            console.log(docs[i].word + " : " + docs[i].size);
        }

        let query = Words.update({}, {$set: {size: 0}});
        query.setOptions({multi: true});
        query.where("word");
        query.regex(/count.*/);
        query.exec(function (err, results) {
            let query = Words.find({word: /count.*/}, function (err, docs) {
                console.log("\nAfter Updated: ");
                for (let i = 0; i < docs.length; i++) {
                    console.log(docs[i].word + " : " + docs[i].size);
                }

                mongoose.disconnect();
            });
        });
        
    });

});