require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var command = process.argv[2];
var searchTerm = process.argv[3];


// Run function based on command
if (command === "concert-this"){
    concertSearch();
} else if (command === "spotify-this-song") {
    spotifySearch();
} else if (command === "movie-this") {
    movieSearch();
} else if (command === "do-what-it-says") {
    doTheThing();
}


// Concert search
function concertSearch() {
    let artist = searchTerm;
    let url = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");
    // Return name of venue, venue location, and date of event (use Moment to format as MM/DD/YY)
    request(url, function(error, response, body){
        if (!error && response.statusCode === 200) {
            let data = JSON.parse(body)[0];

// Removed indentation for formatting purposes when info is displayed in console
console.log(`
=============================
Venue: ${data.venue.name}
Location: ${data.venue.city}, ${data.venue.region}
Date: ${moment(data.datetime).format("MM/DD/YYYY")}
=============================
`)

        }
    });
}


// Spotify search
function spotifySearch() {
    let songName = searchTerm;

    // If the user doesn't specify a song, return information for The Sign by Ace of Base
    if (songName == null) {
        songName = "The Sign Ace of Base";
    }
    // Return artist, song name, preview link of song from Spotify, album that the song is from
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {

// Removed indentation for formatting purposes when info is displayed in console
console.log(`
=============================
Artist: ${data.tracks.items[0].album.artists[0].name}
Album: ${data.tracks.items[0].album.name}
Song Title: ${data.tracks.items[0].name}
Preview Link: ${data.tracks.items[0].preview_url}
=============================
`)

        }
    });
}


// Movie search
function movieSearch() {
    let movieName = searchTerm;

    // If the user does not specify a movie, return results for the film "Mr. Nobody"
    if (movieName == undefined) {
        movieName = "Mr. Nobody";
    }

    let queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function(error, response, body){
    if (!error && response.statusCode === 200) {
      
// Removed indentation for formatting purposes when info is displayed in console
console.log(`
=============================
Title: ${JSON.parse(body).Title}
Release Year: ${JSON.parse(body).Year}
IMDB Rating: ${JSON.parse(body).imdbRating}
RottenTomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
Country: ${JSON.parse(body).Country}
Language: ${JSON.parse(body).Language}
Plot Summary: ${JSON.parse(body).Plot}
Actors: ${JSON.parse(body).Actors}
=============================
`)
    }
    });
}


// 4th Search Term
function doTheThing() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // Split the data into an array at the comma
        var dataArr = data.split(",");
        
        command = dataArr[0];
        searchTerm = dataArr[1];

        spotifySearch();
    });

}