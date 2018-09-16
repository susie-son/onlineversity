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
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
var express = require('express');
var randomName = require('./randomname');

// Create Express webapp.
var app = express();

// Set up the path for the quickstart.
app.use(express.static(path.join(__dirname, '../frontend')))

var roomPath = path.join(__dirname, '../frontend/video');
app.use('/room*', express.static(roomPath));

/**
 * Default to the SignIn.
 */
app.get('/', function(req, res) {
  Firebase.getUser(res, true);
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

app.get('/joinRoom', function(req, res){
  Firebase.joinRoom(req.query.roomID, req.query.course, res);
});

//data is an object containing memberCount, name, tags object
app.get('/createRoom', function(req, res){
  Firebase.createRoom(req.query.data, req.query.course, res);
});

app.get('/leaveRoom', function(req, res){
  Firebase.leaveRoom(req.query.roomID, req.query.course, res);
});

app.get('/getRooms', function(req, res){
  Firebase.getRooms(req.query.course, res);
});

/**
 * Generate an Access Token for a chat application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 */
app.get('/token', function(request, response) {
  var identity = randomName();

  const accSid = "AC871eea5ad13d7424858b1452afc76c33";
  const apiKey = "SK8036d617287a88c112dfe4d9a1d0b632";
  const apiSec = "4Ihz35U1kJAySKfoNtVHDyZRlsl3vXow";

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  var token = new AccessToken(
    accSid,
    apiKey,
    apiSec
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


