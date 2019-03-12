require("dotenv").config();

var keys = require("./keys");

var Spotify = require("node-spotify-api");

var moment = require("moment");

var fs = require("fs");

var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var artisName = function (artist) {
    return artist.name;
};

var searchSpotify = function (title) {
    if (title === undefined) {
        title = "What's my age again";
    }

    spotify.search({
        type: "track",
        query: title

    },
        function (err, data) {
            if (err) {
                console.log("There's an error" + err);
                return;
            }
            var tracks = data.tracks.items;

            for (var i = 0; i < tracks.length; i++) {
                console.log(i);
                console.log("artist:" + tracks[i].artists.map(artisName));
                console.log("song name:" + tracks[i].name);
                console.log("preview song" + tracks[i].preview_url);
                console.log("album" + tracks[i].album.name);
            }

        }
    );

};
var getShows = function (artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function (response) {
        var jsonData = response.data;
        if (!jsonData.length) {
            console.log("Could not find" + artist);
            return;

        }
        console.log("Upcoming Shows for" + artist);
        for (var i = 0; i < jsonData.length; i++) {
            var concert = jsonData[i];
            console.log(concert.venue.city + "," + (concert.venue.region || concert.venue.country) + "at" + concert.venue.name + " " + moment(concert.datetime).format("MM/DD/YYYY")
            );
        }
    });
};

var movieTitle = function (title) {
    if (title === undefined) {
        title = "Mr Nobody";
    }
    var movieUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(movieUrl).then(
        function (response) {
            var jsonData = response.data;
            console.log("title" + jsonData.Title);
            console.log("Year" + jsonData.Year);
            console.log("rated" + jsonData.Rated);
            console.log("Imdb rating" + jsonData.imdbRating);
            console.log("country" + jsonData.Country);
            console.log("language" + jsonData.Language);
            console.log("plot" + jsonData.Plot);
            console.log("Actors" + jsonData.Actors);
            console.log("Rotten Tomatoes Rating" + jsonData.Ratings[1].Value);
        }
    );
};

var readText = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        console.log(data);
        var dataArray = data.split(",");
        if (dataArray.length === 2) {
            pick(dataArray[0], dataArray[1]);
        } else if (dataArray.length === 1) {
            pick(dataArray[0]);
        }
    });
};

var pick = function(caseData,functionData){
    switch (caseData){
        case "concert-this":
        getShows(functionData);
        break;
        case "spotify-this":
        searchSpotify(functionData);
        break;
        case "movie-this":
        movieTitle(functionData);
        break;
        case "read-text":
        readText();
        break;
        default:
        console.log("Liri doesn't know what you're looking for")

    }
};

var run = function(a,b) {
    pick(a,b);

};

run(process.argv[2],process.argv.slice(3).join(" "));






