const socket = io();

/*socket.on("message_evt", function(message){
  msg.innerHTML = message.msg;
});*/


socket.on("change_html", function(path){
  alert(path.msg);
  window.location.href = path.msg;
  
});

function changeButton(number){
  if (number == '1'){
    document.getElementById("button1").style.backgroundColor = "#6f8e91";
    document.getElementById("button2").style.backgroundColor = "#D6E4E5";
    document.getElementById("button3").style.backgroundColor = "#D6E4E5";
  }
  if (number == '2'){
    document.getElementById("button1").style.backgroundColor = "#D6E4E5";
    document.getElementById("button2").style.backgroundColor = "#6f8e91";
    document.getElementById("button3").style.backgroundColor = "#D6E4E5";
  }
  if (number == '3'){
    document.getElementById("button1").style.backgroundColor = "#D6E4E5";
    document.getElementById("button2").style.backgroundColor = "#D6E4E5";
    document.getElementById("button3").style.backgroundColor = "#6f8e91";
  }
}

