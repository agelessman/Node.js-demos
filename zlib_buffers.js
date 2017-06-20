/**
 * Created by M.C on 2017/6/20.
 */

const zlib = require("zlib");

const input = "...................text................";

// deflate
zlib.deflate(input, function (err, buffer) {
    if (!err) {
        console.log("deflate (%s) ", buffer.length, buffer.toString('base64'));

        // inflate
        zlib.inflate(buffer, function (err, buffer) {
           if (!err) {
               console.log("inflate (%s) ", buffer.length, buffer.toString());
           }
        });

        // unzip
        zlib.unzip(buffer, function (err, buffer) {
            if (!err) {
                console.log("unzip (%s) ", buffer.length, buffer.toString());
            }
        });
    }
});

// deflateRaw
zlib.deflateRaw(input, function (err, buffer) {
    if (!err) {
        console.log("deflateRaw (%s) ", buffer.length, buffer.toString('base64'));

        // inflateRaw
        zlib.inflateRaw(buffer, function (err, buffer) {
            if (!err) {
                console.log("inflateRaw (%s) ", buffer.length, buffer.toString());
            }
        });
    }
});

// gzip
zlib.gzip(input, function (err, buffer) {
    if (!err) {
        console.log("gzip (%s) ", buffer.length, buffer.toString('base64'));

        // gunzip
        zlib.gunzip(buffer, function (err, buffer) {
            if (!err) {
                console.log("gunzip (%s) ", buffer.length, buffer.toString());
            }
        });

        // unzip
        zlib.unzip(buffer, function (err, buffer) {
            if (!err) {
                console.log("unzip (%s) ", buffer.length, buffer.toString());
            }
        });
    }
});

/**
 deflate (17)  eJzT08MAJakVJehiAJ+2CBA=
 deflateRaw (11)  09PDACWpFSXoYgA=
 gzip (29)  H4sIAAAAAAAAE9PTwwAlqRUl6GIA6S6IGCcAAAA=
 inflate (39)  ...................text................
 unzip (39)  ...................text................
 inflateRaw (39)  ...................text................
 gunzip (39)  ...................text................
 unzip (39)  ...................text................
 */