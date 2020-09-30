//creo variables para almacenar los botones y sus ids
let headBtn = document.getElementById("head");
let HeadID = headBtn.id;

let searchBtn = document.getElementById("search");
let SearchID = searchBtn.id;

let favBtn = document.getElementById("fav");
let FavID = favBtn.id;

let misGifosBtn = document.getElementById("mis_gifos");
let misGifosID = misGifosBtn.id;

//función para mostrar la sección clickeada y ocultar las demás

function showSection(ShowClase, HidClase1, HidClase2, HidClase3) {
  let showSection = document.getElementById(ShowClase + "_section");
  let hideSection1 = document.getElementById(HidClase1 + "_section");
  let hideSection2 = document.getElementById(HidClase2 + "_section");
  let hideSection3 = document.getElementById(HidClase3 + "_section");

  //condición: si el botón clickeado es search, no afecta a HEAD, caso contrario sí
  if (ShowClase === "search") {
    showSection.className = "searchShown";
    hideSection1.className = "favHidden";
    hideSection3.className = "mis_gifosHidden";
  } else {
    showSection.className = ShowClase + "Shown";
    hideSection1.className = HidClase1 + "Hidden";
    hideSection2.className = HidClase2 + "Hidden";
    hideSection3.className = HidClase3 + "Hidden";
  }
}

//agrego eventos a cada botón, llamando a la función y agregando los correspondientes parámetros
headBtn.addEventListener("click", function () {
  showSection(HeadID, FavID, SearchID, misGifosID);
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
  showSection(FavID, HeadID, SearchID, misGifosID);
  scroll({
    top: 0,
    behavior: "smooth",
  });
  favBtn.style.color = "var(--colorSearchs)";
});

searchBtn.addEventListener("click", function () {
  showSection(SearchID, FavID, HeadID, misGifosID);
});

misGifosBtn.addEventListener("click", function () {
  showSection(misGifosID, HeadID, FavID, SearchID);
  scroll({
    top: 0,
    behavior: "smooth",
  });
});
