/**
 * Created by M.C on 2017/7/4.
 */
const MongoClient = require("mongodb").MongoClient;

let myDB = null;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    myDB = db.db("words");
    myDB.collection("word_stats", function (err, collection) {
        pageResults(err, collection, 0, 10);
    });

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

// 显示分页数据
function pageResults(err, words, startIndex, pageSize) {
    // 获取指定页码的数据
    words.find({ first: 'v'}, { limit: pageSize, skip: startIndex, sort: [ ['word', 1]]}, function (err, cursor) {
        cursor.count(true, function (err, cursorCount) {
            displayWords("Page Starting at " + startIndex, cursor);
            if (cursorCount === pageSize) {
                pageResults(err, words, startIndex + pageSize, pageSize);
            } else {
                myDB.close();
            }
        });
    });
}