const socket = io();
/* Variables to contain video info  */
var videos_cod = {1:"all_too_well",
                  2:"22",
                  3:"the_great_war",
                  4:"lavender_haze",
                  5:"me",
                  6:"out_of_the_woods"}
var videos_name = {1:"All Too Well",
                  2:"22",
                  3:"The Great War",
                  4:"Lavender Haze",
                  5:"ME!",
                  6:"Out Of The Woods"}
var video_layout = [1,2,3,4,5,6];
var selected = 1;

socket.on("change_html", function(path) {
  window.location.href = path.msg;
});

/* Movement received from the server */
socket.on("select_changed", function(option) {
  console.log("select_changed recived" + option.msg)
  let opt = option.msg;
  let new_sel;
  if (opt === "u"){
    if (selected - 3 > 0) new_sel = selected - 3;
  }
  if (opt === "d"){
    if (selected + 3 < video_layout.length + 1) new_sel = selected + 3;
  }
  if (opt === "l"){
    if (selected - 1 > 0) new_sel = selected - 1;
  }
  if (opt === "r"){
    if (selected + 1 < video_layout.length + 1) new_sel = selected + 1;
  }
  if (new_sel) {
    selected = new_sel;
    let new_html = "";   

    video_layout.forEach( function (item) {
      new_html +="<div class='grid-song' id='" + item 
            + "'><img " 
            + ( selected === item ? "id='selected'" : "" ) 
            + " src='../img/" + videos_cod[item]
            +".jpg' height='220px'><br><br>" + videos_name[item] + "</div>"; 
    });

    document.getElementById("videos_div").innerHTML = new_html;
 
    
  }
});

/* Select Playing video */
socket.on("set_playing", function() {
  socket.emit("video_to_play", {msg: videos_cod[selected]});
  window.location.href = "video_player.html";
});

function changeButton(number){
  if (number == '1'){
    document.getElementById("button1").style.backgroundColor = "#6f8e91";
    document.getElementById("button2").style.backgroundColor = "#D6E4E5";
    document.getElementById("button3").style.backgroundColor = "#D6E4E5";
  }
  if (number == '2'){
    document.getElementById("button1").style.backgroundColor = "#D6E4E5";
    document.getElementById("button2").style.backgroundColor = "#6f8e91";
    document.getElementById("button3").style.backgroundColor = "#D6E4E5";
  }
  if (number == '3'){
    document.getElementById("button1").style.backgroundColor = "#D6E4E5";
    document.getElementById("button2").style.backgroundColor = "#D6E4E5";
    document.getElementById("button3").style.backgroundColor = "#6f8e91";
  }
}

