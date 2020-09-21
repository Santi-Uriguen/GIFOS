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
let searchButton = document.getElementById("lupa");
let searchCtn = document.getElementById("searchContainer");
let searchGifCtn = document.getElementById("searchGifs");
let noResultsSearch = document.getElementById("noResultsSearch");

searchButton.addEventListener("click", search);

function search() {
  let searchInput = document.getElementById("searchInput").value; //valor tipeado
  url =
    "https://api.giphy.com/v1/gifs/search?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&q=" +
    searchInput +
    "&limit=15&offset=0&rating=r&lang=es";
  console.log(url);

  //búsqueda y muestra del valor tipeado
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
        searchCtn.className = "resultsShown";
        noResultsSearch.className = "noResultsHidden";
        console.log(fetchSearch);
        addSearchToDOM(json, searchInput);
      }
    });
}

//agregado al DOM de los gifs buscados
function addSearchToDOM(json, name) {
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
