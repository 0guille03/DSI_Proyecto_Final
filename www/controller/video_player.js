const video = document.querySelector('.myVideo');

const back_button = document.querySelector("#back_button");

back_button.addEventListener("click", function() {
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
  });}

function stopCamera() {
  var video_call = document.querySelector('.call');
  var hang = document.querySelector('.hang');
  video_call.style.display = "block";
  hang.style.display = "none";
  video.style.display = "none";
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(function (track) {
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
