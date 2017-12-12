/**
 * Created by M.C on 2017/7/18.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
const Words = mongoose.model('Words', wordSchema, "word_stats");


mongoose.connection.once("open", function () {
    const newWord1 = new Words({
        word: "gratifaction",
        first: "g",
        last: "n",
        size: 12,
        letters: ["g", "r", "a", "t", "i", "f", "a", "c", "t", "i", "o", "n"],
        stats: {vowels: 5, consonants: 7}
    });

    console.log("Is Document New ? " + newWord1.isNew);

    // 使用save方法
    newWord1.save(function (err, doc) {
        console.log("\nSaved Document: " + doc);
    });

    const newWord2 = new Words({
        word: "aaaaaaaaa"
    });

    const newWord3 = new Words({
        word: "bbbbbbbbbb"
    });

    Words.create([newWord2, newWord3], function (err) {
        for (let i = 1; i < arguments.length; i++) {
            console.log("\nCreated Docments: " + arguments[i]);
        }
        mongoose.disconnect();
    });
});