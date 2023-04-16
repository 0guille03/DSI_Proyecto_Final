const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/', express.static(path.join(__dirname, 'www')));

let visSocket;

io.on('connection', (socket) => {
  console.log(`socket connected ${socket.id}`);

  /* Change screen message */
  socket.on("change_html", function(html_path) {
    console.log("Device on received by" + socket.id);
    socket.broadcast.emit("change_html", html_path);
  });

  /* Send search result */
  socket.on("speech_result", function(result) {
    console.log("Speech result received: " + result.msg);
    socket.broadcast.emit("speech_result", result.msg);

  });

  /* Video controll section */
  socket.on("select_changed", function(option) {
    socket.broadcast.emit("select_changed", option);
  });


  /* Video controll section */
  socket.on("play_video", function() {
    socket.broadcast.emit("play_video");
  });
  socket.on("pause_video", function() {
    socket.broadcast.emit("pause_video");
  });
  socket.on("volume_up", function() {
    socket.broadcast.emit("volume_up");
  });
  socket.on("volume_down", function() {
    socket.broadcast.emit("volume_down");
  });
  socket.on("go_back", function(secs) {
    socket.broadcast.emit("go_back", secs);
  });
  socket.on("go_forward", function(secs) {
    socket.broadcast.emit("go_forward", secs);
  });
  socket.on("toggle_overlay", function() {
    socket.broadcast.emit("toggle_overlay");
  });
});


server.listen(3000, () => {
  console.log("Server listening...");
});
