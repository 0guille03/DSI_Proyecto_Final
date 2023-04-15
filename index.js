const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/', express.static(path.join(__dirname, 'www')));

let visSocket;

io.on('connection', (socket) => {
  console.log(`socket connected ${socket.id}`);

  socket.on("VIS_CONNECTED", () => {
    visSocket = socket;
  });

  socket.on("message_evt", function(message){
    console.log(socket.id, message);
    socket.broadcast.emit("message_evt", message);
  });

  socket.on("device_on", function(html_path){
    console.log("Device on received by" + socket.id );
    socket.broadcast.emit("change_html", html_path);
  
  });

  socket.on("volume_up", function(){
    socket.broadcast.emit("volume_up");
  });
  
  socket.on("volume_down", function(){
    socket.broadcast.emit("volume_down");
  });
  
  socket.on("go_back", function(){
    socket.broadcast.emit("go_back");
  });
  
  socket.on("go_forward", function(){
    socket.broadcast.emit("go_forward");
  });
  
  socket.on("toggle_overlay", function(){
    socket.broadcast.emit("toggle_overlay");
  });
  
});


server.listen(3000, () => {
  console.log("Server listening...");
});
