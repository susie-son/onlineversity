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
      createRoom({memberCount: 1, name: user.name + ":" + document.querySelector("#roomName").value, tags: document.querySelector("#tags").value}, course);
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
      let joinBtnContainer = document.createElement("div");
      let joinBtn = document.createElement("a");
      joinBtn.id = document.querySelector("#roomName").value;
      joinBtnContainer.appendChild(joinBtn);
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

    // var joinBtnContainer = document.querySelector("#btnJoinContainer");
    // joinBtnContainer.onclick = function() {
    //   getRooms(course);
    //   for (let i=0; i < list.length; i++) {
    //     let temp = list[i].name.split(":");
    //     if (temp[1] == joinBtnContainer.children[0].id) {
    //     joinRoom(course, "LMW_Q_4Fhy11V8gu1H1");
    //     } 
    //   }
    // };

    function joinRoom(course, roomID){
        $.get('/joinRoom', {course: course, roomID: roomID}, function (data, textStatus, jqXHR){
            //success
            window.location.href = 'http://'+ window.location.host + '/room/'+id;
        });
    }

    function getRooms(course){
        $.get('/getRooms', {course: course}, function (data, textStatus, jqXHR){
            list = data;
        });
    }

    function createRoom(details, course){
        //details is an object containing memberCount, name, tags object
        $.get('/createRoom', {course: course, data: details}, function (id, textStatus, jqXHR){
            if(!id) alert("Failed to create group");
            else window.location.href = 'http://'+ window.location.host + '/room/'+id;
        });
    }
  });
  
},{}]},{},[1]);



