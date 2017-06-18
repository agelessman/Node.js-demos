/**
 * Created by machao on 17/6/10.
 */

function  start() {
    console.log("Request handler 'start' was called.")
}

function upload() {
    console.log("Request handler 'upload' was called.")
}

exports.start = start;
exports.upload = upload;