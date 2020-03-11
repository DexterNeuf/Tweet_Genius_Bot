# Tweet-Genius-Bot

Tweet-Genius-Bot is a [Node.js](https://nodejs.org/) application that tweets lyrics from an artist continuously(the defualt artist included is [Graveheart](https://twitter.com/GRAVEHEARTSOUND)). The artist is generated throught the help of [LyricsGenius](https://github.com/johnwmillr/LyricsGenius) generated JSON file.
 

### Tech
Tweet-Genius-Bot uses some open-source projects to work properly:


* [node.js](https://nodejs.org/) - server tool to bot to run
* [LyricsGenius](https://github.com/johnwmillr/LyricsGenius) -generates the JSON for T-G-B to work with
* [Twitter App API](https://developer.twitter.com/en/apps) - For tools to post tweets


### Installation

Tweet-Genius-Bot requires [Node.js](https://nodejs.org/) v4+ to run. 

Install the dependencies and devDependencies and start the server.

```sh
$ npm install 
$ npm start
```

A Twitter developer account with a valid app is also required.Once your app request is accepted get the keys and tokens from the appropriately named sub menu, and copy and paste them into their respective fields in the config.js file.


```sh
    consumer_key: 'enter your key',
    consumer_secret: 'enter your key',
    access_token: 'enter your token',
    access_token_secret: 'enter your token'
```

If you want to use another artist other then the one provided, use the [LyricsGenius](https://github.com/johnwmillr/LyricsGenius) tool to create and new json file and replace it with the default one.

```sh
const rawData = fs.readFileSync("(your-artist-here).json");
```

### Todos
 - Refactor to Object-Orianted-Programming Standards
