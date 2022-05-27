const clientId = '';
const clientSecret = '';
const BearerToken = '';

const _getToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 
        'grant_type=client_credentials'
    });
    const data = await result.json();
    console.log(data)
    return data.access_token;
}
const tokenValue = _getToken();

const _getTrack = async (trackEndPoint) => {
  console.log("token " + tokenValue)
  const result = await fetch(`${trackEndPoint}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + await tokenValue,
      'Content-Type': 'application/json',
    }
  });
  console.log(result)
  const data = await result.json();
  return data;
}
const _getListeningToTrack = async () => {
    const result = await fetch('https://api.spotify.com/v1/me/player/currently-playing?market=CZ', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + BearerToken,
            'Content-Type': 'application/json'
        }
    })
    const data = await result.json();
    console.log(data)
    return data;
}

const _getCurrentPlaylist = async (playlistID) => {
    const result = await fetch('https://api.spotify.com/v1/playlists/' + playlistID, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + BearerToken,
            'Content-Type': 'application/json'
        }
    })
    const data = await result.json();
    console.log(data);
    return data;
} 

function callAfterDataRecieved(result){
    // console.log(res.item.artists[0])
    // console.log(res.album.name)
    if(FailedToLoad == true) {
        document.querySelector(".Name").innerHTML = `<b>Song: <br></b><output class="Name" type="text">Failed to load...</output>`
        document.querySelector(".Artist").innerHTML = `<b></b><output class="Artist" type="text">Im probably not listening to anything</output>`
        document.querySelector(".Album").innerHTML = `<b></b><output class="Album" type="text">:(</output>`
        IsPlaying = false;
    }
    document.querySelector(".SongsOutImg").innerHTML = `<a href="${result.item.external_urls.spotify}"><img src="${result.item.album.images[1].url}"></a>`
    document.querySelector(".Name").innerHTML = `<b>Song: <br></b><output class="Name" type="text">${result.item.name}</output>`
    document.querySelector(".Artist").innerHTML = `<b>Artist:   </b><output class="Artist" type="text">${result.item.artists[0].name}</output>`
    document.querySelector(".Album").innerHTML = `<b>Album:   </b><output class="Album" type="text">${result.item.album.name}</output>`
}   
function callAfterPlaylistRecieved(res){
    document.querySelector(".PlaylistCover").innerHTML = `<a href="${res.external_urls.spotify}"><img src="${res.images[0].url}" height="100px"></a>`
    document.querySelector(".PlaylistName").innerHTML = `<b>Playlist Name: <br></b><output class="Name" type="text">${res.name}</output>`
    document.querySelector(".PlaylistOwner").innerHTML = `<b>By: <br></b><output class="Name" type="text">${res.owner.display_name}</output>`
}

// console.log(_getTrack(tokenValue, 'https://api.spotify.com/v1/tracks/1UBQ5GK8JaQjm5VbkBZY66'));

let textInput = document.getElementsByName('linkInput')
// .substring(31, 53)
// console.log(_getTrack(value, 'https://api.spotify.com/v1/tracks/6rqhFgbbKwnb9MLmUQDhG6'))
let output;
// textInput[0].addEventListener('keypress', function(event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     let songLink = textInput[0].value
//     console.log(songLink.substring(31, 53))
//     let data = _getTrack('https://api.spotify.com/v1/tracks/' + songLink.substring(31, 53));
//   data
//     .then(res => {console.log(res); callAfterDataRecieved(res);})
//     .catch((err) => console.log("Error: " + err));
// }});

let IsPlaying = false;

let currentSong = _getListeningToTrack()
currentSong
    .then(res => {
                    callAfterDataRecieved(res);
                    if(res.context != undefined) {
                        let currentPlaylist = _getCurrentPlaylist(res.context.external_urls.spotify.substring(34));
                        currentPlaylist
                        .then(res => {callAfterPlaylistRecieved(res);})
                        .catch((err) => console.log("Error: " + err));
                    }
                    else {
                        document.querySelector(".PlaylistCover").innerHTML = ``
                        document.querySelector(".PlaylistName").innerHTML = ``
                        document.querySelector(".PlaylistOwner").innerHTML = ``
                    }
                    CurrentTime = res.progress_ms
                    SongLength = res.item.duration_ms
                    IsPlaying = res.is_playing
                })
    .catch((err) => {console.log("Error: " + err)

    document.querySelector(".Name").innerHTML = `<b>Song: <br></b><output class="Name" type="text">Failed to load...</output>`
    document.querySelector(".Artist").innerHTML = `<b></b><output class="Artist" type="text">Im probably not listening to anything</output>`
    document.querySelector(".Album").innerHTML = `<b></b><output class="Album" type="text">:(</output>`
    IsPlaying = false;
            });
// let currentPlaylist = _getCurrentPlaylist(res.context.external_urls.spotify.substring(34));
// currentPlaylist
//     .then(res => {console.log(res); callAfterPlaylistRecieved(res);})
//     .catch((err) => console.log("Error: " + err));

let FailedToLoad = false;

setInterval(function(){ 
    let currentSong = _getListeningToTrack()
currentSong
    .then(res => {
                    callAfterDataRecieved(res);
                    if(res.context != undefined) {
                        let currentPlaylist = _getCurrentPlaylist(res.context.external_urls.spotify.substring(34));
                        currentPlaylist
                        .then(res => {callAfterPlaylistRecieved(res);})
                        .catch((err) => console.log("Error: " + err));
                    }
                    else {
                        document.querySelector(".PlaylistCover").innerHTML = ``
                        document.querySelector(".PlaylistName").innerHTML = ``
                        document.querySelector(".PlaylistOwner").innerHTML = ``
                    }
                    CurrentTime = res.progress_ms
                    SongLength = res.item.duration_ms
                    IsPlaying = res.is_playing
                })
    .catch((err) => {
            console.log("Error: " + err);
            FailedToLoad = true;});
}, 5000);
let TimePlayedS = localStorage.getItem("time");

let CurrentTime = 0;
let SongLength = 100000;
setInterval(function(){
    document.querySelector(".ProgressBar").innerHTML = `<progress value="${CurrentTime}" max="${SongLength}"></progress>`;
    if(IsPlaying === true) {    
        CurrentTime += 1000;
        TimePlayedS++;
        document.querySelector(".Status").innerHTML = ``
        }
    else {
        document.querySelector(".Status").innerHTML = `<h5>Currently stopped</h5>`
    }
    document.querySelector(".TimeListened").innerHTML = `<h4>${toHHMMSS(TimePlayedS)}</h4>`;
    localStorage.setItem("time", TimePlayedS)
   }, 1000)


function   toHHMMSS(time) {
    var hours   = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    var seconds = time - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours + ':' + minutes + ':' + seconds;
}
    

