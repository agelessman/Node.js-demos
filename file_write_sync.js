/**
 * Created by M.C on 2017/6/20.
 */

const fs = require("fs");

const viggieTray = ["carrots", "celery", "olives"];
const fd = fs.openSync("veggie.txt", "w");

while (viggieTray.length) {
    const veggie = viggieTray.pop() + " ";
    const bytes = fs.writeSync(fd, veggie, null, null);
    console.log("Wrote %s %dbytes", veggie, bytes);
}

fs.closeSync(fd);