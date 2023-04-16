const socket = io();

socket.on("set_video_to_play", function(video){
    let video_html=document.querySelector("#playingVideo").src="../video/"+video.msg+".mp4";
    video_html.play();
});

function getVideo(){
    socket.emit("get_video_to_play");
    console.log("Asking server for video");
}



