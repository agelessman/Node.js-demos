/**
 * Created by machao on 17/6/18.
 */

const af = new Buffer("African Swallow?");
const eu = new Buffer("European Swallow?");

const question = new Buffer("Air Speed Velocity of an ");

console.log(Buffer.concat([question, af]).toString());
console.log(Buffer.concat([question, eu]).toString());