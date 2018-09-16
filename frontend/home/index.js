'use strict';
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    var user = {};
    var list = {};
    var course = "cpsc";
    $(document).ready(function () {
        $.get('/getUser', function (data, textStatus, jqXHR){
            user = data;
            console.log(user);
            if(!user) window.location.href = 'http://'+ window.location.host + '/signIn';
        });

        document.querySelector('#cpsc').onclick = function() {
          course = "cpsc";
        };
        document.querySelector('#math').onclick = function() {
          course = "math";
        };
        document.querySelector('#english').onclick = function() {
          course = "english";
        };
        document.querySelector('#physics').onclick = function() {
          course = "physics";
        };
        document.querySelector('#chemistry').onclick = function() {
          course = "chemistry";
        };
        document.querySelector('#biology').onclick = function() {
          course = "biology";
        };

        var addRoomBtn = document.querySelector('#addRoomBtn');
      addRoomBtn.addEventListener("click", function() {
          //?
    });

    var createRoomBtn = document.querySelector("#createRoomBtn");
    createRoomBtn.addEventListener("click", function() {
      createRoom({memberCount: 1, name: user.name, tags: document.querySelector("#tags").value}, course);
      // create a new room card
      let card = document.createElement("div");
      card.className = "card";
      card.id = "cards";
      let cardbody = document.createElement("div");
      cardbody.className = "card-body";
      let cardtitle = document.createElement("h5");
      let cardtitle_text = document.createTextNode(document.querySelector("#roomName").value);
      cardtitle.appendChild(cardtitle_text);
      let cardtext = document.createElement("p");
      let cardtext_text = document.createTextNode("Members: 1");
      cardtext.appendChild(cardtext_text);
      let joinBtn = document.createElement("a");
      joinBtn.className = "btn btn-primary";
      let joinBtnText = document.createTextNode("Go to Room");
      joinBtn.appendChild(joinBtnText);
      joinBtn.href = "#";
      cardbody.appendChild(cardtitle);
      cardbody.appendChild(cardtext);
      cardbody.appendChild(joinBtn);
      card.appendChild(cardbody);
      let row = document.createElement("div");
      row.className = "row";
      row.appendChild(card);
      document.querySelector("#cards-col").appendChild(row);
    });

    function joinRoom(course, roomID){
        $.get('/joinRooms', {course: course, roomID: roomID}, function (data, textStatus, jqXHR){
            //success
            window.location.href = 'http://'+ window.location.host + '/room/'+id;
        });
    }

    function getRooms(course){
        $.get('/getRooms', {course: course}, function (data, textStatus, jqXHR){
            list = data;
            console.log(list);
        });
    }

    function createRoom(details, course){
        //details is an object containing memberCount, name, tags object
        $.get('/createRoom', {course: course, data: details}, function (id, textStatus, jqXHR){
            if(!id) alert("Failed to create group");
            else window.location.href = 'http://'+ window.location.host + '/room/'+id;
        });
    }
  })
    var Video = require('twilio-video');
    
    var activeRoom;
    var previewTracks;
    var identity;
    var roomName;

    var roomID;
    var course;
    
    // Attach the Tracks to the DOM.
    function attachTracks(tracks, container) {
      tracks.forEach(function(track) {
        container.appendChild(track.attach());
      });
    }
    
    // Attach the Participant's Tracks to the DOM.
    function attachParticipantTracks(participant, container) {
      var tracks = Array.from(participant.tracks.values());
      attachTracks(tracks, container);
    }
    
    // Detach the Tracks from the DOM.
    function detachTracks(tracks) {
      tracks.forEach(function(track) {
        track.detach().forEach(function(detachedElement) {
          detachedElement.remove();
        });
      });
    }
    
    // Detach the Participant's Tracks from the DOM.
    function detachParticipantTracks(participant) {
      var tracks = Array.from(participant.tracks.values());
      detachTracks(tracks);
    }
    
    // When we are about to transition away from this page, disconnect
    // from the room, if joined.
    window.addEventListener('beforeunload', leaveRoomIfJoined);
    
    // Obtain a token from the server in order to connect to the Room.
    $.getJSON('/token', function(data) {
      identity = data.identity;
      document.getElementById('room-controls').style.display = 'block';
      
      document.getElementById('joinRm1').onclick = function() {
        roomName = "Room 1"


    
        log("Joining room '" + roomName + "'...");
        var connectOptions = {
          name: roomName,
          logLevel: 'debug'
        };
    
        if (previewTracks) {
          connectOptions.tracks = previewTracks;
        };

        
    
        // Join the Room with the token from the server and the
        // LocalParticipant's Tracks.
        Video.connect(data.token, connectOptions).then(roomJoined, function(error) {
          log('Could not connect to Twilio: ' + error.message);
        });
      };
    
      // Bind button to leave Room.
      document.getElementById('button-leave').onclick = function() {
        log('Leaving room...');
        activeRoom.disconnect();
      };
    });
    
    // Successfully connected!
    function roomJoined(room) {
      window.room = activeRoom = room;
    
      log("Joined as '" + identity + "'");
      document.getElementById('button-join').style.display = 'none';
      document.getElementById('button-leave').style.display = 'inline';
    
      // Attach LocalParticipant's Tracks, if not already attached.
      var previewContainer = document.getElementById('local-media');
      if (!previewContainer.querySelector('video')) {
        attachParticipantTracks(room.localParticipant, previewContainer);
      }
    
      // Attach the Tracks of the Room's Participants.
      room.participants.forEach(function(participant) {
        log("Already in Room: '" + participant.identity + "'");
        var previewContainer = document.getElementById('remote-media');
        attachParticipantTracks(participant, previewContainer);
      });
    
      // When a Participant joins the Room, log the event.
      room.on('participantConnected', function(participant) {
        log("Joining: '" + participant.identity + "'");
      });
    
      // When a Participant adds a Track, attach it to the DOM.
      room.on('trackAdded', function(track, participant) {
        log(participant.identity + " added track: " + track.kind);
        var previewContainer = document.getElementById('remote-media');
        attachTracks([track], previewContainer);
      });
    
      // When a Participant removes a Track, detach it from the DOM.
      room.on('trackRemoved', function(track, participant) {
        log(participant.identity + " removed track: " + track.kind);
        detachTracks([track]);
      });
    
      // When a Participant leaves the Room, detach its Tracks.
      room.on('participantDisconnected', function(participant) {
        log("Participant '" + participant.identity + "' left the room");
        detachParticipantTracks(participant);
      });
    
      // Once the LocalParticipant leaves the room, detach the Tracks
      // of all Participants, including that of the LocalParticipant.
      room.on('disconnected', function() {
        log('Left');
        if (previewTracks) {
          previewTracks.forEach(function(track) {
            track.stop();
          });
          previewTracks = null;
        }
        detachParticipantTracks(room.localParticipant);
        room.participants.forEach(detachParticipantTracks);
        activeRoom = null;
        document.getElementById('button-join').style.display = 'inline';
        document.getElementById('button-leave').style.display = 'none';
      });
    }
    
    // Preview LocalParticipant's Tracks.
    document.getElementById('button-preview').onclick = function() {
      var localTracksPromise = previewTracks
        ? Promise.resolve(previewTracks)
        : Video.createLocalTracks();
    
      localTracksPromise.then(function(tracks) {
        window.previewTracks = previewTracks = tracks;
        var previewContainer = document.getElementById('local-media');
        if (!previewContainer.querySelector('video')) {
          attachTracks(tracks, previewContainer);
        }
      }, function(error) {
        console.error('Unable to access local media', error);
        log('Unable to access Camera and Microphone');
      });
    };
    
    // Activity log.
    function log(message) {
      var logDiv = document.getElementById('log');
      logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
      logDiv.scrollTop = logDiv.scrollHeight;
    }
    
    // Leave Room.
    function leaveRoomIfJoined() {
      if (activeRoom) {
        activeRoom.disconnect();
      }
    }
    

},{}]},{},[1]);



