/**
 * Created by M.C on 2017/7/4.
 */
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    const myDB = db.db("words");
    myDB.collection("word_stats", sortItems);
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

function sortItems(err, words) {

    // 未排序
    words.find({last: 'w'}, function (err, cursor) {
        displayWords("Words ending in w: ", cursor);
    });

    // 正序
    words.find({ last: 'w'}, {sort: { word: 1}}, function (err, cursor) {
        displayWords("Words ending in w sorted ascending: ", cursor);
    });

    // 倒序
    words.find({ last: 'w'}, {sort: { word: -1}}, function (err, cursor) {
        displayWords("Words ending in w sorted descending: ", cursor);
    });

    // 多个排序条件
    words.find({ first: 'b'}, { sort: [ ['size', -1], ['last', 1]]}, function(err, cursor) {
        displayWords("B words sorted by size then by last letter: ", cursor);
    });

    // 多个排序条件
    words.find({ first: 'b'}, { sort: [ ['last', 1], ['size', -1]]}, function(err, cursor) {
        displayWords("B words sorted by last then by size letter: ", cursor);
    });
}