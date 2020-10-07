let count = 0;

function gifCard(json, parentDiv, i, mode) {
  let gifS = document.getElementById("gif" + i);
  //obtengo la posición del gif con mouseover
  let top = gifS.offsetTop;
  let left = gifS.offsetLeft;

  //creo la tarjeta y sus componentes
  let backDiv = document.createElement("div");
  let divIcons = document.createElement("div");
  let divText = document.createElement("div");
  let favBtn = document.createElement("img");
  let dwlBtn = document.createElement("img");
  let fullBtn = document.createElement("img");
  let userTitle = document.createElement("p");
  let gifName = document.createElement("p");
  let gifID = json.id;
  let IDVieja = sessionStorage.getItem("favGif" + gifID);

  //defino los estilos, entre los que están la posición del gif con museover
  backDiv.className = "cardDiv";
  backDiv.id = "backDiv";
  backDiv.style.top = top + "px";
  backDiv.style.left = left + "px";
  parentDiv.insertBefore(backDiv, parentDiv.children[i]);

  //resto de los componentes
  divIcons.className = "divIcons";
  divText.className = "divText";
  dwlBtn.setAttribute("src", "assets/icon-download.svg");
  fullBtn.setAttribute("src", "assets/icon-max.svg");
  userTitle.innerHTML =
    json.username.charAt(0).toUpperCase() + json.username.slice(1); //mayúscula primera letra
  gifName.innerHTML = json.title.charAt(0).toUpperCase() + json.title.slice(1); //mayuscula primera letra

  //cambio de la imágen de botón de favoritos
  if (IDVieja == gifID) {
    favBtn.setAttribute("src", "assets/icon-fav-active.svg");
  } else {
    favBtn.setAttribute("src", "assets/icon-fav-hover.svg");
  }

  divIcons.appendChild(favBtn);
  divIcons.appendChild(dwlBtn);
  divIcons.appendChild(fullBtn);
  divText.appendChild(userTitle);
  divText.appendChild(gifName);

  backDiv.appendChild(divIcons);
  backDiv.appendChild(divText);
  //eventos
  backDiv.addEventListener("mouseout", gifCardOut); //elimina la tarjeta al hacer mouseout

  favBtn.addEventListener("click", () => {
    //agregado/quitado de un gif a favortios
    addFav(gifID, count);
    if (count == 0) {
      count++;
    } else if (count == 1) {
      count--;
    } else {
      console.log("fuuuuck");
    }
  });
  dwlBtn;
  fullBtn.addEventListener("click", () => {
    gifMax(json, backDiv);
    backDiv.removeEventListener("mouseout", gifCardOut);
    console.log("acá sí");
  });

  //mobile
  if (mode == "mobile") {
    gifMax(json, backDiv);
  }
}

//FUNCIONES
//elimina la tarjeta si sacamos el mouse de encima
function gifCardOut() {
  let divViejo = document.getElementById("backDiv");
  if (divViejo != null) {
    divViejo.remove();
  }
}
//agrega el gif a favoritos o lo elimina si ya estaba
function addFav(ID, count) {
  if (count == 0) {
    sessionStorage.setItem("favGif" + ID, ID);
    favBtn.setAttribute("src", "assets/icon-fav-active.svg");
    console.log(sessionStorage);
  } else {
    sessionStorage.removeItem("favGif" + ID);
    favBtn.setAttribute("src", "assets/icon-fav-hover.svg");
    console.log(sessionStorage);
  }
}
//muestra el gif grande
function gifMax(json, back) {
  let newBack = back.cloneNode(true);
  let main = document.querySelector("main");
  let gif = document.createElement("img");
  let cross = document.createElement("img");
  newBack.removeEventListener("mouseout", gifCardOut);

  gif.setAttribute("src", json.images.original.url);
  gif.className = "gifMaxed";
  cross.setAttribute("src", "assets/close.svg");
  cross.className = "cross";
  newBack.className = "gifMax";

  main.insertBefore(newBack, main.children[0]);
  newBack.insertBefore(cross, newBack.children[0]);
  newBack.insertBefore(gif, newBack.children[1]);

  cross.addEventListener("click", () => {
    newBack.remove();
  });
}

//Funciones para crear la tarjeta en mobile
function gifCardMobile(json, parentDiv, i) {}
