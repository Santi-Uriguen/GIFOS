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
