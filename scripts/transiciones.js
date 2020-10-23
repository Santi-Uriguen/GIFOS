//creo variables para almacenar los botones y sus ids
let headBtn = document.getElementById("head");
let HeadID = headBtn.id;

let searchBtn = document.getElementById("search");
let SearchID = searchBtn.id;

let favBtn = document.getElementById("fav");
let FavID = favBtn.id;

let misGifosBtn = document.getElementById("mis_gifos");
let misGifosID = misGifosBtn.id;

let createGifBtn = document.getElementById("crateGif");
let createGifID = createGifBtn.id;

let trendings = document.getElementById("trendings");

//otras variables
let searchContainer = document.getElementById("searchContainer");

//función para mostrar la sección clickeada y ocultar las demás
function showSection(ShowClase, HidClase1, HidClase2, HidClase3, HidClase4) {
  let showSection = document.getElementById(ShowClase + "_section");
  let hideSection1 = document.getElementById(HidClase1 + "_section");
  let hideSection2 = document.getElementById(HidClase2 + "_section");
  let hideSection3 = document.getElementById(HidClase3 + "_section");
  let hideSection4 = document.getElementById(HidClase4 + "_section");
  restoreRecord();
  //condición: si el botón clickeado es search, no afecta a HEAD, caso contrario sí
  if (ShowClase === "search") {
    showSection.className = "searchShown";
    hideSection1.className = "favHidden";
    hideSection3.className = "mis_gifosHidden";
    hideSection4.className = "crateGifHidden";
  } else {
    showSection.className = ShowClase + "Shown";
    hideSection1.className = HidClase1 + "Hidden";
    hideSection2.className = HidClase2 + "Hidden";
    hideSection3.className = HidClase3 + "Hidden";
    hideSection4.className = HidClase4 + "Hidden";
    trendings.className = "trendingShown";
  }
}

//agrego eventos a cada botón, llamando a la función y agregando los correspondientes parámetros
headBtn.addEventListener("click", function () {
  showSection(HeadID, FavID, SearchID, misGifosID, createGifID);
  let trends = document.getElementById("trends");
  trends.className = "trendsShow";
  scroll({
    top: 0,
    behavior: "smooth",
  });
  favBtn.style.color = "var(--colorPricipal)";
});

favBtn.addEventListener("click", function () {
  addFavorito(); //función para mostrar los favoritos(en archivo fav.js)
  searchContainer.innerHTML = "";
  showSection(FavID, HeadID, SearchID, misGifosID, createGifID);
  scroll({
    top: 0,
    behavior: "smooth",
  });
  favBtn.style.color = "var(--colorSearchs)";
});

searchBtn.addEventListener("click", function () {
  showSection(SearchID, FavID, HeadID, misGifosID, createGifID);
});

misGifosBtn.addEventListener("click", function () {
  showSection(misGifosID, HeadID, FavID, SearchID, createGifID);
  scroll({
    top: 0,
    behavior: "smooth",
  });
});

createGifBtn.addEventListener("click", function () {
  showSection(createGifID, HeadID, FavID, SearchID, misGifosID);
  scroll({
    top: 0,
    behavior: "smooth",
  });
  trendings.className = "trendingHidden";
});

//--------------------------------------DARK MODE-----------------------------------
let toggleModes = document.querySelector("#toggleModes");
let preferedMode = localStorage.getItem("modo");
let changeMode;
let logo = document.getElementById("head");
let btnCrear = document.getElementById("btn-crear");
//verifica que haya un modo preferido y sino manda al light por default
if (preferedMode === null) {
  changeMode = "light";
} else if (preferedMode === "dark") {
  changeMode = "light";
} else {
  changeMode = "dark";
}
toggleMode();

toggleModes.addEventListener("click", toggleMode);
function toggleMode() {
  if (changeMode === "light") {
    //se pone en modo oscuro
    imageToggle(changeMode);
    toggleModes.innerHTML = "Modo Claro";
    localStorage.setItem("modo", "dark");
    changeMode = "dark";
    preferedMode = "dark";
    document.documentElement.setAttribute("mode", "dark");
    transicion();
  } else {
    //se pone en modo claro
    imageToggle(changeMode);
    toggleModes.innerHTML = "Modo Oscuro";
    localStorage.setItem("modo", "light");
    preferedMode = "light";
    changeMode = "light";
    document.documentElement.setAttribute("mode", "light");
    transicion();
  }
}

function transicion() {
  document.documentElement.classList.add("transicion");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transicion");
  }, 250);
}

//cambio de imágenes

function imageToggle(mode) {
  if (mode === "light") {
    //imágenes para el modo dark
    closeImg.setAttribute("src", "assets/button-close-modo-noct.svg");
    searchLupa.setAttribute("src", "assets/icon-search-modo-noct.svg");
    btnLeft.setAttribute("src", "assets/button-left-modo-dark.svg");
    btnRight.setAttribute("src", "assets/button-right-modo-noc.svg");
    btnCrear.setAttribute("src", "assets/CTA-crear-gifo-modo-noc.svg");
    toggleEvents(mode);
  } else {
    //imágenes modo claro
    searchLupa.setAttribute("src", "assets/icon-search.svg");
    closeImg.setAttribute("src", "assets/close.svg");
    btnLeft.setAttribute("src", "assets/button-left.svg");
    btnRight.setAttribute("src", "assets/button-right.svg");
    btnCrear.setAttribute("src", "assets/button-crear-gifo.svg");
    toggleEvents(mode);
  }
}
//algunos eventos cambian segun sea modo oscuro o claro
function toggleEvents(mode) {
  let searchLupaSrc;
  let btnLeftSrc;
  let btnRigthSrc;
  let btnLeftHoverSrc;
  let btnRightHover;
  let btnCrearHvr;
  let btnCrearSrc;
  let btnCrearActive;
  if (mode === "light") {
    //modo oscuro
    searchLupaSrc = "assets/icon-search-modo-noct.svg";
    btnLeftSrc = "assets/button-left-modo-dark.svg";
    btnRigthSrc = "assets/button-right-modo-noc.svg";
    btnLeftHoverSrc = "assets/button-slider-left-hvr-dark.svg";
    btnRightHover = "assets/Button-Slider-right-hover-dark.svg";
    btnCrearHvr = "assets/CTA-crear-gifo-hover-modo-noc.svg";
    btnCrearSrc = "assets/CTA-crear-gifo-modo-noc.svg";
    btnCrearActive = "assets/CTA-crear-gifo-active-modo-noc.svg";
  } else {
    //modo claro
    searchLupaSrc = "assets/icon-search.svg";
    btnLeftSrc = "assets/button-left.svg";
    btnRigthSrc = "assets/button-right.svg";
    btnLeftHoverSrc = "assets/button-slider-left-hover.svg";
    btnRightHover = "assets/Button-Slider-right-hover.svg";
    btnCrearHvr = "assets/CTA-crear-gifo-hover.svg";
    btnCrearSrc = "assets/button-crear-gifo.svg";
    btnCrearActive = "assets/CTA-crear-gifo-active.svg";
  }
  //eventos
  closeImg.addEventListener("click", () => {
    srcChange(searchLupaSrc, searchLupa);
  });
  btnRight.addEventListener("mouseover", () => {
    srcChange(btnRightHover, btnRight);
  });
  btnRight.addEventListener("mouseout", () => {
    srcChange(btnRigthSrc, btnRight);
  });
  btnLeft.addEventListener("mouseover", () => {
    srcChange(btnLeftHoverSrc, btnLeft);
  });
  btnLeft.addEventListener("mouseout", () => {
    srcChange(btnLeftSrc, btnLeft);
  });
  createGifBtn.addEventListener("mouseover", () => {
    srcChange(btnCrearHvr, btnCrear);
  });
  createGifBtn.addEventListener("mouseout", () => {
    srcChange(btnCrearSrc, btnCrear);
  });
  createGifBtn.addEventListener("click", () => {
    srcChange(btnCrearActive, btnCrear);
  });
}

function srcChange(src, target) {
  //función que cambia las src de img
  target.setAttribute("src", src);
}

/*anotaciones:
cambiar el input al escribir
cambiar estilos hover button

*/
