const socket = io();

const search_button = document.querySelector("#search_button");

search_button.addEventListener("click", function() {
  window.location.href = "search.html";
});

function loadPlayer(){
  socket.emit("change_html", {msg: "selector.html"});
}