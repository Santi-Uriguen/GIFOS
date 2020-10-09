var constraints = { audio: false, video: true };
let video = document.querySelector("video");
let startBtn = document.getElementById("grabarBtn");
let texto1 = document.getElementById("text1");
let texto2 = document.getElementById("text2");
let texto3 = document.getElementById("text3");
let texto4 = document.getElementById("text4");
let p1 = document.getElementById("p0");
let p2 = document.getElementById("p1");
let p3 = document.getElementById("p2");
let videoCtn = document.getElementById("video");
let nums = document.getElementById("nums");
let startBtnCont = 0; //contador de clicks del botón
var recorder;
let form; //sirve para agregar el gif a GIPHY

//comienzo, al hacer click
startBtn.addEventListener("click", () => {
  if (startBtnCont === 0) {
    //primer click pide permiso y activa la cámara
    texto1.className = "textCrearHid";
    texto2.className = "textCrearSw";
    p1.className = "numActive";
    startBtn.style.display = "none";
    getStreamAndRecord();
  } else if (startBtnCont === 1) {
    //botòn para empezar la grabación
    recorder.startRecording();
    startBtn.innerHTML = "FINALIZAR";
    startBtnCont++;
  } else if (startBtnCont === 2) {
    //botón para terminar la grabación
    recorder.stopRecording(function () {
      video.src = video.srcObject = null;
      video.src = URL.createObjectURL(recorder.getBlob());
      form.append("file", recorder.getBlob(), "myGif.gif"); //agrega el video al form
      recorder.camera.stop();
      recorder.destroy();
      recorder = null;
    });
    let duration = document.createElement("p");
    duration.innerHTML = "REPETIR CAPTURA";
    nums.appendChild(duration);
    startBtn.innerHTML = "SUBIR GIFO";
    console.log(form);
    startBtnCont++;
    form = new FormData();
  } else {
    texto3.className = "videoTextSw";
  }
});

//función para pedir permiso de activar la cámara y empezar a mostrar el video
function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
      },
    })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
      recorder = RecordRTC(stream, {
        type: "video",
      });
      recorder.camera = stream;
    })
    .then(function () {
      texto2.className = "textCrearHid";
      videoCtn.className = "videoSw";
      p1.className = "numInactive";
      p2.className = "numActive";
      startBtn.innerHTML = "GRABAR";
      startBtn.style.display = "block";
      startBtnCont++;
    });
}
//agregado a GIPHY

console.log(form);
