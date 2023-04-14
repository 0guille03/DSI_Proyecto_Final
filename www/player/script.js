const socket = io();

/*socket.on("message_evt", function(message){
  msg.innerHTML = message.msg;
});*/


socket.on("change_html", function(path){
  alert("Request to change window received");
  alert(path.msg);
  window.location.href = path.msg;
  //var path_p = JSON.parse(path);
  //alert(path_p);
});

