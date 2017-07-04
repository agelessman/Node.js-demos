/**
 * Created by M.C on 2017/7/4.
 */
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    const myDB = db.db("words");
    myDB.collection("word_stats", distinctValues);
    setTimeout(function () {
        db.close();
    }, 3000);
});


function distinctValues(err, words) {
    // 查询字段为size的值
    words.distinct('size', function (err, values) {
        console.log("\nSizes of words: ");
        console.log(values);
    });

    // 查询最后一位是u的单词所有的字段为first的值
    words.distinct('first', { last: 'u'}, function (err, values) {
        console.log("\nFirst letters of  words ending in u: ");
        console.log(values);
    });

    // 获取单词中的原因个数
    words.distinct('stats.vowels', function (err, values) {
        console.log("\nNumbers of vowels in words: ");
        console.log(values);
    });

}