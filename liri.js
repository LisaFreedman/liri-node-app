require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


// Grab all of the command line arguments from Node.
var nodeArg = process.argv;
// storeCommandsToFile(nodeArg); // Log the arguments to a file

switch (nodeArg[2]) {

    // * This will show your last 20 tweets and when they were created at in your terminal/bash window.
    case 'my-tweets':
        retrieveMyTweets();
        break;

    /* This will show the following information about the song in your terminal/bash window
         * Artist(s)
         * The song's name
         * The album that the song is from
         * A preview link of the song from Spotify
         * If no song is provided then your program will default to "The Sign" by Ace of Base. */
    case 'spotify-this-song':
        getInfoFromSpotify(nodeArg[3], nodeArg[4]);
        break;

    /* This will output the following information to your terminal/bash window:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie. 
        * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' */
    /* You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`. */
    case 'movie-this':
        getMovieInfo(nodeArg[3]);
        break;

    case 'do-what-it-says':
        actAccordingToTextFile();
        break;
}


// Retrieve my last 20 tweets.
function retrieveMyTweets() {

    var client = new Twitter(keys.twitter);

    var params = { screen_name: 'Jorjess', count: 20 };
    client.get('statuses/home_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet => {
                console.log('[' + tweet.created_at + '] ' + tweet.text);
            });
        }
        else
            console.log('Error:' + error);
    });
}

function getInfoFromSpotify(songTitle, numSongs) {

    if (songTitle == undefined)
        songTitle = 'The Sign Ace of Base';

    if (numSongs == undefined)
        numSongs = 3;

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify
        .search({ type: 'track', query: songTitle, limit: numSongs })
        .then(function (response) {

            var songInfo = response.tracks.items;
            // Return a maximum of 3 songs, if the user doesn't specify a number
            for (var i = 0; i < numSongs; i++) {
                if (songInfo[i] != undefined) {

                    var results = {
                        'Artist(s): ': songInfo[i].artists[0].name,
                        'Song: ': songInfo[i].name,
                        'Album: ': songInfo[i].album.name,
                        'Preview URL: ': songInfo[i].preview_url
                    }

                    // Print the results to the console
                    for (infoItem in results) {
                        if (results[infoItem] != undefined)
                            console.log(infoItem + results[infoItem]);
                    }
                    console.log('');
                }
            }
        })
        .catch(function (err) {
            console.log('Error:' + err);
        });
}


function getMovieInfo(movieName) {

    if (movieName == undefined)
        movieName = 'Mr Nobody';

    request("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {

        if (!error && response.statusCode == 200) {

            //console.log(response);
            var movieObject = JSON.parse(body);

            var results = {
                'Title: ': movieObject.Title,
                'Year Released: ': movieObject.Year,
                'IMDB Rating: ': movieObject.imdbRating,
                'Rotten Tomatoes Rating: ': movieObject.tomatoRating,
                'Countries Where Produced: ': movieObject.Country,
                'Language: ': movieObject.Language,
                'Plot: ': movieObject.Plot,
                'Actors: ': movieObject.Actors
            }

            // Print the results to the console
            for (infoItem in results) {
                if (results[infoItem] != undefined)
                    console.log(infoItem + results[infoItem]);
            }
            console.log('');

        }
        else {
            console.log('Error:' + error);
        }
    });
};


function actAccordingToTextFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            getInfoFromSpotify(data.split(",")[1]);
        } else {
            console.log('Error:' + error);
        }
    });
};

