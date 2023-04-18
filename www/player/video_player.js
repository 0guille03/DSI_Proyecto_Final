const socket = io();
const vide = document.getElementById("playingVideo");
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
video.volume = video.volume + 1;
});

socket.on("volume_down", function(){
    console.log("volume down");
    video.volume = video.volume - 1;
    });

socket.on("play_video", function(){
    console.log("play");
    video.play;
        });
socket.on("pause_video", function(){
    console.log("stop");
     video.pause;
        });

