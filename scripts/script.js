//---------------TRENDING----------------

let TrendingContainer = document.getElementById("trending");

let fetchTrending = fetch(
  "https://api.giphy.com/v1/gifs/trending?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&limit=10"
)
  .then((response) => response.json())
  .then((json) => {
    AddTrendToDOM(json);
  });
//funcion para agregar los gifs a la página

function AddTrendToDOM(json) {
  let ctn = document.createElement("div");
  for (let i = 0; i < 10; i++) {
    let gif = document.createElement("img");
    gif.setAttribute("src", json.data[i].images.original.url);
    ctn.appendChild(gif);

    TrendingContainer.appendChild(ctn);
  }
}

//------------BUSCADOR-----------------------

//Funciones para agregar sugerencias a la barra de búsqueda
let SearchBar = document.getElementById("search_bar");
let inputCtn = document.getElementById("input_ctn");
let inputSearch = document.getElementById("searchInput");
let lupaImg = document.getElementById("lupa");
let closeImg = document.getElementById("close");
let linea = document.getElementById("linea");
let suggestCtn = document.getElementById("suggest_container");
let searchSection = document.getElementById("search_section");
let searchInput = inputSearch.value; //valor tipeado
console.log("Principio:" + searchInput);

inputSearch.addEventListener("focus", ShowSuggest);

function ShowSuggest() {
  SearchBar.className = "search_bar_clicked";
  lupaImg.className = "lupaImgHid"; //esconde la lupita
  inputSearch.addEventListener("input", suggest);
}
var contador = 0;

function suggest() {
  searchInput = document.getElementById("searchInput").value; //obtiene valor ingresado
  linea.className = "lineaShow"; //muestra el span
  lupaImg.className = "lupaImgShow"; //muestra la lupita

  let url1 =
    "https://api.giphy.com/v1/gifs/search/tags?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&q=" +
    searchInput;

  //primero borra cualquier sugerencia anterior a la encontrada para el nuevo input
  for (let i = 0; i < contador; i++) {
    let suggestDivs = document.getElementById("suggestDiv" + i);
    if (suggestDivs != null) {
      //si no hay ningún elemento para borrar pq no hubo busqueda, ignora
      suggestDivs.remove();
    }
  }

  //busca y muestra las sugerencias
  contador = 0;
  let fetchSuggest = fetch(url1);
  fetchSuggest
    .then((response) => response.json())
    .then((json) => {
      let json_data = json.data;

      for (let i = 0; i < json_data.length; i++) {
        let suggestionDiv = document.createElement("div");
        let suggestionP = document.createElement("p");

        let lupita = document.createElement("img");

        suggestionP.textContent = json_data[i].name;
        suggestionDiv.className = "suggestDiv";
        suggestionDiv.id = "suggestDiv" + i;

        lupita.setAttribute("src", "assets/icon-search.svg");

        suggestionDiv.appendChild(lupita);
        suggestionDiv.appendChild(suggestionP);

        suggestCtn.appendChild(suggestionDiv);

        suggestionP.addEventListener("click", function () {
          searchSuggestion(json_data[i].name);
        });
        suggestionP.addEventListener("click", hidSuggest);

        contador++;
      }
    });
}

//función para buscar los gifs al clickear las sugerencias
let searchButton = document.getElementById("lupa");
let searchCtn = document.getElementById("searchContainer");
let noResultsSearch = document.getElementById("noResultsSearch");

function searchSuggestion(info) {
  let url =
    "https://api.giphy.com/v1/gifs/search?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&q=" +
    info +
    "&limit=15&offset=0&rating=r&lang=es";
  console.log(url);
  //búsqueda del valor tipeado
  let fetchSearch = fetch(url);
  fetchSearch
    .then((response) => response.json())
    .then((json) => {
      searchCtn.className = "resultsShown";
      noResultsSearch.className = "noResultsHidden";
      addSearchToDOM(json, info);
    });
}
//eliminar las sugerencias
closeImg.addEventListener("click", hidSuggest); //si clickea la cruz

function hidSuggest() {
  linea.className = "lineaHid"; //esconde el span
  SearchBar.className = "search_bar";
  lupaImg.className = "lupaImgShow";

  for (let i = 0; i < contador; i++) {
    let suggestDivs = document.getElementById("suggestDiv" + i); //elije c/u de las sugerencias
    if (suggestDivs != null) {
      //si no hay ningún elemento para borrar pq no hubo busqueda, ignora
      suggestDivs.remove();
    }
  }
  console.log("eliminar" + contador);
  contador = 0;
}
//busqueda de palabra tipeada
lupaImg.addEventListener("click", function () {
  search(); //busca
  hidSuggest(); //borra sugerencias
});

inputSearch.addEventListener("keyup", function (event) {
  //evento al apretar enter
  if (event.key === "Enter") {
    search(); //busca
    hidSuggest(); //borra sugerencias
  }
});
//funcion para buscar la palabra tipeada
function search() {
  //defino la url de la búsqueda
  let url =
    "https://api.giphy.com/v1/gifs/search?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&q=" +
    searchInput +
    "&limit=15&offset=0&rating=r&lang=es";
  console.log(url);
  //búsqueda del valor tipeado
  let fetchSearch = fetch(url);
  fetchSearch
    .then((response) => response.json())
    .then((json) => {
      //si no se encuentra nada, muestra que no hay resultados
      if (json.pagination.total_count == 0) {
        searchCtn.className = "resultsHidden";
        noResultsSearch.className = "noResultsShown";
        let searchTitle = document.createElement("h2");

        searchTitle.textContent = searchInput;
        noResultsSearch.insertBefore(
          searchTitle,
          noResultsSearch.childNodes[0]
        );
      } else {
        //si encuetra los muestra por pantalla
        searchCtn.className = "resultsShown";
        noResultsSearch.className = "noResultsHidden";
        console.log(fetchSearch);
        addSearchToDOM(json, searchInput);
      }
    });
}

//agregado al DOM de los gifs buscados
function addSearchToDOM(json, name) {
  let resultadoViejo = document.getElementById("searchGifs");
  if (resultadoViejo != null) {
    for (let i = 0; i < 4; i++) {
      searchCtn.removeChild(searchCtn.firstChild);
    }
  }
  searchSection.className = "searchShown";
  let searchGifCtn = document.createElement("div");
  searchGifCtn.id = "searchGifs";
  let searchTitle = document.createElement("h2");
  let btn = document.createElement("button");
  for (let i = 0; i < 15; i++) {
    let gif = document.createElement("img");

    searchTitle.textContent = name;
    gif.setAttribute("src", json.data[i].images.original.url);
    btn.textContent = "Ver más";

    searchGifCtn.appendChild(gif);
    searchCtn.appendChild(searchTitle);
    searchCtn.appendChild(searchGifCtn);
    searchCtn.appendChild(btn);
  }
}
