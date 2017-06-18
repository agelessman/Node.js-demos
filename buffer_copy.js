/**
 * Created by machao on 17/6/18.
 */

const alphabet = new Buffer("abcdefghijklmnopqrstuvwxyz");
console.log(alphabet.toString());

// Copy full buffer
const blank = new Buffer(26);
blank.fill();
console.log("Blank: " + blank.toString());
alphabet.copy(blank);
console.log("Blank: " + blank.toString());

// Copy part of buffer
const dashes = new Buffer(26);
dashes.fill('-');
console.log("Dashes: " + dashes.toString());
alphabet.copy(dashes, 10 , 10, 10);
console.log("Dashes: " + dashes.toString());

// Copy to and from direct indexes of buffers
const dots = new Buffer("--------------------------");
dots.fill('.');
console.log("Dots: " + dots.toString());
var i = 0;
for (i = 0; i < dots.length; i++) {
    if (i % 2) {
        dots[i] = alphabet[i];
    }
}
console.log("Dots: " + dots.toString());