var constraints = { audio: false, video: true };
let video = document.querySelector("video");
let startBtn = document.getElementById("grabarBtn");
let texto1 = document.getElementById("text1");
let texto2 = document.getElementById("text2");
let texto3 = document.getElementById("text3");
let texto4 = document.getElementById("text4");
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let p3 = document.getElementById("p3");
let videoCtn = document.getElementById("video");
let gifCreado = document.getElementById("gifCreado");
let nums = document.getElementById("nums");
let numeroPaso = 0; //contador de clicks del botón
let recorder = null;
let repeat = document.createElement("p");
let form; //sirve para agregar el gif a GIPHY

//comienzo, al hacer click
startBtn.addEventListener("click", () => {
  switch (numeroPaso) {
    case 0: //primer click pide permiso y activa la cámara
      texto1.className = "textCrearHid";
      texto2.className = "textCrearSw";
      p1.className = "numActive";
      startBtn.style.display = "none";
      getStreamAndRecord();
      return;
    case 1: //botón para empezar la grabación
      recorder.startRecording();
      startBtn.innerHTML = "FINALIZAR";
      numeroPaso++;
      return;
    case 2: //finalizó la grabación, muestra el gif
      recorder.stopRecording();
      video.srcObject = null;
      video.className = "videoHid";
      blob = recorder.getBlob();
      gifCreado.src = URL.createObjectURL(blob);
      recorder.camera.stop();
      repeat.innerHTML = "REPETIR CAPTURA";
      nums.appendChild(repeat);
      startBtn.innerHTML = "SUBIR GIFO";
      numeroPaso++;
      return;
    case 3: //clickea en 'subir gifo'
      let form = new FormData();
      form.append("file", blob, "myGif.gif");
      upload(form);
  }
});
/*
startBtn.addEventListener("click", () => {
  if (startBtnCont === 0) {
    //primer click pide permiso y activa la cámara
    texto1.className = "textCrearHid";
    texto2.className = "textCrearSw";
    p1.className = "numActive";
    startBtn.style.display = "none";
    getStreamAndRecord();
  } else if (startBtnCont === 1) {
    //botón para empezar la grabación
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
    repeat.innerHTML = "REPETIR CAPTURA";
    nums.appendChild(repeat);
    startBtn.innerHTML = "SUBIR GIFO";
    console.log(form);
    startBtnCont++;
    form = new FormData();
  } else if (startBtnCont === 3) {
    let file = form.get("file");
    upload(file);
    console.log("ok");
  } else {
    texto3.className = "videoTextSw";
  }
});
*/
//reinicia al punto de grabar el gif
repeat.addEventListener("click", restart);
function restart() {
  numeroPaso = 0;
  gifCreado.src = "";
  video.className = "videoHid";
  texto1.className = "textCrearSw";
  p2.className = "numInactive";
  startBtn.click();
  nums.removeChild(repeat);
}

function restoreRecord() {
  //vuelve todo al principio al salir a otra sección (llamada en transiciones.js)
  if (numeroPaso >= 2) {
    nums.removeChild(repeat);
  }
  numeroPaso = 0;
  gifCreado.src = "";
  texto1.className = "textCrearSw";
  startBtn.innerHTML = "COMENZAR";
  p2.className = "numInactive";
  video.className = "videoHid";
  if (recorder != null) {
    recorder.camera.stop();
    recorder = null;
  }
}
//vuelve todo al principio

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
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
      });
      recorder.camera = stream;
    })
    .then(function () {
      texto2.className = "textCrearHid";
      videoCtn.className = "videoSw";
      video.className = "videoActive";
      p1.className = "numInactive";
      p2.className = "numActive";
      startBtn.innerHTML = "GRABAR";
      startBtn.style.display = "block";
      numeroPaso++;
    });
}

//agregado a GIPHY
async function upload(gif) {
  try {
    let response = await fetch(
      `https://upload.giphy.com/v1/gifs?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&file=${gif}`,
      {
        method: "POST",
        body: gif,
        json: true,
        mode: "cors",
      }
    );
    let json = await response.json();
    console.log(json);
    let myGifID = json.data.id;
    let key = "myGifIDs";
    let allMyGifs = localStorage.getItem(key);
    if (allMyGifs != null) {
      //si ya hay IDs almacenadas
      allMyGifs = allMyGifs + "," + myGifID; //almacena los ids separados por una coma
      localStorage.setItem(key, allMyGifs);
    } else {
      localStorage.setItem(key, myGifID);
    }
  } catch (err) {
    console.log(err);
  }
}

//----------------MIS GIFOS---------------------------------------
let misGifosCtn = document.getElementById("misGifosShown");

async function showMisGifs() {
  try {
    let myGifsIDs = localStorage.getItem("myGifIDs");
    console.log(myGifsIDs);
    let response = await fetch(
      `https://api.giphy.com/v1/gifs?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&ids=${myGifsIDs}`
    );
    let json = await response.json();
    console.log(json);
    for (let i = 0; i < json.data.length; i++) {
      let myGif = document.createElement("img");
      myGif.setAttribute("src", json.data[i].images.downsized_medium.url);
      misGifosCtn.appendChild(myGif);
    }
  } catch (err) {
    console.log(err);
  }
}
showMisGifs();
