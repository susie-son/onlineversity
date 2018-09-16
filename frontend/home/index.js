
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    var user = {};
    $(document).ready(function () {
        $.get('/getUser', function (data, textStatus, jqXHR){
            user = data;
            console.log(user);
            if(!user) window.location.href = 'http://'+ window.location.host + '/signIn';
        });
    });

    function joinGroup(course, roomID){
        $.get('/joinGroup', {course: course, roomID: roomID}, function (data, textStatus, jqXHR){
            //success
        });
    }

    function getGroups(course){
        $.get('/getUser', {course: course}, function (data, textStatus, jqXHR){
            list = data;
            console.log(list);
        });
    }

    function createGroup(details, course){
        //details is an object containing memberCount, name, tags object
        $.post('/createGroup', {course: course, data: details}, function (id, textStatus, jqXHR){
            if(!id) alert("Failed to create group");
            else window.location.href = 'http://'+ window.location.host + '/room/'+id;
        });
    }

},{}]},{},[1]);


