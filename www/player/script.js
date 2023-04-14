const socket = io();
const msg = document.querySelector("#msg");

socket.on("message_evt", function(message){
  msg.innerHTML = message.msg;
});
/*
socket.on("change_html", function(path){
  window.location.href = path;
});*/

