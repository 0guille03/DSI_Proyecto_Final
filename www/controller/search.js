const socket = io();
const back_button = document.querySelector("#back_button");
const input = document.querySelector("#vname");

back_button.addEventListener("click", function() {
  window.location.href = "selector.html";
});

/*button.addEventListener("click", function(e) {
  const text = input.value;
  //enviarselo al servidor
  socket.emit("message_evt", {msg: text});
});*/

// ------------------------- API de voz --------------------------------------------------------------- 
var SpeechRecognition =
  window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList =
  window.SpeechGrammarList || webkitSpeechGrammarList;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

// public <color> = rojo | verde | amarillo;
/*const colors = { rojo: "#ff0000", verde: "#00ff00", amarillo: "#ffff00", azul: "#0000ff" };
const grammar =
  "#JSGF V1.0; 
  grammar colors; 
  public <color> = " + Object.keys(colors).join(" | ") +
  " ;";*/

/*speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "es-ES";
recognition.interimResults = false;
recognition.maxAlternatives = 1;*/

const search_button = document.querySelector("#search_button");
search_button.addEventListener("click", function(e) {
  recognition.start();
  document.getElementById('search_button').id = 'search_button_p';
  socket.emit("change_html", {msg: "busqueda.html"});
});

recognition.onresult = function(event) {
  console.log("result");
  console.log(event);
  const result = event.results[0][0].transcript;
  console.log(`Resultado: ${result}.`);
  console.log(`Confianza: ${event.results[0][0].confidence}`);

  input.value = result;
  socket.emit("speech_result", { msg: result });
};

recognition.onspeechend = function() {
  console.log("speechend");
  recognition.stop();
};

/* Para habilitar reconocimiento continuo */

recognition.onend = function() {
  console.log("end");
  document.getElementById('search_button_p').id = 'search_button';
  /*recognition.start();*/
  const search_button = document.querySelector("#search_button");
  search_button.addEventListener("click", function(e) {
    recognition.start();
    document.getElementById('search_button').id = 'search_button_p';
  });
}

/*
recognition.onnomatch = function(event) {
  document.body.style.backgroundColor = "#000000";
  console.log("No he reconocido el color");
  recognition.stop();
};*/

recognition.onerror = function(event) {
  console.log(`Error occurred in recognition: ${event.error}`);
};
