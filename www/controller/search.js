const socket = io();
const back_button = document.querySelector("#back_button");
const enter_button = document.querySelector("#enter_button");
const input = document.querySelector("#vname");

/* Change back to the controller  */
back_button.addEventListener("click", function() {
  socket.emit("exit_search");
  window.location.href = "selector.html";
});

/* When search is done show controller to pick from selected  */
enter_button.addEventListener("click", function() {
  window.location.href = "selector.html";
});

/* Change the player to the search screen  */
function loadSearch(){
  socket.emit("change_html", {msg: "search.html"});
}

/* Detects any change in the input and sends it to the player */
$(document).ready(function(){
  $("#vname").on("input", function(){
    sendTexttoPlayer();
  });
});

/* When there is a change in the input box, sends info to player, for displaying purposes */
function sendTexttoPlayer(){
  const search_text = input.value;
  socket.emit("speech_result", { msg: search_text });

}


// ------------------------- API de voz --------------------------------------------------------------- 
var SpeechRecognition =
  window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

const search_button = document.querySelector("#search_button");
/* Add event listener to start speech recognition module */
search_button.addEventListener("click", function(e) {
  recognition.start();
  document.getElementById('search_button').id = 'search_button_p';
  socket.emit("change_html", {msg: "busqueda.html"});
});

/* When the module recognices a speech it is shown in the input box */
recognition.onresult = function(event) {
  console.log("result");
  console.log(event);
  const result = event.results[0][0].transcript;
  console.log(`Resultado: ${result}.`);
  console.log(`Confianza: ${event.results[0][0].confidence}`);
  input.value = result;
  sendTexttoPlayer();
};

/* When speech has ended recognition stops */
recognition.onspeechend = function() {
  console.log("speechend");
  recognition.stop();
};

/* When recognition end the animation ends */
recognition.onend = function() {
  console.log("end");
  document.getElementById('search_button_p').id = 'search_button';
  const search_button = document.querySelector("#search_button");
  search_button.addEventListener("click", function(e) {
    recognition.start();
    document.getElementById('search_button').id = 'search_button_p';
  });
}

/* If an error ocurs show in console */
recognition.onerror = function(event) {
  console.log(`Error occurred in recognition: ${event.error}`);
};
