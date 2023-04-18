const video = document.querySelector('.myVideo');

const back_button = document.querySelector("#back_button");

back_button.addEventListener("click", function() {
  window.location.href = "selector.html";
});

function togglePlay() {
  console.log("togglePlay() was called!");
  var playPauseBtn = document.querySelector('.play-pause');
  var playIcon = playPauseBtn.querySelector('.play');
  var pauseIcon = playPauseBtn.querySelector('.pause');
  playPauseBtn.classList.toggle('playing');
  if (playPauseBtn.classList.contains('playing')) {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  } else {
    pauseIcon.style.display = 'none';
    playIcon.style.display = 'block';
  }
}

const constraints = {
  audio: false,
  video: true,
};

function startCamera() {
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
  video.style.display = "none";
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(function(track) {
    track.stop();
  });

  video.srcObject = null;
}
// Function to display the dropdown elements
var dropdown = document.getElementById("dropdown");
var dropdownMenu = document.getElementById("dropdownmenu");

dropdown.addEventListener("click", function() {
  console.log("entre");
  dropdownMenu.classList.toggle("show");
});

var dropdownBtn = document.getElementById("videocall");
var dropdownMenu = document.getElementById("dropdownmenu");

window.addEventListener("click", function(event) {
  // Verifica si el clic se hizo dentro o fuera del dropdown
  if (!event.target.matches('#videocall') && dropdownMenu.classList.contains('show')) {
    dropdownMenu.classList.remove('show');
  }
});

//Code for gestures

let doubleTap = false;
let timerId;

document.addEventListener('dblclick', function() {
  doubleTap = true;
  
  window.addEventListener('deviceorientation', handleTilt);

  timerId = setTimeout(function() {
    window.removeEventListener('deviceorientation', handleTilt);
    doubleTap = false;
  }, 5000);
});


function handleTilt(event) {
  if (doubleTap) {
    let roll = event.gamma;
    let pitch = event.beta;
    if (roll < -45) {
      alert("go back");
    }
    if (roll > 45) {
      alert("go forward");
    }
    if (pitch < -45) {
      alert("volume up");
    }
    if (pitch > 45){
      alert("volume down");
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
