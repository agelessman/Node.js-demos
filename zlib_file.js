/**
 * Created by M.C on 2017/6/20.
 */

const zlib = require("zlib");
const gzip = zlib.createGzip();
const fs = require("fs");

const infile = fs.createReadStream("zlib_file.js");
const outfile = fs.createWriteStream("zlib_file.gz");

infile.pipe(gzip).pipe(outfile);

setTimeout(function () {
    const gunzip = zlib.createGunzip({flush: zlib.Z_FULL_FLUSH});
    const infile = fs.createReadStream("zlib_file.gz");
    const outfile = fs.createWriteStream("zlib_file_unzipped");
    infile.pipe(gunzip).pipe(outfile);
}, 3000);
