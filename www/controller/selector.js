const socket = io();
var search = document.querySelector("#search_button");

search.addEventListener("click", function() {
  //socket.emit("message_evt", {msg: text});
  window.location.href = "search.html";
});

function loadPlayer(){
  socket.emit("change_html", {msg: "player/selector.html"});
}