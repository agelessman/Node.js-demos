/**
 * Created by M.C on 2017/7/4.
 */
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    const myDB = db.db("words");
    myDB.collection("word_stats", limitItems);
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

function limitItems(err, words) {
    // 查询以p开头的单词的个数
    words.count({first:'p'}, function (err, count) {
        console.log("Words starting with p: " + count);
    });

    words.find({ first: 'p'}, function (err, cursor) {
        displayWords("Words starting with p: ", cursor);
    });

    words.find({ first: 'p'}, {limit: 5},  function (err, cursor) {
        displayWords("Limiting words starting with p: ", cursor);
    });

}