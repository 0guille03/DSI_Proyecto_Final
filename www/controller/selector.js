const socket = io();

const search_button = document.querySelector("#search_button");
const up_b = document.querySelector("#up_b");
const down_b = document.querySelector("#down_b");
const left_b = document.querySelector("#left_b");
const right_b = document.querySelector("#right_b");
const ok_b = document.querySelector("#ok_b");

/* Change to the searching section */
search_button.addEventListener("click", function() {
  window.location.href = "search.html";
});

/* Buttons of the controller */
up_b.addEventListener("click", function() {
  socket.emit("select_changed", {msg: "u"});
});
down_b.addEventListener("click", function() {
  socket.emit("select_changed", {msg: "d"});
});
left_b.addEventListener("click", function() {
  socket.emit("select_changed", {msg: "l"});
});
right_b.addEventListener("click", function() {
  socket.emit("select_changed", {msg: "r"});
});
ok_b.addEventListener("click", function() {
  //socket.emit("playing_video", {msg: "r"});
  window.location.href = "video_player.html";
});


function loadPlayer(){
  socket.emit("change_html", {msg: "selector.html"});
}






// De aquí para abajo realmente iría en el js de María, pero lo dejo aquí de momento hasta que María lo tenga

function doubleTap() {
  var now = new Date().getTime();
  var timesince = now - last_tap;
  if ((timesince < 600) && (timesince > 0)) {
    socket.emit("toggle_overlay");
  }
  last_tap = new Date().getTime();
}

const main = document.querySelector("#main");

main.addEventListener("touchstart", doubleTap);

if ('Accelerometer' in window) {
  try {
    accelerometer = new Accelerometer({ frequency: 10 });
    accelerometer.onerror = (event) => {
      // Errores en tiempo de ejecución
      if (event.error.name === 'NotAllowedError') {
        alert('Permission to access sensor was denied.');
      } else if (event.error.name === 'NotReadableError') {
        alert('Cannot connect to the sensor.');
      }
    };
    accelerometer.onreading = (e) => {
      socket.emit("position_data", { x: accelerometer.x, y: accelerometer.y, z: accelerometer.z });
    };


  } catch (error) {
    // Error en la creación del objeto
    if (error.name === 'SecurityError') {
      alert('Sensor construction was blocked by the Permissions Policy.');
    } else if (error.name === 'ReferenceError') {
      alert('Sensor is not supported by the User Agent.');
    } else {
      throw error;
    }
  }
}