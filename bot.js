//Setting up dependices and apis
"use strict";
const fs = require("fs");
//here use the json files obtained through the web scraper
const rawData = fs.readFileSync("graveheart2.json");
const parseData = JSON.parse(rawData);
const Twit = require("twit");
//Enter you Twitter Api info in the config files
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
        tweetGenuis();
    }
    // adds a second line to the tweet if the line is too small
    else if (tweet.length <= 52) {
        while (position !== -1) {
            count++;
            position = curretSong.indexOf("\n", position + 1);
            if (count === line + 1) {
                break;
            }
        }
        let secondLine = curretSong.substring(position, curretSong.indexOf("\n", position + 1));
        //checks if the second line is empty and if so starts the tweetGenius function again
        if (secondLine.replace(/\s/g, "") == "") {

            tweetGenuis();
        }
        else {
            //if second line isnt empty and doesnt contain tags it joins it to the first line
            tweet = tweet.concat(secondLine);
            if (
                tweet === " " ||
                tweet.includes("Verse") === true ||
                tweet.includes("Chorus") === true ||
                tweet.includes("Outro") === true ||
                tweet.length <= 7
            ) {
                tweetGenuis();

            } 
            //returns a 2 connected lines from a song and tweet it
            else {
                return tweet;
            }
        }

    }
    //returns a single line from the song 
    else {
        return tweet;
    }
}


//Creates a tweet from json to tweet
function tweetGenuis() {
    // Grabs a song from the json file
    let curretSong = parseData.songs[Math.floor(Math.random() * parseData.songs.length)].lyrics;
    //Gets a random line from the song selected
    let line = getLine(curretSong);
    // From the random line gets the contents and removes chorus verus outro tags
    let tweet = getTweet(line, curretSong);
    // If variable tweet is valid tweets the tweet
    if (typeof tweet != "undefined") {
        T.post("statuses/update", { status: tweet });
    }
}

function firstLoop() {
    tweetGenuis();
    setInterval(function () {
        tweetGenuis();
        //Loop to be called every hour
    }, 1000 * 60 * 60);
}
//calls the bots
firstLoop();

