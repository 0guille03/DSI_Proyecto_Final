const socket = io();
const video = document.querySelector("#playingVideo");

/* Go back to the selection screen */
socket.on("change_html", function(path) {
  window.location.href = path.msg;
});

/* On page load asks server for current playing video */
function getVideo() {
  socket.emit("get_video_to_play");
  console.log("Asking server for video");
}

/* Receives video name from the server */
socket.on("set_video_to_play", function(video) {
  console.log("reached");
  console.log(video.msg);
  let video_html = document.querySelector("#playingVideo");
  video_html.src = "../video/" + video.msg + ".mp4";
  video_html.play();
});

// Actions for gestures that are executed when the message from the server is received
socket.on("volume_up", function() {
  console.log("volume up");
  if (video.volume <= 0.9) {
    video.volume += 0.1;
  }
});

/* Change video status depending on comand received */
socket.on("volume_down", function() {
  console.log("volume down");
  if (video.volume >= 0.1) {
    video.volume -= 0.1;
  }
});
socket.on("play_pause_video", function() {
  console.log("play/pause");
  if (video.paused) {
    video.play();
  }
  else {
    video.pause();
  }
});
socket.on("go_back", function(secs) {
  console.log("Rewind the video: " + secs.msg);
  video.currentTime -= secs.msg;
});
socket.on("go_forward", function(secs) {
  console.log("Forward the video: " + secs.msg);
  video.currentTime += secs.msg;
});

