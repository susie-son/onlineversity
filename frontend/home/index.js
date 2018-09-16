'use strict';
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    var user = {};
    var list = {};
    var rooms = {};
    var course = "";
    $(document).ready(function () {
        $.get('/getUser', function (data, textStatus, jqXHR){
            user = data;
            console.log(user);
            if(!user) window.location.href = 'http://'+ window.location.host + '/signIn';
            else {
              //case for no courses (add course)
              course = Object.keys(user.courses)[0];
              if(course) getRooms(course);

              var list = document.getElementById('courseList');
              for(var c in user.courses){
                var newButton = document.createElement('button');
                newButton.appendChild(document.createTextNode(c)); 
                newButton.className = 'btn-dark btn-lg btn-block';
                newButton.style = "background: #7c7c7c";
                newButton.addEventListener('click', function(event){
                  console.log("click listener", event.target.innerHTML);
                  getRooms(event.target.innerHTML);
                });
                console.log(newButton);
                console.log(document.getElementById('courseList'));
                list.appendChild(newButton);
              }
            }
        });



        // document.querySelector('#cpsc').onclick = function() {
        //   course = "cpsc";
        // };
        // document.querySelector('#math').onclick = function() {
        //   course = "math";
        // };
        // document.querySelector('#english').onclick = function() {
        //   course = "english";
        // };
        // document.querySelector('#physics').onclick = function() {
        //   course = "physics";
        // };
        // document.querySelector('#chemistry').onclick = function() {
        //   course = "chemistry";
        // };
        // document.querySelector('#biology').onclick = function() {
        //   course = "biology";
        // };

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

    function joinRoom( roomID){
        $.get('/joinRoom', {course: course, roomID: roomID}, function (id, textStatus, jqXHR){
            if(id==roomID) window.location.href = 'http://'+ window.location.host + '/room/'+course+'/'+id;
            else alert('Failed to join room');
        });
    }

    function getRooms(course){
        $.get('/getRooms', {course: course}, function (data, textStatus, jqXHR){
            list = data;
            console.log(list);

            var roomslist = document.getElementById('cards-col');
            for(var id in list){
              var h5 = document.createElement('h5');
              h5.appendChild(document.createTextNode(list[id].name));
              h5.className = 'card-title';
              var p = document.createElement('p');
              p.appendChild(document.createTextNode('Members: '+ list[id].memberCount));
              p.className = 'card-text';

              var p2 = document.createElement('p');
              p2.appendChild(document.createTextNode('Tags: '+ list[id].tags));
              p2.className = 'card-text';

              var a = document.createElement('a');
              a.appendChild(document.createTextNode('Go to Room'));
              a.href = '#';
              a.className = 'btn btn-outline-light';
              a.id = id;
              a.addEventListener('click', function(event){
                console.log("click listener", event.target.id);
                joinRoom(event.target.id);
              });

              var divBody = document.createElement('div');
              divBody.className = 'card-body';
              divBody.appendChild(h5);
              divBody.appendChild(p);
              divBody.appendChild(p2);
              divBody.appendChild(a);
              
              var card = document.createElement('div');
              card.className = 'card bg-dark text-white';
              card.id = 'cards';
              card.appendChild(divBody);

              var nRow = document.createElement('div');
              nRow.className = 'row';
              nRow.appendChild(card);
              roomslist.appendChild(nRow);
            }
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



