const socket = io();
var videos_cod = {1:"all_too_well",
                  2:"",
                  3:"",
                  4:"",
                  5:"",
                  6:""}
var video_layout = [1,2,3,4,5,6];
var selected = 1;

socket.on("change_html", function(path) {
  window.location.href = path.msg;
});

/* Movement received from the server */
socket.on("select_changed", function(option) {
  let option = option.msg;
  let new_sel;
  if (option === "u"){
    if (selected - 3 > 0) new_sel = selected - 3;
  }
  if (option === "d"){
    if (selected + 3 < video_layout.length + 1) new_sel = selected + 3;
  }
  if (option === "l"){
    if (selected - 1 > 0) new_sel = selected - 1;
  }
  if (option === "r"){
    if (selected + 1 < video_layout.length + 1) new_sel = selected + 1;
  }
  if (new_sel) {
    selected = new_sel;
    let new_html = "";   

    video_layout.forEach( function (item) {
      new_html += index + "<div class='grid-song' id='" + item 
            + "'><img " 
            + ( selected === index ? "id='selected'" : "" ) 
            + " src='../img/" + videos_cod[item]
            +".jpg' height='220px'><br>All Too Well</div>"; 
    });

    document.getElementById("grid-container").innerHTML = new_html;
 
    
  }
});


//----------------- Esto tiene sentido aqui? ------------------
socket.on("volume_up", function(){
  document.getElementById("demo").innerHTML = "Último gesto detectado: subir volumen";
});
socket.on("volume_down", function(){
  document.getElementById("demo").innerHTML = "Último gesto detectado: bajar volumen";
});
socket.on("go_back", function(){
  document.getElementById("demo").innerHTML = "Último gesto detectado: ir hacia atrás";
});
socket.on("go_forward", function(){
  document.getElementById("demo").innerHTML = "Último gesto detectado: ir hacia delante";
});
socket.on("toggle_overlay", function(){
  document.getElementById("demo").innerHTML = "Último gesto detectado: quitar/poner overlay";
});
//-----------------------------------------------------------

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

