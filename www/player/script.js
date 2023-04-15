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