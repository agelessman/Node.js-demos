/**
 * Created by M.C on 2017/7/3.
 */
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    const myDB = db.db("words");
    myDB.collection("word_stats", findItems);
    setTimeout(function () {
        db.close();
    }, 3000);
});

function displayWords(msg, cursor, pretty) {
    cursor.toArray(function (err, itemArr) {
        console.log("\n" + msg);
        let wordList = [];
        for (let i = 0; i < itemArr.length; i++) {
            wordList.push(itemArr[i].word);
        }
        console.log(JSON.stringify(wordList, null, pretty));
    });
}

function findItems(err, words) {
    // 查询以a，b，或者c开头的单词
    words.find({first:{$in: ['a', 'b', 'c']}}, function (err, cursor) {
        displayWords("Words starting with a, b or c: ", cursor);
    });

    // 查询长度大于12的单词
    words.find({size: {$gt: 12}}, function (err, cursor) {
        displayWords("Words longer than 12 charaters: ", cursor);
    });

    // 查询size是2的倍数的单词(偶数)
    words.find({size: {$mod: [2, 0]}}, function (err, cursor) {
        displayWords("Words with event Lengths: ", cursor);
    });

    // 查询不重复单词个数为10的单词
    words.find({letters: {$size: 10}}, function (err, cursor) {
        displayWords("Words with 12 distinct characters: ", cursor);
    });

    // 查询首字母为a,e,i,o,u且末位为a, e,i, o, u的单词(元音)
    words.find({$and:[{first: { $in: ['a', 'e', 'i', 'o', 'u']}}, {last: {$in: ['a', 'e', 'i', 'o', 'u']}}]}, function (err, cursor) {
        displayWords("Words that start and end with a vowel: ", cursor);
    });

    // 查询元音不重复个数大于四个单词
    words.find({"stats.vowels": { $gt: 4}}, function (err, cursor) {
        displayWords("Words containnong 4 or more vowels: ", cursor);
    });

    // 查询拥有5个元音的单词
    words.find({letters: { $all: ['a', 'e', 'i', 'o', 'u']}}, function (err, cursor) {
        displayWords("Words with all 5 vowels: ", cursor);
    });

    // 查询包含非字母的单词
    words.find({otherChars: { $exists: true}}, function (err, cursor) {
        displayWords("Words with non-alphabet characters: ", cursor);
    });

    // 查询包含非字母的且有两个不重复的字母的单词
    words.find({ charsets: { $elemMatch: { $and: [{ type: 'other'}, {chars: { $size: 2}}]}} }, function (err, cursor) {
        displayWords("Words with 2 non-alphabet characters: ", cursor);
    });
}