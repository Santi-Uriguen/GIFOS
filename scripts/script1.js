//---------------TRENDING GIFS---------------

let TrendingContainer = document.getElementById("trending");
window.addEventListener("load", addTrending);
let cont1 = 0;

//funcion para agregar los gifs a la página
async function addTrending() {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&limit=12`
    );
    const trend = await response.json();
    let btnLeft = document.createElement("img");
    let ctn = document.createElement("div");
    let btnRight = document.createElement("img");

    btnLeft.className = "trendBtnLt";
    btnRight.className = "trendBtnRt";
    btnLeft.setAttribute("src", "assets/button-left.svg");
    btnRight.setAttribute("src", "assets/button-right.svg");
    ctn.className = "trendCtn";
    for (let i = 0; i < 12; i++) {
      let gif = document.createElement("img");
      gif.setAttribute("src", trend.data[i].images.original.url);
      ctn.appendChild(gif);
      TrendingContainer.appendChild(btnLeft);
      TrendingContainer.appendChild(ctn);
      TrendingContainer.appendChild(btnRight);
    }

    btnRight.addEventListener("click", () => {
      if (cont1 <= 2) {
        //mas de tres clicks ya no tiene nada mas para mostrar
        scrollRight(cont1, ctn);
        cont1++;
      }
    });

    btnLeft.addEventListener("click", () => {
      if (cont1 >= 1) {
        //mas de tres clicks ya no tiene nada mas para mostrar
        scrollLeft(cont1, ctn);
        cont1--;
      }
    });
  } catch (err) {
    console.log(err);
  }
}

//funciones para scrollear a la derecha haciendo click en boton
function scrollRight(cont1, ctn) {
  let scrollWidth = ctn.offsetWidth;
  if (cont1 == 1) {
    scrollWidth = scrollWidth * 2;
  }
  if (cont1 == 2) {
    scrollWidth = scrollWidth * 3;
  }

  ctn.scroll({
    left: scrollWidth,
    behavior: "smooth",
  });
}
//funciones para scrollear a la izquierda haciendo click en boton
function scrollLeft(cont1, ctn) {
  let scrollWidth = ctn.offsetWidth;
  if (cont1 == 1) {
    scrollWidth = 0;
  } else if (cont1 == 3) {
    scrollWidth = scrollWidth * 2;
  }
  ctn.scroll({
    left: scrollWidth,
    behavior: "smooth",
  });
}

//------------BUSCADOR-----------------------

//Funciones para agregar sugerencias a la barra de búsqueda
let SearchBar = document.getElementById("search_bar");
let inputCtn = document.getElementById("input_ctn");
let inputSearch = document.getElementById("searchInput");
let lupaImg = document.getElementById("lupa");
let searchLupa = document.getElementById("search");
let closeImg = document.getElementById("close");
let linea = document.getElementById("linea");
let suggestCtn = document.getElementById("suggest_container");
let searchSection = document.getElementById("search_section");
//let searchInput = inputSearch.value; //valor tipeado

inputSearch.addEventListener("focus", ShowSuggest);

function ShowSuggest() {
  SearchBar.className = "search_bar_clicked";
  searchLupa.setAttribute("src", "assets/icon-search-active.svg");

  inputSearch.addEventListener("keyup", () => {
    suggest();
    contador = 0;
  });
}
var contador = 0;

async function suggest() {
  try {
    linea.className = "lineaShow"; //muestra el span
    //busca y muestra las sugerencias
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search/tags?q=${inputSearch.value}&api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&limit=5`
    );
    const json = await response.json();

    suggestCtn.innerHTML = ""; //limpia las búsquedas anteriores

    json.data.forEach((element) => {
      //creamos los elementos para mostrar cada una de las sugerencias
      let suggestionDiv = document.createElement("div");
      let suggestionA = document.createElement("p");

      let lupita = document.createElement("img");

      suggestionA.textContent = element.name;
      suggestionDiv.className = "suggestDiv";
      suggestionDiv.id = "suggestDiv";

      lupita.setAttribute("src", "assets/icon-search-active.svg");
      // suggestionA.setAttribute("href", "#searchContainer");

      suggestionDiv.appendChild(lupita);
      suggestionDiv.appendChild(suggestionA);

      suggestCtn.appendChild(suggestionDiv);

      suggestionDiv.addEventListener("click", function () {
        searchSuggestion(element.name);
        hidSuggest();
        inputSearch.value = "";
        //hacer que al clickear la sugerencia, la pagina se traslade a los resultados
        const offsetTop = document.querySelector("#trends").offsetTop;
        scroll({
          top: offsetTop,
          behavior: "smooth",
        });
      });

      contador++;
    });
  } catch (err) {
    console.log(err);
  }
}

//función para buscar los gifs al clickear las sugerencias
let searchButton = document.getElementById("lupa");
let searchCtn = document.getElementById("searchContainer");
let noResultsSearch = document.getElementById("noResultsSearch");

async function searchSuggestion(info) {
  try {
    searchSection.className = "searchShown";
    //búsqueda del valor tipeado
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&q="${info}&limit=36&offset=0&rating=r&lang=es`
    );
    const busqueda = await response.json();

    searchCtn.className = "resultsShown";
    noResultsSearch.className = "noResultsHidden";
    addSearchToDOM(busqueda, info);
  } catch (err) {
    console.log(err);
  }
}
//eliminar las sugerencias
closeImg.addEventListener("click", function () {
  hidSuggest();
  inputSearch.value = ""; //borra lo que está escrito en el input si clickea la cruz
});

function hidSuggest() {
  linea.className = "lineaHid"; //esconde el span
  SearchBar.className = "search_bar";
  lupaImg.className = "lupaImgShow";
  searchLupa.setAttribute("src", "assets/icon-search.svg");

  for (let i = 0; i < contador; i++) {
    let suggestDivs = document.getElementById("suggestDiv"); //elije c/u de las sugerencias
    if (suggestDivs != null) {
      //si no hay ningún elemento para borrar pq no hubo busqueda, ignora
      suggestDivs.remove();
    }
  }
  contador = 0;
}
//busqueda de palabra tipeada
lupaImg.addEventListener("click", function () {
  search(); //busca
  hidSuggest(); //borra sugerencias
  inputSearch.value = ""; //borra lo que está escrito en el input
  const offsetTop = document.querySelector("#trends").offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
});

inputSearch.addEventListener("keyup", function (event) {
  //evento al apretar enter
  if (event.key === "Enter") {
    search(); //busca
    hidSuggest(); //borra sugerencias
    inputSearch.value = ""; //borra lo que está escrito en el input
    const offsetTop = document.querySelector("#trends").offsetTop;
    scroll({
      //nos leva smoooooth a la parte donde muestra los resultados
      top: offsetTop,
      behavior: "smooth",
    });
  }
});

//funcion para buscar la palabra tipeada
async function search() {
  try {
    searchSection.className = "searchShown";
    let tipeado = inputSearch.value;
    //búsqueda del valor tipeado
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&q=${tipeado}&limit=36&offset=0&rating=r&lang=es`
    );

    const busqueda = await response.json();
    console.log(busqueda);

    if (busqueda.pagination.total_count == 0) {
      //borra búsquedas anteriores
      let resultadoViejo = document.getElementById("searchTitle");
      if (resultadoViejo != null) {
        //si hay una busqueda vieja, elimina sus resultados
        resultadoViejo.remove();
      }
      searchCtn.className = "resultsHidden";
      noResultsSearch.className = "noResultsShown";
      let searchTitle = document.createElement("h2");

      searchTitle.textContent = tipeado;
      searchTitle.id = "searchTitle";
      noResultsSearch.insertBefore(searchTitle, noResultsSearch.childNodes[0]);
    } else {
      //si encuetra los muestra por pantalla
      searchCtn.className = "resultsShown";

      noResultsSearch.className = "noResultsHidden";
      trends.className = "trendsHidden";
      console.log("else " + tipeado);
      addSearchToDOM(busqueda, tipeado);
    }
  } catch (err) {
    console.log(err);
  }
}

//agregado al DOM de los gifs buscados
function addSearchToDOM(json, name) {
  //esconde la sección de las trending words
  //primero verifica que no haya habido alguna búsqueda antes
  let resultadoViejo = document.getElementById("searchGifs");
  if (resultadoViejo != null) {
    //si hay una busqueda vieja, elimina sus resultados
    searchCtn.innerHTML = "";
  }

  let searchGifCtn = document.createElement("div");
  searchGifCtn.id = "searchGifs";
  let searchTitle = document.createElement("h2");
  let btn = document.createElement("button");
  btn.addEventListener("click", function () {
    verMas(json, searchGifCtn);
  });
  //crea los gifs para 12 elementos de la búsqueda
  for (let i = 0; i < 12; i++) {
    let gif = document.createElement("img");

    //Mostrar el texto con mayúscula al principio
    name = name.charAt(0).toUpperCase() + name.slice(1);
    searchTitle.textContent = name;

    gif.setAttribute("src", json.data[i].images.original.url);
    btn.textContent = "Ver más";
    btn.id = "btnVerMas";

    searchGifCtn.appendChild(gif);
    searchCtn.appendChild(searchTitle);
    searchCtn.appendChild(searchGifCtn);
    searchCtn.appendChild(btn);
  }
}

let cont2 = 0;
function verMas(json, div) {
  if (cont2 == 0) {
    for (let i = 12; i < 24; i++) {
      let gif = document.createElement("img");
      gif.setAttribute("src", json.data[i].images.original.url);
      div.appendChild(gif);
      cont2++;
    }
  } else {
    for (let i = 24; i < 36; i++) {
      let gif = document.createElement("img");
      gif.setAttribute("src", json.data[i].images.original.url);
      div.appendChild(gif);
    }
    let button = document.getElementById("btnVerMas");
    button.remove();
  }
}

//------------------------------TRENDING WORDS-------------------------------

let trends = document.getElementById("trends");
ShowTrends();
async function ShowTrends() {
  try {
    let response = await fetch(
      "https://api.giphy.com/v1/trending/searches?&api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN"
    );
    let showTrend = await response.json();
    let trendDiv = document.createElement("div");
    for (let i = 0; i < 5; i++) {
      //crea cada una de las tendencias
      let trendP = document.createElement("p");
      let coma = document.createElement("p");
      coma.textContent = ", ";
      coma.style.marginRight = "5px";

      let trendString = showTrend.data[i]; //Mostrar el texto con mayúscula al principio
      trendString = trendString.charAt(0).toUpperCase() + trendString.slice(1);
      trendP.innerHTML = trendString;
      trendDiv.className = "trenDiv";

      //agregado de los trends a la página
      trendDiv.appendChild(trendP);
      trendDiv.appendChild(coma);
      trends.appendChild(trendDiv);

      //busqueda del trend al clickearlo
      trendP.addEventListener("click", () => {
        searchSuggestion(showTrend.data[i]);
      });
    }
    trendDiv.removeChild(trendDiv.lastChild); //borra la última coma
  } catch (err) {
    console.log(err);
  }
}
