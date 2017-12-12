/**
 * Created by M.C on 2017/7/19.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
const Words = mongoose.model('Words', wordSchema, "word_stats");

mongoose.connection.once("open", function (err) {
    Words.aggregate([
        {$match: {first: {$in: ["a", "e", "i", "o", "u"]}}},
        {$group: {_id: "$first", largest: {$max: "$size"}, smallest: {$min: "$size"}, total: {$sum: 1}}},
        {$sort: {_id: 1}}
    ], function (err, results) {
       console.log("\nLargest and smallest word size for words beginning with a vowel: ");
       console.log(results);
    });

    let aggregate = Words.aggregate();
    aggregate.match({size: 4});
    aggregate.limit(5);
    aggregate.append({$project: {_id: "$word", stats: 1}});
    aggregate.exec(function (err, results) {
        console.log("\nStats for 5 four letters words: ");
        console.log(results);
    });

    aggregate = Words.aggregate();
    aggregate.group({_id: "$first", average: {$avg: "$size"}});
    aggregate.sort("-average");
    aggregate.limit(5);
    aggregate.exec(function (err, results) {
        console.log("\nLetters with largest average size words : ");
        console.log(results);
    });

});