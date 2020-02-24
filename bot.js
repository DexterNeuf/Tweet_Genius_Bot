"use strict";
const fs = require("fs");
const rawData = fs.readFileSync("graveheart2.json");
const parseData = JSON.parse(rawData);
const Twit = require("twit");
const config = require("./config");
const T = new Twit(config);

//grabs the line of lyrics from json to send to tweet
function getLine(curretSong) {
    let count = 0;
    let position = curretSong.indexOf("\n");
    while (position !== -1) {
        count++;
        position = curretSong.indexOf("\n", position + 1);
    }
    let amountOfLines = count++;
    // makes sure line grabbed from the json actually exists
    let randomNum = 0;
    while (randomNum >= amountOfLines - 1 || randomNum === 0) {
        randomNum = Math.floor(Math.random() * 100);
    }
    return randomNum;
}


function getTweet(line, curretSong) {
    let position = curretSong.indexOf("\n");
    let count = 0;
    while (position !== -1) {
        count++;
        position = curretSong.indexOf("\n", position + 1);
        if (count === line) {
            break;
        }
    }
    let tweet = curretSong.substring(position, curretSong.indexOf("\n", position + 1));
    //finds new line if selected doesnt match paramters
    if (
        tweet === " " ||
        tweet.includes("Verse") === true ||
        tweet.includes("Chorus") === true ||
        tweet.includes("Outro") === true ||
        tweet.length <= 7
    ) {
        tweetGenuis()
    }
    else if (tweet.length <= 52) {
        while (position !== -1) {
            count++;
            position = curretSong.indexOf("\n", position + 1);
            if (count === line + 1) {
                break;
            }
        }
        let secondLine = curretSong.substring(position, curretSong.indexOf("\n", position + 1));

        if (secondLine.replace(/\s/g, "") == "") {

            tweetGenuis();
        }
        else {
            tweet = tweet.concat(secondLine);
            if (
                tweet === " " ||
                tweet.includes("Verse") === true ||
                tweet.includes("Chorus") === true ||
                tweet.includes("Outro") === true ||
                tweet.length <= 7
            ) {
                tweetGenuis();

            } else {
                return tweet;
            }
        }

    }
    else {
        return tweet;
    }
}
function tweetGenuis() {
    let curretSong = parseData.songs[Math.floor(Math.random() * parseData.songs.length)].lyrics;
    let line = getLine(curretSong);
    let tweet = getTweet(line, curretSong);
    if (typeof tweet != "undefined") {
        T.post("statuses/update", { status: tweet });
    }
}

function firstLoop() {
    tweetGenuis();
    setInterval(function () {
        tweetGenuis();
    }, 1000 * 60 * 60);
}

firstLoop();

