/**
 * Created by M.C on 2017/7/5.
 */
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    const myDB = db.db("words");
    myDB.collection("word_stats", aggregateItems);
    setTimeout(function () {
        db.close();
    }, 3000);
});

function aggregateItems(err, words) {
    // 查询首字母是元音的总数， 其中字母个数最多， 字母个数最少
    words.aggregate([
        {$match: {first: {$in: ['a', 'e', 'i', 'o', 'u']}}},
        {$group:{
            _id: "$first",
            largest: {$max: "$size"},
            smallest: {$min: "$size"},
            total: {$sum: 1}}},
        {$sort: {_id: 1}}
        ], function (err, results) {
        console.log("Largest adn smallest word sizes for " + "words beginning with a vowel: ");
        console.log(results);
    });

    // 查询5个单词数等于4的stats
    words.aggregate([
        {$match: {size: 4}},
        {$limit: 5},
        {$project: {_id: "$word", stats: 1}}
    ], function (err, results) {
        console.log("Stats for 5 four letter words:" );
        console.log(results);
    });

    // 查询5个结果，单词size平均值最大的5个
    words.aggregate([
        {$group: {_id: "$first", average: {$avg: "$size"}}},
        {$sort: {average: -1}},
        {$limit: 5}
    ], function (err, results) {
        console.log("Letters with largest average word size:" );
        console.log(results);
    });
}