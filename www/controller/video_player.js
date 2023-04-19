const video = document.querySelector('.myVideo');
const socket = io();
const back_button = document.querySelector("#back_button");

back_button.addEventListener("click", function() {
  socket.emit("exit_video_player");
  window.location.href = "selector.html";
});

function togglePlay() {
  var playImg = document.querySelector('.play-pause img.play');
  var pauseImg = document.querySelector('.play-pause img.pause');
  
  if (playImg.style.display !== 'none') {
    playImg.style.display = 'none';
    pauseImg.style.display = 'block';
  } else {
    playImg.style.display = 'block';
    pauseImg.style.display = 'none';
  }
  socket.emit("play_pause_video");
  }

function volumeUp(){
  socket.emit("volume_up");
}
function volumeDown(){
  socket.emit("volume_down");
}

const constraints = {
  audio: false,
  video: true,
};

function startCamera(){
  var video_call = document.querySelector('.call');
  var hang = document.querySelector('.hang');
  video_call.style.display = 'none';
  hang.style.display = "block";
  video.style.display = "block";
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      const videoTracks = stream.getVideoTracks();
      console.log("Got stream with constraints:", constraints);
      console.log(`Using video device: ${videoTracks[0].label}`);
      stream.onremovetrack = () => {
        console.log("Stream ended");
      };
      video.srcObject = stream;
    })
    .catch((error) => {
      if (error.name === "ConstraintNotSatisfiedError") {
        console.error(
          `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`
        );
      } else if (error.name === "PermissionDeniedError") {
        console.error(
          "You need to grant this page permission to access your camera and microphone."
        );
      } else {
        console.error(`getUserMedia error: ${error.name}`, error);
      }
    });
}

function stopCamera() {
  var video_call = document.querySelector('.call');
  var hang = document.querySelector('.hang');
  video_call.style.display = "block";
  hang.style.display = "none";
  video.style.display = "none";
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(function(track) {
    track.stop();
  });

  video.srcObject = null;
}

function Dropdown(){
  console.log("dropdown function");
  var dropdownMenu = document.getElementById("dropdownmenu");
  dropdownMenu.classList.toggle("show");
}

window.addEventListener("click", function(event) {
  var dropdownMenu = document.getElementById("dropdownmenu");
  // Verifica si el clic se hizo dentro o fuera del dropdown
  if (!event.target.matches('.activate-dropdown') && dropdownMenu.classList.contains('show')) {
    console.log(event.target)
    dropdownMenu.classList.remove('show');
  }
});

//Code for gestures

let doubleTap = false;
let timerId;

document.addEventListener('dblclick', function() {
  doubleTap = true;
  window.addEventListener('deviceorientation', handleTilt);
  document.getElementById("msg").innerHTML = "Detectando gestos...";

  timerId = setTimeout(function() {
    doubleTap = false;
    window.removeEventListener('deviceorientation', handleTilt);
    document.getElementById("msg").innerHTML = "";
  }, 5000);
});


function handleTilt(event) {
  if (doubleTap) {
    let roll = event.gamma;
    let pitch = event.beta;
    if (pitch != 0 && roll != 0) {
      if (roll < -45) {
        socket.emit("go_back", {msg: 10});
        doubleTap = false;
        window.removeEventListener('deviceorientation', handleTilt);
        document.getElementById("msg").innerHTML = "";
      }
      if (roll > 45) {
        socket.emit("go_forward", {msg: 10});
        doubleTap = false;
        window.removeEventListener('deviceorientation', handleTilt);
        document.getElementById("msg").innerHTML = "";
      }
      if (pitch < 0) {
        socket.emit("volume_down");
        doubleTap = false;
        window.removeEventListener('deviceorientation', handleTilt);
        document.getElementById("msg").innerHTML = "";
      }
      if (pitch > 90) {
        socket.emit("volume_up");
        doubleTap = false;
        window.removeEventListener('deviceorientation', handleTilt);
        document.getElementById("msg").innerHTML = "";
      }
    }
  }
}

var last_tap = 0;

var startX, startY, touchStartTimestamp;

function handleTouchStart(event) {
  console.log("handler2");
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
  touchStartTimestamp = event.timeStamp;
}

function handleTouchEnd(event) {
  var currX = event.changedTouches[0].clientX;
  var currY = event.changedTouches[0].clientY;
  var touchEndTimestamp = event.timeStamp;
  if (Math.abs(currX - startX) < 50 && Math.abs(currY - startY) < 50 && Math.abs(touchEndTimestamp - touchStartTimestamp) > 500) {
    toggleOverlay();
  }
}


var container = document.getElementById("controls_container");

function toggleOverlay() {

  if (container.style.display === "none") {
    container.style.display = "flex";
  } else {
    container.style.display = "none";
  }
}

document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchend", handleTouchEnd); 
