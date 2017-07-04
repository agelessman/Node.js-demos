/**
 * Created by M.C on 2017/7/4.
 */
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    const myDB = db.db("words");
    myDB.collection("word_stats", groupItems);
    setTimeout(function () {
        db.close();
    }, 3000);
});

/*group的目的就是统计符合条件的结果的个数*/

function groupItems(err, words) {
    words.group(
        ['first', 'last'],
        { first: 'o', last: {$in: ['a', 'e', 'i', 'o', 'u']}},
        {count: 0},
        function (obj, pre) {
            "use strict";
            pre.count++;
        }, true,
        function (err, results) {
            console.log("o开头以元音结尾的分组结果： ");
            console.log(results);
        });

    // 以首字母，size大于12 分组
    words.group(
        ['first'],
        {size: { $gt: 13}},
        {count:0, totalVowels:0},
        function (obj, pre) {
            pre.count++;
            pre.totalVowels += obj.stats.vowels;
        }, true,
        function (err, results) {
            console.log("size大于13的单词的首字母: ");
            console.log(results);
        });

    // 统计不同首字母的个数
    words.group(
        ['first'],
        {},
        {count: 0, vowels: 0, consonants: 0},
        function (obj, pre) {
            pre.count++;
            pre.vowels += obj.stats.vowels;
            pre.consonants += obj.stats.consonants;
        }, {}, true,
        function (err, results) {
            console.log("统计不同首字母的个数: ");
            console.log(results);
        });
}