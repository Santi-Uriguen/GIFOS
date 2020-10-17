let favArray = [];
let favSection = document.getElementById("fav_section");
let favResults = document.getElementById("favContainer");
let favNoResults = document.getElementById("noFavsContainer");

async function addFavorito() {
  try {
    let favString = "";
    favArray = [];
    //pasamos los ID de los gifs selecconados como fav a un array
    for (let i = 1; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let favorito = localStorage.getItem(key);
      favArray.push(favorito);
    }

    favString = favArray.join(); //pasa el array a un string separando cada ID por coma
    //json con cada uno de los ID faveados
    if (favString == "") {
      favResults.className = "resultsHidden";
      favNoResults.className = "noResultsShown";
    } else {
      favResults.className = "resultsShown";
      favNoResults.className = "noResultsHidden";
      const response = await fetch(
        `https://api.giphy.com/v1/gifs?api_key=DFJMwNpnYUlQLGLD8NaC15hkWGAi8IMN&ids=${favString}`
      );
      const favs = await response.json();
      favResults.innerHTML = "";
      console.log(favs);
      //mostramos los gifs por pantalla
      let divCtn = document.createElement("div");
      divCtn.id = "favDivCtn";
      divCtn.className = "favDivCtn";
      for (let i = 0; i < 12; i++) {
        //crea los nodos para c/u de los gifs
        let gif = document.createElement("img");

        gif.setAttribute("src", favs.data[i].images.downsized_medium.url);
        gif.id = "gif" + i;
        gif.className = "favGif";

        divCtn.appendChild(gif);
        favResults.appendChild(divCtn);
        //los gifs de favoritos tmb tienen que tener tarjeta
        gif.addEventListener("mouseover", () => {
          mode = "";
          gifCard(favs, divCtn, i);
        });
        gif.addEventListener("click", () => {
          mode = "mobile";
          gifCard(favs, divCtn, i);
        });
      }
      if (favs.data.length > 12) {
        let btn = document.createElement("button");
        btn.addEventListener("click", () => {
          verMas(favs, divCtn);
        });
        btn.textContent = "Ver más";
        btn.id = "btnVerMas";
        favResults.appendChild(btn);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
