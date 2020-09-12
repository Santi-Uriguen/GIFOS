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
    showSection.classList.add("searchShown");
    showSection.classList.remove("searchHidden");
    hideSection1.classList.add("favHidden");
    hideSection1.classList.remove("favShown");
    hideSection3.classList.add("mis_gifosHidden");
    hideSection3.classList.remove("mis_gifosShown");
  } else {
    showSection.classList.add(ShowClase + "Shown");
    showSection.classList.remove(ShowClase + "Hidden");
    hideSection1.classList.add(HidClase1 + "Hidden");
    hideSection1.classList.remove(HidClase1 + "Shown");
    hideSection2.classList.add(HidClase2 + "Hidden");
    hideSection2.classList.remove(HidClase2 + "Shown");
    hideSection3.classList.add(HidClase3 + "Hidden");
    hideSection3.classList.remove(HidClase3 + "Shown");
  }
  console.log(showSection, hideSection1, hideSection2, hideSection3)
}

//agrego eventos a cada botón, llamando a la función y agregando los correspondientes parámetros
headBtn.addEventListener("click", function () {
  showSection(HeadID, FavID, SearchID, misGifosID);
});

favBtn.addEventListener("click", function () {
  showSection(FavID, HeadID, SearchID, misGifosID);
});

searchBtn.addEventListener("click", function () {
  showSection(SearchID, FavID, HeadID, misGifosID);
});

misGifosBtn.addEventListener("click", function () {
  showSection(misGifosID, HeadID, FavID, SearchID);
});
