const socket = io();
const msg = document.querySelector("#msg");

socket.on("message_evt", function(message){
  msg.innerHTML = message.msg;
});

