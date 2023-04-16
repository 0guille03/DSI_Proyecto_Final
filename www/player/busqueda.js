const socket = io();

socket.on("speech_result", function(result) {
  document.getElementById("search-query").innerHTML=result;
});