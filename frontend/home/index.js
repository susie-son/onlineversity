//document.getElementById('createUser').addEventListener("click", createUser);
// document.getElementById('btn2').addEventListener("click", addPersonalCourse);
// document.getElementById('btn3').addEventListener("click", signIn);
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    var user = {};
    setTimeout(function (){
        $.getJSON('/getUser', function (data, textStatus, jqXHR){
            user = data;
            console.log(user);
            if(!user) window.location.href = 'http://'+ window.location.host + '/signIn';
        });
    }, 1000);

},{}]},{},[1]);





// function signIn(){
//     signInAuth("sijiasong2008@hotmail.com", "123456", function(user){});
// }

// function addSchoolCourse(){
//     addSchoolCourseDB("McMaster University", "ECON 101");
// }

// function addPersonalCourse(){
//     addPersonalCourseDB("school", "ECON 101");
// }
