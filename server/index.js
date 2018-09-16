'use strict';

/**
 * Load Twilio configuration from .env config file - the following environment
 * variables should be set:
 * process.env.TWILIO_ACCOUNT_SID
 * process.env.TWILIO_API_KEY
 * process.env.TWILIO_API_SECRET
 */
require('dotenv').load();
var Firebase = require('./firebase');

var http = require('http');
var path = require('path');
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var express = require('express');
var randomName = require('./randomname');

// Create Express webapp.
var app = express();

// Set up the path for the quickstart.
var signInPath = path.join(__dirname, '../frontend/signIn');
app.use('/signIn', express.static(signInPath));

var signUpPath = path.join(__dirname, '../frontend/signUp');
app.use('/signUp', express.static(signUpPath));

var homePath = path.join(__dirname, '../frontend/home');
app.use('/home', express.static(homePath));

/**
 * Default to the SignIn.
 */
app.get('/', function(req, res) {
  console.log(Firebase);
  Firebase.getUser(res);
});

app.post('/createUser', function(req, res){
  Firebase.createUser(JSON.parse(req.query.user), res);
});

app.get('/logIn', function(req, res){
  Firebase.signIn(req.query.email, req.query.password, res);
});

app.get('/getUser', function(req, res){
  Firebase.getUser(res);
})

/**
 * Generate an Access Token for a chat application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 */
app.get('/token', function(request, response) {
  var identity = randomName();

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  var token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  var grant = new VideoGrant();
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response.
  response.send({
    identity: identity,
    token: token.toJwt()
  });
});

// Create http server and run it.
var server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('Express server running on *:' + port);
});


