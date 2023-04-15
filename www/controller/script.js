const socket = io();
const button = document.querySelector("button");
const input = document.querySelector("input");
const msg = document.querySelector("#msg");
var last_tap = 0;

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
  socket.emit("device_on", {msg: "player/index.html"});
}

function doubleTap() {
  var now = new Date().getTime();
  var timesince = now - last_tap;
  if((timesince < 600) && (timesince > 0)){
    socket.emit("toggle_overlay");
  }
  else{
    socket.emit("volume_up")
  }
  last_tap = new Date().getTime();
}

const main = document.querySelector("#main");

main.addEventListener("touchstart", doubleTap);
