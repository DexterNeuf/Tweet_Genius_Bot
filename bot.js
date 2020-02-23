"use strict";
const fs = require('fs');
const rawData = fs.readFileSync('graveheart.json');
const parseData = JSON.parse(rawData);
let x = parseData.songs[0].lyrics;
let count = 0;

let position = x.indexOf('\n');
while (position !== -1) {
    count++
    position = x.indexOf('\n', position + 1);
}
let amountOfLines = count++;
console.log(amountOfLines);

console.log(Math.floor(Math.random() * 100))

// function getLyrics(line)
// count = 0;  
// while (position !== -1) {
//     count++
//     position = x.indexOf('\n', position + 1);
//     if (count === randomNum) {
//         break;
//     }
// }
// console.log(x.substring(position, x.indexOf('\n', position + 1)));
// const Twit = require("twit");

// const config = require("./config");
// const T = new Twit(config);

// T.post("statuses/update", { status: "hello w0rld!!" });
