const socket = io();

socket.on("set_video_to_play", function(video){
    console.log(video.msg)
    let video_html=document.querySelector("#playingVideo");
    console.log(video_html)
    video_html.src="../video/"+video.msg+".mp4";
    console.log(video_html)
    video_html.play();
});

function getVideo(){
    socket.emit("get_video_to_play");
    console.log("Asking server for video");
}



