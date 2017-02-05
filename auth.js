var spotifyAPI = require('spotify-web-api-node');
var express = require('express');

var AUTH_PORT = 6969;
var AUTH_DIRECTORY = '/auth';
var ADMIN_DIRECTORY = '/admin';
var REDIRECT_DIRECTORY = '/confirm';

var HOST_ID = '1161086985';

var app = express();

var settings = {
  clientId : "cab4b5b99f96426e9dfaf76d268f3871",
  clientSecret: "3000734987d6434a963489d900c65641",
  redirectUri: "http%3A%2F%2F129.31.218.236%3A6969%2Fauth%2Fconfirm"
};

var spot = new spotifyAPI(settings);

var tokens = [];

exports.auth_user = function(){
  app.listen(AUTH_PORT, function(){
    console.log('Authentication link setup on http://localhost:'+AUTH_PORT+AUTH_DIRECTORY);
  });

  app.get(AUTH_DIRECTORY, function(req,res){
    var url = spot.createAuthorizeURL(['user-read-private', 'user-read-email'], "shitty-state");
    res.redirect(url);
  });

  app.get(AUTH_DIRECTORY + REDIRECT_DIRECTORY, function(req,res){
    var code = req.query.code;
    spot.authorizationCodeGrant(code)
    .then(function(data) {

      // Set the access token on the API object to use it in later calls
      spot.setAccessToken(data.body['access_token']);
      spot.setRefreshToken(data.body['refresh_token']);

      spot.getMe().then(function(user){
        tokens.push({userID:user.body.id, token: data.body['access_token']});
        console.log(tokens);
      });


      res.send("Thanks for Authenticating!");
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  });
}

exports.get_tokens() = function(){
  return tokens();
}

//get the business token
exports.get_host = function(){
  var token;
  for(i = 0; i < tokens.length; i++){
    if(tokens[i].userID == HOST_ID){
      token = tokens[i];
    }
  }
  return token;
}
