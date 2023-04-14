const socket = io();
const button = document.querySelector("button");
const input = document.querySelector("input");
const msg = document.querySelector("#msg");

button.addEventListener("click", function(e) {
  const text = input.value;
  //enviarselo al servidor
  socket.emit("message_evt", {msg: text});
});


socket.on("message_evt", function(message){
  msg.innerHTML = message.msg;
});

function loadPlayer(){
  console.log("i am at the beggining of load player function");
  socket.broadcast.emit("device_on", {msg: "/player/index.html"});
}