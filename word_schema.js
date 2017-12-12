/**
 * Created by M.C on 2017/7/15.
 */

const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var wordSchema = new Schema({
    word: {type: String, index: 1, required:true, unique: true},
    first: {type: String, index: 1},
    last: String,
    size: Number,
    letters: [String],
    stats: {
        vowels:Number, consonants:Number},
    charsets: []
}, {collection: 'word_stats'});

wordSchema.methods.startsWith = function (letter) {
    return this.first === letter;
};

exports.wordSchema = wordSchema;

// console.log(wordSchema.indexedPaths());
// console.log(wordSchema.requiredPaths());
// console.log(wordSchema.indexes());

