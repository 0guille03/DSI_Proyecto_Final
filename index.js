const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/', express.static(path.join(__dirname, 'www')));

var playing_video = null;

io.on('connection', (socket) => {
  console.log(`socket connected ${socket.id}`);

  /* Change screen */
  socket.on("change_html", function(html_path) {
    console.log("Device on received by" + socket.id);
    socket.broadcast.emit("change_html", html_path);
  });
  socket.on("exit_search", function() {
    console.log("Exited from search");
    socket.broadcast.emit("exit_search");
  });
  socket.on("exit_video_player", function() {
    console.log("Exited from video player");
    socket.broadcast.emit("exit_video_player");
  });

  /* Send search result */
  socket.on("speech_result", function(result) {
    console.log("Speech result received: " + result.msg);
    socket.broadcast.emit("speech_result", result.msg);

  });

  /* Video controll section */
  socket.on("select_changed", function(option) {
    console.log("Controller select move: " + option.msg);
    socket.broadcast.emit("select_changed", option);
  });

  /* Select video option */
  socket.on("set_playing", function() {
    console.log("Video has been selected");
    socket.broadcast.emit("set_playing");
  });

  /* Fill playing video variable with current video */
  socket.on("video_to_play", function(video) {
    console.log("Video selected is: " + video.msg);
    playing_video = video.msg;
    socket.broadcast.emit("start_player");
  });
  socket.on("get_video_to_play", function() {
    console.log("Video is sent: " + playing_video);
    //socket.broadcast.emit("vid_play");
    socket.emit("set_video_to_play", { msg: playing_video });
    console.log("sent");
  });

  /* Video controll section */
  socket.on("play_pause_video", function() {
    console.log("Play/Pause the video");
    socket.broadcast.emit("play_pause_video");
  });
  socket.on("volume_up", function() {
    console.log("Vol up the video");
    socket.broadcast.emit("volume_up");
  });
  socket.on("volume_down", function() {
    console.log("Vol down the video");
    socket.broadcast.emit("volume_down");
  });
  socket.on("go_back", function(secs) {
    console.log("Rewind the video: " + secs.msg);
    socket.broadcast.emit("go_back", secs);
  });
  socket.on("go_forward", function(secs) {
    console.log("Foward the video: " + secs.msg);
    socket.broadcast.emit("go_forward", secs);
  });
});


server.listen(3000, () => {
  console.log("Server listening...");
});
