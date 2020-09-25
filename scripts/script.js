//---------------TRENDING GIFS---------------

let TrendingContainer = document.getElementById("trending");
window.addEventListener("load", addTrending);

//funcion para agregar los gifs a la página
async function addTrending() {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&limit=10`
    );
    const trend = await response.json();
    let ctn = document.createElement("div");
    for (let i = 0; i < 10; i++) {
      let gif = document.createElement("img");
      gif.setAttribute("src", trend.data[i].images.original.url);
      ctn.appendChild(gif);

      TrendingContainer.appendChild(ctn);
    }
  } catch (err) {
    console.log(err);
  }
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
      let suggestionP = document.createElement("p");

      let lupita = document.createElement("img");

      suggestionP.textContent = element.name;
      suggestionDiv.className = "suggestDiv";
      suggestionDiv.id = "suggestDiv";

      lupita.setAttribute("src", "assets/icon-search-active.svg");

      suggestionDiv.appendChild(lupita);
      suggestionDiv.appendChild(suggestionP);

      suggestCtn.appendChild(suggestionDiv);

      suggestionP.addEventListener("click", function () {
        searchSuggestion(element.name);
        hidSuggest();
        inputSearch.value = "";
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
    let url = "";
    console.log(info);
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
});

inputSearch.addEventListener("keyup", function (event) {
  //evento al apretar enter
  if (event.key === "Enter") {
    search(); //busca
    hidSuggest(); //borra sugerencias
    inputSearch.value = ""; //borra lo que está escrito en el input
  }
});

//funcion para buscar la palabra tipeada
async function search() {
  try {
    searchSection.className = "searchShown";
    let tipeado = inputSearch.value;
    //búsqueda del valor tipeado
    console.log(inputSearch.value);
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&q=${tipeado}&limit=36&offset=0&rating=r&lang=es`
    );

    const busqueda = await response.json();
    console.log(busqueda);

    if (busqueda.pagination.total_count == 0) {
      searchCtn.className = "resultsHidden";
      noResultsSearch.className = "noResultsShown";
      let searchTitle = document.createElement("h2");

      searchTitle.textContent = tipeado;
      noResultsSearch.insertBefore(searchTitle, noResultsSearch.childNodes[0]);
    } else {
      //si encuetra los muestra por pantalla
      searchCtn.className = "resultsShown";
      noResultsSearch.className = "noResultsHidden";
      console.log("else " + tipeado);
      addSearchToDOM(busqueda, tipeado);
    }
  } catch (err) {
    console.log(err);
  }
}

//agregado al DOM de los gifs buscados
function addSearchToDOM(json, name) {
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

let cont = 0;
function verMas(json, div) {
  if (cont == 0) {
    for (let i = 12; i < 24; i++) {
      let gif = document.createElement("img");
      gif.setAttribute("src", json.data[i].images.original.url);
      div.appendChild(gif);
      cont++;
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
