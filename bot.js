"use strict";
const fs = require("fs");
const rawData = fs.readFileSync("graveheart.json");
const parseData = JSON.parse(rawData);
let x = parseData.songs[0].lyrics;
//grabs the line of lyrics from json to send to tweet
function getLine() {
  let count = 0;
  let position = x.indexOf("\n");
  while (position !== -1) {
    count++;
    position = x.indexOf("\n", position + 1);
  }
  let amountOfLines = count++;
  // makes sure line grabbed from the json actually exists
  let randomNum = 0;
  while (randomNum >= amountOfLines - 1 || randomNum === 0) {
    randomNum = Math.floor(Math.random() * 100);
  }
  return randomNum;
}
function getTweet(line) {
  let position = x.indexOf("\n");
  let count = 0;
  while (position !== -1) {
    count++;
    position = x.indexOf("\n", position + 1);
    if (count === line) {
      break;
    }
  }
  let tweet = x.substring(position, x.indexOf("\n", position + 1));
  //finds new line if selected doesnt match paramters
  if (
    tweet === " " ||
    tweet.includes("Verse") === true ||
    tweet.includes("Chorus") === true ||
    tweet.length <= 7
  ) {
    console.log("false");
  } else {
    return tweet;
  }
}
function tweetGenuis() {
  let line = getLine();
  let tweet = getTweet(line);
  console.log(tweet);
}
setInterval(function() {
  tweetGenuis();
}, 500);

// const Twit = require("twit");

// const config = require("./config");
// const T = new Twit(config);

// T.post("statuses/update", { status: tweet });
