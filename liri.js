require("dotenv").config();

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);

function callings(command, reset){

    switch(command){
        case "concert-this";
    
    }
    
}

function concert(a) {

    if(!a){
        console.log("error")
    }
request("https://rest.bandsintown.com/artists/" + a + "/events?app_id=codingbootcamp", function(error, response, body){

if(!error && response.statusCode === 200){
var music = JSON.parse(body);

for(i = 0; i< music.length; i++) {

music[i].venue.name 
music[i].venue.latitude.longitude   
music[i].datetime

}






})
}
