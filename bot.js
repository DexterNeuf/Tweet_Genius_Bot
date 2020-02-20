"use strict";
const fs = require('fs');
let rawData = fs.readFileSync('graveheart.json');
let parseData = JSON.parse(rawData);
let x = parseData.songs[0].lyrics
let count = 0
let position = x.indexOf('\n')
while (position !== -1) {
    count++
    position = x.indexOf('\n', position + 1);
    if (count === 7) {
        break;
    }
}
// console.log(x.indexOf('\n', position + 1));

console.log(x.substring(position, x.indexOf('\n', position + 1)));
// const Twit = require("twit");

// const config = require("./config");
// const T = new Twit(config);

// T.post("statuses/update", { status: "hello w0rld!!" });
