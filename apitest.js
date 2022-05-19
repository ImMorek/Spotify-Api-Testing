console.log('3ViTZxW9satrTEMRu1GCLV'.length)
console.log('0zO8ctW0UiuOefR87OeJOZ'.length)
console.log('4KFY4EEv9CN6ivrzD6vEvg'.length)
console.log('2mlGPkAx4kwF8Df0GlScsC'.length)

const clientId = '7be683a241064ee2902d15f548a54efa';
const clientSecret = '585a2a00a8e647479280267370bcc169';

const _getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token',  {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    console.log(data)
    return data.access_token;
}
const tokenValue = _getToken();

const _getTrack = async (trackEndPoint) => {
    console.log(trackEndPoint)
    console.log("token " + tokenValue)
    const result = await fetch(`${trackEndPoint}`, {
        method: 'GET', 
        headers: { 'Authorization' : 'Bearer ' + tokenValue,
        'Content-Type' : 'application/json'}
    });
    console.log(result)
    const data = await result.json();
    return data;
}


// console.log(_getTrack(tokenValue, 'https://api.spotify.com/v1/tracks/1UBQ5GK8JaQjm5VbkBZY66'));

let textInput = document.getElementsByName('linkInput')
// .substring(31, 53)
// console.log(_getTrack(value, 'https://api.spotify.com/v1/tracks/6rqhFgbbKwnb9MLmUQDhG6'))

textInput[0].addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    let songLink = textInput[0].value
    console.log(songLink.substring(31, 53))
    console.log(_getTrack('https://api.spotify.com/v1/tracks/' + songLink.substring(31, 53)))
    }
});

// x-www-form-urlencoded
