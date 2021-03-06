let count = 0;

function gifCard(json, divContainer, i, mode, desktopCard, mobileCard) {
  let gifS;
  let idContainer = divContainer.id;
  //indico a qué gifs hace referencia para calcular la posición de la tarjeta
  if (idContainer === "trendCtn") {
    gifS = document.getElementById("trendGif" + i);
  } else {
    gifS = document.getElementById("gif" + i);
  }
  //obtengo la posición del gif con mouseover
  let top = gifS.offsetTop; //obtiene altura en px
  let left = gifS.offsetLeft; //obtiene left en px
  let width = divContainer.offsetWidth; //obtiene width en px
  //identifico desde dónde se llamó a la función y recalculo las distancias si fue desde el slide del trending
  if (idContainer === "trendCtn") {
    if (i === 3 || i === 4 || i === 5) {
      left = left - width;
    } else if (i === 6 || i === 7 || i === 8) {
      left = left - width * 2;
    } else if (i === 9 || i === 10 || i === 11) {
      left = left - width * 3;
    } else {
    }
  }

  //creo la tarjeta y sus componentes
  let backDiv = document.createElement("div");
  let divIcons = document.createElement("div");
  let divText = document.createElement("div");
  let favBtn = document.createElement("img");
  let dwlBtn = document.createElement("img");
  let fullBtn = document.createElement("img");
  let userTitle = document.createElement("p");
  let gifName = document.createElement("p");
  let gifID = json.data[i].id;
  let IDVieja = localStorage.getItem("favGif" + gifID);

  //defino los estilos, entre los que están la posición del gif con mouseover
  backDiv.className = "cardDiv";
  backDiv.id = "backDiv";
  backDiv.style.top = top + "px";
  backDiv.style.left = left + "px";
  divContainer.insertBefore(backDiv, divContainer.children[i]);

  //resto de los componentes
  divIcons.className = "divIcons";
  divText.className = "divText";
  dwlBtn.setAttribute("src", "assets/icon-download.svg");
  fullBtn.setAttribute("src", "assets/icon-max.svg");
  userTitle.innerHTML =
    json.data[i].username.charAt(0).toUpperCase() +
    json.data[i].username.slice(1); //mayúscula primera letra
  gifName.innerHTML =
    json.data[i].title.charAt(0).toUpperCase() + json.data[i].title.slice(1); //mayuscula primera letra
  //defino el botón de descarga
  dwlBtn.addEventListener("click", () => downloadGif(gifS, gifName.innerHTML));
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

  //mobile
  if (mode == "mobile") {
    gifMax(divContainer, i, json, divIcons, desktopCard, mobileCard);
    backDiv.remove();
  } else {
    backDiv.appendChild(divIcons);
    backDiv.appendChild(divText);
  }
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
    }
  });
  fullBtn.addEventListener("click", () => {
    gifMax(divContainer, i, json, divIcons, desktopCard, mobileCard);
    backDiv.removeEventListener("mouseout", gifCardOut);
    backDiv.remove();
  });
}

//FUNCIONES
//elimina la tarjeta si sacamos el mouse de encima
function gifCardOut() {
  let divViejo = document.querySelectorAll("#backDiv");
  console.log(divViejo);
  if (divViejo != null) {
    divViejo.forEach((element) => {
      element.remove();
    });
  }
}
//agrega el gif a favoritos o lo elimina si ya estaba
function addFav(ID, count) {
  if (localStorage.getItem("favGif" + ID) === null) {
    localStorage.setItem("favGif" + ID, ID);
    favBtn.setAttribute("src", "assets/icon-fav-active.svg");
    console.log(localStorage);
  } else {
    localStorage.removeItem("favGif" + ID);
    favBtn.setAttribute("src", "assets/icon-fav-hover.svg");
  }
}
//muestra el gif grande
function gifMax(containerDiv, i, json, botones, desktopCard, mobileCard) {
  containerDiv.className = "maxed"; //clases para mostrar el gif grande

  let gifMaxed = document.getElementById("gif" + i);
  if (gifMaxed == null) {
    return;
  }
  gifMaxed.className = "gifMaxed";
  //crea todos los elementos de la card
  let btnRight = document.createElement("img");
  let btnLeft = document.createElement("img");
  let closeBtn = document.createElement("img");
  let text = document.createElement("div");
  let username = document.createElement("p");
  let gifName = document.createElement("p");
  let btn = botones.cloneNode(true);
  let next = i + 4;

  text.className = "divText";
  username.innerHTML =
    json.data[i].username.charAt(0).toUpperCase() +
    json.data[i].username.slice(1); //mayúscula primera letra
  gifName.innerHTML =
    json.data[i].title.charAt(0).toUpperCase() + json.data[i].title.slice(1); //mayuscula primera letra
  //elimino funciones viejas

  gifMaxed.removeEventListener("mouseover", desktopCard);
  gifMaxed.removeEventListener("click", mobileCard);

  btn.lastChild.remove(); //el boton de pantalla completa ya no está
  btn.firstChild.addEventListener("click", () => {
    //agregado/quitado de un gif a favortios
    addFav(json.data[i].id, count);
    if (count == 0) {
      count++;
    } else if (count == 1) {
      count--;
    } else {
    }
  });
  btn.lastChild.addEventListener("click", () =>
    downloadGif(gifMaxed, gifName.innerHTML)
  );
  closeBtn.setAttribute("src", "assets/close.svg");
  closeBtn.className = "close";
  closeBtn.addEventListener("click", () => {
    //evento para cerrar la vista ampliada
    closeMaxed(containerDiv, btnRight, btnLeft, text, btn, gifMaxed, closeBtn);
    //vuelve a poner los eventos de la card
    gifMaxed.addEventListener("mouseover", desktopCard);
    gifMaxed.addEventListener("click", mobileCard);
  });

  btnRight.setAttribute("src", "assets/button-slider-right.svg");
  btnRight.id = "rgtBtn";
  //evento al clickear la flecha de la derecha
  //tengo que agregarle la función del botón "ver más" para poder ver más de los 12 primeros gifs mostrados
  console.log(i);
  console.log(gifMaxed.id);
  if (i === 11 || i === 23 || i === 35) {
    btnRight.addEventListener("click", () => {
      gifCardOut();
      verMas(json, containerDiv);
      i++;
      closeMaxed(
        containerDiv,
        btnRight,
        btnLeft,
        text,
        btn,
        gifMaxed,
        closeBtn
      );
      gifMax(containerDiv, i, json, botones, desktopCard, mobileCard);
    });
  } else {
    btnRight.addEventListener("click", () => {
      i++;
      gifCardOut();
      closeMaxed(
        containerDiv,
        btnRight,
        btnLeft,
        text,
        btn,
        gifMaxed,
        closeBtn
      );
      gifMax(containerDiv, i, json, botones, desktopCard, mobileCard);
    });
  }
  btnLeft.setAttribute("src", "assets/button-slider-left.svg");
  btnLeft.id = "lftBtn";
  btnLeft.addEventListener("click", () => {
    i--;
    closeMaxed(containerDiv, btnRight, btnLeft, text, btn, gifMaxed, closeBtn);
    gifMax(containerDiv, i, json, botones, desktopCard, mobileCard);
  });
  btnRight.className = "maxButtons";
  btnLeft.className = "maxButtons";

  //agregado al DOM
  text.appendChild(username);
  text.appendChild(gifName);
  //límite izquierdo
  if (i === 0) {
    btnLeft.remove();
  } else {
    containerDiv.insertBefore(btnLeft, containerDiv.children[i]);
  }
  containerDiv.insertBefore(closeBtn, containerDiv.children[i]);
  //límite derecho
  if (gifMaxed.id === "gif47") {
    btnRight.remove();
  } else {
    containerDiv.insertBefore(btnRight, containerDiv.children[next]);
  }
  containerDiv.appendChild(text);
  containerDiv.appendChild(btn);
}

function closeMaxed(
  container,
  btnRight,
  btnLeft,
  text,
  btn,
  gifMaxed,
  closeBtn
) {
  container.className = "searchGifs";
  gifMaxed.classList.remove("gifMaxed");
  btnRight.remove();
  btnLeft.remove();
  closeBtn.remove();
  text.remove();
  btn.remove();
}
//función para descargar el gif

async function downloadGif(gifS, gifName) {
  try {
    let src = gifS.getAttribute("src");
    let a = document.createElement("a");
    //busco el nombre del gif
    let response = await fetch(src);
    let url = await response.blob();
    a.href = window.URL.createObjectURL(url);
    a.download = gifName;
    a.click();
  } catch (err) {
    console.log(err);
  }
}
