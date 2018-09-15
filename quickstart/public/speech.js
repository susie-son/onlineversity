var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US'; 
recognition.interimResults = false;
recognition.maxAlternatives = 5; 

var text = document.querySelector('#log');

recognition.start(); 

recognition.onstart = function() { 
    console.log('Voice recognition activated. Try speaking into the microphone.'); 
} 

recognition.onspeechend = function() { 
    console.log('You were quiet for a while so voice recognition turned itself off.'); 
} 

recognition.onerror = function(event) { 
    if(event.error == 'no-speech') { 
        console.log('No speech was detected. Try again.'); 
    }; 
} 

recognition.onresult = function(event) { 
    var current = event.resultIndex; 
    var transcript = event.results[current][0].transcript; 
    console.log(transcript, "               ", event); 
    text.textContent += transcript;
}

recognition.onaudioend = function(){
    console.log("audio end");
}

recognition.onend = function(){
    console.log("end");
    recognition.start(); 
}
recognition.onsoundend = function(){
    console.log("sound end");
}