const video = document.querySelector('.myVideo');
const dropdown = document.querySelector(".dropdown");
const dropdownMenu = document.querySelector(".dropdown-menu");

function togglePlay() {
  var playPauseBtn = document.querySelector('.play-pause');
  var playIcon = playPauseBtn.querySelector('.play');
  var pauseIcon = playPauseBtn.querySelector('.pause');
  playPauseBtn.classList.toggle('playing');
  if (playPauseBtn.classList.contains('playing')) {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    socket.emit("play_video");

  } else {
    pauseIcon.style.display = 'none';
    playIcon.style.display = 'block';
    socket.emit("pause_video");

  }
}

const constraints = {
  audio: false,
  video: true,
};

function startCamera(){
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
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });

  video.srcObject = null;
}
// Function to display the dropdown elements
var dropdown = document.getElementById("dropdown");
var dropdownMenu =document.getElementById("dropdownmenu");

dropdown.addEventListener("click", function() {
  console.log("entre");
  dropdownMenu.classList.toggle("show");
});