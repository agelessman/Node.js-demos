/**
 * Created by M.C on 2017/7/4.
 */
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    const myDB = db.db("words");
    myDB.collection("word_stats", findItems);
    setTimeout(function () {
        db.close();
    }, 3000);
});

function displayWords(msg, count, pretty) {
    console.log(msg + count);
}

function findItems(err, words) {
    // 查询以a，b，或者c开头的单词
    words.count({first:{$in: ['a', 'b', 'c']}}, function (err, count) {
        displayWords("Words starting with a, b or c: ", count);
    });

    // 查询长度大于12的单词
    words.count({size: {$gt: 12}}, function (err, count) {
        displayWords("Words longer than 12 charaters: ", count);
    });

    // 查询size是2的倍数的单词(偶数)
    words.count({size: {$mod: [2, 0]}}, function (err, count) {
        displayWords("Words with event Lengths: ", count);
    });

    // 查询不重复单词个数为10的单词
    words.count({letters: {$size: 10}}, function (err, count) {
        displayWords("Words with 12 distinct characters: ", count);
    });

    // 查询首字母为a,e,i,o,u且末位为a, e,i, o, u的单词(元音)
    words.count({$and:[{first: { $in: ['a', 'e', 'i', 'o', 'u']}}, {last: {$in: ['a', 'e', 'i', 'o', 'u']}}]}, function (err, count) {
        displayWords("Words that start and end with a vowel: ", count);
    });

    // 查询元音不重复个数大于四个单词
    words.count({"stats.vowels": { $gt: 4}}, function (err, count) {
        displayWords("Words containnong 4 or more vowels: ", count);
    });

    // 查询拥有5个元音的单词
    words.count({letters: { $all: ['a', 'e', 'i', 'o', 'u']}}, function (err, count) {
        displayWords("Words with all 5 vowels: ", count);
    });

    // 查询包含非字母的单词
    words.count({otherChars: { $exists: true}}, function (err, cursor) {
        displayWords("Words with non-alphabet characters: ", cursor);
    });

    // 查询包含非字母的且有两个不重复的字母的单词
    words.count({ charsets: { $elemMatch: { $and: [{ type: 'other'}, {chars: { $size: 2}}]}} }, function (err, cursor) {
        displayWords("Words with 2 non-alphabet characters: ", cursor);
    });
}