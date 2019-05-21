require("dotenv").config();
var keys = require("./keys.js");
//var Spotify = require("node-spotify-api")
//var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
var fs = require("fs")

var commands = process.argv[2];
var artist = process.argv[3];
var songName = process.argv[3];
var movieName = process.argv[3];
var whatItSays = process.argv[3];


switch(commands){
    case "concert-this":
    concertThis(artist);
    break;
     
    case "spotify-this-song":
    SpotifyThisSong(songName);
    break;

    case "movie-this":
    MovieThis(movieName);
    break;

    case "do-what-it-says":
    DoWhatItSays();
    break;

    default:
    console.log("You have entered an invalid command")
    console.log("Please select from a command below: ")
    console.log("concert-this\ spotify-this-song\ movie-this\ do-what-it-says\ ")
}

function concertThis(artist){
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function(response){
      console.log(artist)
      for (let i = 0; i < response.data.length; i++) {   
      console.log([i+1])
      console.log("==============================================");       
      console.log("Event Venue: " + response.data[i].venue.name)
      console.log("Event City: " + response.data[i].venue.city)
      console.log("Event Date: " + moment(response.data[i].datetime).format('L'))
      }
  })
  .catch(function(err){
      if(err.response){
        console.log("---------------Data---------------");

        console.log(error.response.data);
  
        console.log("---------------Status---------------");
  
        console.log(error.response.status);
  
        console.log("---------------Status---------------");
  
        console.log(error.response.headers);
      }
      else if(err.request){

        console.log(err.request)

      }else {

        // Something happened in setting up the request that triggered an Error
  
        console.log("Error", error.message);
  
      }
  
      console.log(error.config);
  });
}

function SpotifyThisSong(songName){
if(songName === undefined){songName = "The Sign Ace of Base"}
spotify.search({ type: 'track', query: songName })
.then(function(response){
    console.log(songName)
    for (let i = 0; i < response.tracks.items.length; i++) {  
        console.log([i+1])
        console.log("==============================================");       
        console.log("Artist: " + response.tracks.items[i].artists[0].name)
        console.log("Event City: " + response.tracks.items[i].name)
        console.log("Artist: " + response.tracks.items[i].album.name)
        console.log("Event City: " + response.tracks.items[i].preview_url)
     }
})
.catch(function(err){
    if(err.response){
      console.log("---------------Data---------------");

      console.log(error.response.data);

      console.log("---------------Status---------------");

      console.log(error.response.status);

      console.log("---------------Status---------------");

      console.log(error.response.headers);
    }
    else if(err.request){

      console.log(err.request)

    }else {

      // Something happened in setting up the request that triggered an Error

      console.log("Error", error.message);

    }

    console.log(error.config);
});
}

function MovieThis(movieName){
   if(movieName === undefined){movieName = "Mr. Nobody"}
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
    .then(function(response){
        console.log("==============================================");   
        console.log(response.data.Title)
        console.log(response.data.Year)
        console.log(response.data.Rated)
        console.log(response.data.Ratings[1].Value)
        console.log(response.data.Country)
        console.log(response.data.Language)
        console.log(response.data.Plot)
        console.log(response.data.Actors)
        console.log("==============================================");   
    })
    .catch(function(err){
        if(err.response){
          console.log("---------------Data---------------");
  
          console.log(error.response.data);
    
          console.log("---------------Status---------------");
    
          console.log(error.response.status);
    
          console.log("---------------Status---------------");
    
          console.log(error.response.headers);
        }
        else if(err.request){
  
          console.log(err.request)
  
        }else {
  
          // Something happened in setting up the request that triggered an Error
    
          console.log("Error", error.message);
    
        }
    
        console.log(error.config);
    });

}


function DoWhatItSays(){
    fs.readFile("random.txt","utf8",function(err, data){
        if(err){return console.log(err)}
        songName = data.split(",")
        console.log(songName)
    spotify.search({ type: 'track', query: songName[1] })
    .then(function(response){
      
        for (let i = 0; i < response.tracks.items.length; i++) {  
            console.log([i+1])
            console.log("==============================================");       
            console.log("Artist: " + response.tracks.items[i].artists[0].name)
            console.log("Event City: " + response.tracks.items[i].name)
            console.log("Artist: " + response.tracks.items[i].album.name)
            console.log("Event City: " + response.tracks.items[i].preview_url)
         }
    })
    })
}