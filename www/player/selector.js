const socket = io();


socket.on("change_html", function(path) {
  window.location.href = path.msg;
});

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

