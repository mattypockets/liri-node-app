require("dotenv").config();

var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchTerm = process.argv[3];


// Concert search
if (command == "concert-this") {
    let artist = searchTerm;
    let url = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");
    // Return name of venue, venue location, and date of event (use Moment to format as MM/DD/YY)
}

// Spotify search
if (command == "spotify-this-song") {
    let songName = searchTerm;
    // Return artist, song name, preview link of song from Spotify, album that the song is from
}

// Movie search
if (command == "movie-this") {
    let movieName = searchTerm;
    // Return movie title, release year, IMDB rating, RT rating, Country where it was produced, language of movie, movie plot summary, actors in the movie
    let queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryURL), function(error, response, body){
    if (!error && response.statusCode === 200) {
        console.log(`
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
    }
}

// 4th Search Term
if (command == "do-what-it-says") {

}