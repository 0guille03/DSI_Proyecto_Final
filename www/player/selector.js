const socket = io();

/*socket.on("message_evt", function(message){
  msg.innerHTML = message.msg;
});*/


socket.on("change_html", function(path){
  alert(path.msg);
  window.location.href = path.msg;
  
});

