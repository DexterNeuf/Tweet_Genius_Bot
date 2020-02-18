console.log("hello");

const Twit = require('twit');

const config = require('./config');
const T = new Twit(config);

T.post('statuses/update', { status: 'hello world!' })