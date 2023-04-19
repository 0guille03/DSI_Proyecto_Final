const socket = io();
const video = document.getElementById("playingVideo");

function getVideo(){
    socket.emit("get_video_to_play");
    console.log("Asking server for video");
}

socket.on("change_html", function(path) {
    window.location.href = path.msg;
});

socket.on("exit_video_player", function() {
    window.location.href = "selector.html";
  });

socket.on("set_video_to_play", function(video){
    console.log("reached");
    console.log(video.msg);
    let video_html=document.querySelector("#playingVideo");
    console.log(video_html);
    video_html.src="../video/"+video.msg+".mp4";
    console.log(video_html)
    video_html.play();
});

socket.on("volume_up", function(){
    console.log("volume up");
    if (video.volume < 1) {
        video.volume += 0.1;
      }
});

socket.on("volume_down", function(){
    console.log("volume down");
    if (video.volume > 0) {
        video.volume -= 0.1;
      }
});

socket.on("play_pause_video", function(){
    console.log("play/pause");
    if (video.paused) {
        video.play();
    } 
    else{
        video.pause();
    }
});

socket.on("go_back", function(secs) {
    console.log("Rewind the video: "+secs.msg);
    video.currentTime -= secs.msg;
});

socket.on("go_forward", function(secs) {
    console.log("Foward the video: "+secs.msg);
    video.currentTime += secs.msg;
});

