const socket = io();

const search_button = document.querySelector("#search_button");

search_button.addEventListener("touchend", function() {
  window.location.href = "search.html";
});

function loadPlayer(){
  socket.emit("change_html", {msg: "player/selector.html"});
}