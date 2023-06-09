const socket = io();
/* Variables to apply search  */
var videos_cod = {1:"all_too_well",
                  2:"22",
                  3:"the_great_war",
                  4:"lavender_haze",
                  5:"me",
                  6:"out_of_the_woods"
                }
var videos_name = {1:"All Too Well",
                  2:"22",
                  3:"The Great War",
                  4:"Lavender Haze",
                  5:"ME!",
                  6:"Out Of The Woods"
                }

// Coding to match the current layout to the real number in the videos_... arrays
var coding = {1:1,
              2:2,
              3:3,
              4:4,
              5:5,
              6:6}
var video_layout = [1,2,3,4,5,6];
var current_layout = [1,2,3,4,5,6]; // Layout that changes depending on search
var selected = 1;
var searched_word="";

/* Exit the search module */
socket.on("exit_search", function() {
  window.location.href = "selector.html";
});

/* Update header when search term is entered */
socket.on("speech_result", function(result) {
  searched_word=result;
  if (result === "") result="...";
  document.getElementById("search-query").innerHTML=result;
  updateHtml();
});

/* Select Playing video */
socket.on("set_playing", function() {
  socket.emit("video_to_play", {msg: videos_cod[coding[selected]]});
  window.location.href = "video_player.html";
});

/* When there has been a change in selected or a term has been inputed */
function updateHtml(){
  current_layout=[]
  let new_html = ""; 
  console.log(coding);
  coding = {};
  console.log(coding);
  selected = 1;

  video_layout.forEach(function (item) {
    if (videos_name[item].toLowerCase().includes(searched_word.toLowerCase())){
      current_layout.push(current_layout.length+1);
      coding[current_layout.length]=item;
      console.log(coding);
      
      new_html +="<div class='grid-song' id='" + item 
            + "'><img " 
            + ( current_layout.length === 1 ? "id='selected'" : "" ) 
            + " src='../img/" + videos_cod[item]
            +".jpg' height='220px'><br><br>" + videos_name[item] + "</div>"; 
    }  
  });
  if (current_layout.length === 0){
    new_html="No hay videos por ese nombre."
  }
  document.getElementById("videos_div").innerHTML = new_html;
}

/* Movement received from the server */
socket.on("select_changed", function(option) {
  console.log("select_changed recived" + option.msg)
  let opt = option.msg;
  let new_sel;
  if (opt === "u"){
    if (selected - 3 > 0) new_sel = selected - 3;
  }
  if (opt === "d"){
    if (selected + 3 < current_layout.length + 1) new_sel = selected + 3;
  }
  if (opt === "l"){
    if (selected - 1 > 0) new_sel = selected - 1;
  }
  if (opt === "r"){
    if (selected + 1 < current_layout.length + 1) new_sel = selected + 1;
  }
  if (new_sel) {
    selected = new_sel;
    let new_html = "";   
    
    current_layout.forEach( function (item) {
      new_html +="<div class='grid-song' id='" + item 
            + "'><img " 
            + ( selected === item ? "id='selected'" : "" ) 
            + " src='../img/" + videos_cod[coding[item]]
            +".jpg' height='220px'><br><br>" + videos_name[coding[item]] + "</div>"; 
    });

    document.getElementById("videos_div").innerHTML = new_html;
 
    
  }
});
