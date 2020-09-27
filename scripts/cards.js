let count = 0;
function gifCard(json, parentDiv, i) {
  let gifS = document.getElementById("gif" + i);
  //obtrngo la posición del gif con mouseover
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
  userTitle.innerHTML = json.username;
  gifName.innerHTML = json.title;
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
}
function gifCardOut() {
  let divViejo = document.getElementById("backDiv");
  if (divViejo != null) {
    divViejo.remove();
  }
}
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
