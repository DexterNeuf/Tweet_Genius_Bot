// console.log("hello");
"use strict";
var JSONItems = [];
$.getJSON("graveheart.json", function(data) {
  JSONItems = data;
  console.log(JSONItems.songs[0].lyrics);
});
// const Twit = require("twit");

// const config = require("./config");
// const T = new Twit(config);

// T.post("statuses/update", { status: "hello world!!" });
