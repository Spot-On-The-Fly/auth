var spotifyAPI = require('spotify-web-api-node');

var settings = {
  clientId : "dfb1c2f32c37415d9b440190e1778f10",
  clientSecret: "dc7e95a2f4b547d3a84fe9d5847d7fd2",
  redirectUri: "http%3A%2F%2Fgoogle.com"
};

var spot = new spotifyAPI(settings);

//get the business token
exports.host_token() = function(){
  spot.clientCredentialsGrant().then(function(data){
    console.log(data.body['access_token']);
  });
}
