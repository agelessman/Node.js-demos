/**
 * Created by machao on 17/6/18.
 */

// Create a buffer object with size of 256
const buf256 = new Buffer(256);

// Writes 0 to every byte in the buffer
buf256.fill(0);
console.log(buf256.toString());

// Writes 'add some text' string to buffer, it takes 13 bytes
buf256.write("add some text");
console.log(buf256.toString());

// Writes 9 number of bytes from the 'more text', startting at the 9 index inside the buffer
buf256.write("more text", 9, 9);
console.log(buf256.toString());

// Replaces the data at index 18 with the '63' specified
buf256[18] = 63;
console.log(buf256.toString());