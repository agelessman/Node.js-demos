/**
 * Created by machao on 17/6/18.
 */

// 使用slice后，和copy最大的不同就是他会影响原来的对象
const numbers = new Buffer("123456789");
console.log(numbers.toString());

const slice = numbers.slice(3, 6);
console.log(slice.toString());

slice[0] = '#'.charCodeAt(0);
slice[slice.length - 1] = '#'.charCodeAt(0);
console.log(slice.toString());

console.log(numbers.toString());