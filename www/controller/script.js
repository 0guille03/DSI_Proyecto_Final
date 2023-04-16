const socket = io();
const button = document.querySelector("button");
const input = document.querySelector("input");
const msg = document.querySelector("#msg");
var last_tap = 0;

button.addEventListener("click", function(e) {
  const text = input.value;
  //enviarselo al servidor
  socket.emit("message_evt", { msg: text });
});


socket.on("message_evt", function(message) {
  msg.innerHTML = message.msg;
});

function loadPlayer() {
  console.log("i am at the beggining of load player function");
  socket.emit("device_on", { msg: "player/index.html" });
}

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