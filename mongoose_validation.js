/**
 * Created by M.C on 2017/7/19.
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/words");
const wordSchema = require("./word_schema.js").wordSchema;
const Words = mongoose.model('Words', wordSchema, "word_stats");

Words.schema.path("word").validate(function (data) {
    "use strict";
    return data.length > 0;
}, "Word is too small");

Words.schema.path("word").validate(function (data) {
    "use strict";
    return data.length < 0;
}, "Word is too big");

mongoose.connection.once("open", function (err) {
   const word1 = new Words({
        word: "asfasdfasfasfasdfafaslk;fjasljflasdkjdfad",
       first: "a",
       last: "d",
       size: "asfasdfasfasfasdfafaslk;fjasljflasdkjdfad".length
   });

   word1.save(function (err) {
       console.log(err.name);
       console.log(err.message);
       console.log(err.errors.word);
       console.log(err.errors.word.message);
       console.log(err.errors.word.type);
       console.log(err.errors.word.path);
       console.log(err.errors.word.value);
       mongoose.disconnect();
   });

});