const express = require('express');
const app = express();
const server = require("http").Server(app);
var device = require('express-device');

const io = require("socket.io")(server);

app.use(device.capture());

io.on("connection", function(socket){
  console.log("nuevo cliente");

  socket.on("message_evt", function(message){
    console.log(socket.id, message);
    socket.broadcast.emit("message_evt", message);
  });
  
});

app.get('/', function(req, res) {
  console.log(req.device.type.toUpperCase())
  if (req.device.type.toUpperCase() === "PHONE"){
    res.render("www/controller/index.html",{
      my_title: "Controller",
      items: '',
      message: ''
    });

  }
  else{ 
    res.render("www/player/index.html",{
      my_title: "Player",
      items: '',
      message: ''
    });
  }

});

server.listen(3000, () => console.log('server started'));
