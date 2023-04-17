const socket = io();
var videos_cod = {1:"all_too_well",
                  2:"22",
                  3:"video_placeholder",
                  4:"video_placeholder",
                  5:"video_placeholder",
                  6:"video_placeholder"}
var videos_name = {1:"All Too Well",
                  2:"22",
                  3:"Video 3",
                  4:"Video 4",
                  5:"Video 5",
                  6:"Video 6"}
var video_layout = [1,2,3,4,5,6];
var current_layout = [1,2,3,4,5,6];
var selected = 1;
var searched_word="";


socket.on("speech_result", function(result) {
  searched_word=result;
  if (result === "") result="...";
  document.getElementById("search-query").innerHTML=result;
  updateHtml();
});

function updateHtml(){
  current_layout=[]
  let new_html = ""; 

  video_layout.forEach(function (item) {
    if (videos_name[item].toLowerCase.includes(searched_word.toLowerCase)){
      new_html +="<div class='grid-song' id='" + item 
            + "'><img " 
            + ( selected === item ? "id='selected'" : "" ) 
            + " src='../img/" + videos_cod[item]
            +".jpg' height='220px'><br><br>" + videos_name[item] + "</div>"; 

      current_layout.push()
    }  
  });
  document.getElementById("videos_div").innerHTML = new_html;
}


