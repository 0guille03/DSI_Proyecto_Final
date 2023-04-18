const socket = io();

function getVideo(){
    socket.emit("get_video_to_play");
    console.log("Asking server for video");
}

socket.on("change_html", function(path) {
    window.location.href = path.msg;
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

