const socket = io();

const search_button = document.querySelector("#search_button");
const help_button = document.querySelector("#help_div");
const up_b = document.querySelector("#up_b");
const down_b = document.querySelector("#down_b");
const left_b = document.querySelector("#left_b");
const right_b = document.querySelector("#right_b");
const ok_b = document.querySelector("#ok_b");

/* Change to the searching section */
search_button.addEventListener("click", function() {
  window.location.href = "search.html";
});

/* Change to the help section */
help_button.addEventListener("click", function() {
  window.location.href = "tutorial.html";
});

/* Buttons of the controller */
up_b.addEventListener("click", function() {
  socket.emit("select_changed", { msg: "u" });
});
down_b.addEventListener("click", function() {
  socket.emit("select_changed", { msg: "d" });
});
left_b.addEventListener("click", function() {
  socket.emit("select_changed", { msg: "l" });
});
right_b.addEventListener("click", function() {
  socket.emit("select_changed", { msg: "r" });
});
ok_b.addEventListener("click", function() {
  socket.emit("set_playing");
  window.location.href = "video_player.html";
});

// Function that is executed when the controlled is loaded so that the player loads the main page
function loadPlayer() {
  socket.emit("change_html", { msg: "selector.html" });
}
