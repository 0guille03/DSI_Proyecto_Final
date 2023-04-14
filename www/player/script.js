const socket = io();
const msg = document.querySelector("#msg");

socket.on("message_evt", function(message){
  msg.innerHTML = message.msg;
});


socket.on("change_html", function(path){
  alert("Request to change window received")
  window.location.href = path;
});

