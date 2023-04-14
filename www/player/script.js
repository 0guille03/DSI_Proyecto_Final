const socket = io();

/*socket.on("message_evt", function(message){
  msg.innerHTML = message.msg;
});*/


socket.on("change_html", function(path){
  var path_p = JSON.parse(path);
  alert("Request to change window received");
  alert(path_p);
  alert(path.msg);
  window.location.href = path.msg;
});

