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

  socket.on("change_html", function(html_path){
    console.log("Device on received by" + socket.id );
    socket.broadcast.emit("change_html", html_path);
  
  });
  
});


server.listen(3000, () => {
  console.log("Server listening...");
});
