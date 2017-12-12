/**
 * Created by M.C on 2017/7/19.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
const Words = mongoose.model('Words', wordSchema, "word_stats");

wordSchema.pre("init", function (next) {
    console.log("A new word is about to be initialized from the db.");
    next();
});

wordSchema.pre("validate", function (next) {
    console.log("%s is about to be validated.", this
        .word);
    next();
});

wordSchema.pre("save", function (next) {
    console.log("%s is about to be saved.", this
        .word);
    console.log("Setting size to %s ", this.word.length);
    // this.size = this.word.length;
    next();
});

wordSchema.pre("remove", function (next) {
    console.log("%s is about to be removed.", this
        .word);
    next();
});

Words.schema.post("init", function (doc) {
    console.log("%s has been initialized from the db.", doc.word);
});

Words.schema.post("validate", function (doc) {
    console.log("%s has been validated.", doc
        .word);
});

Words.schema.post("save", function (doc) {
    console.log("%s has been saved.", doc
        .word);
});

Words.schema.post("remove", function (doc) {
    console.log("%s has been removed.", doc
        .word);
});

mongoose.connection.once("open", function (err) {
    const word1 = new Words({
        word: "JamesBond",
        first: "J",
        last: "d"
    });

    console.log("\nSaving...");

    word1.save(function (err) {
        console.log("\nFinding...");
        
        Words.findOne({word: "JamesBond"}, function (err, doc) {
           console.log("\nRemoving...");
           console.log(doc);
            word1.remove(function (err) {
               mongoose.disconnect();
           });
            
        });

    });

});