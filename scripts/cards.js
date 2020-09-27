function gifCard(json, parentDiv, i) {
  console.log(json);
  let gifS = document.getElementById("gif" + i);
  //obtrngo la posición del gif con mouseover
  let top = gifS.offsetTop;
  console.log(top);
  let left = gifS.offsetLeft;
  console.log(left);
  //creo la tarjeta y sus componentes
  let backDiv = document.createElement("div");
  let divIcons = document.createElement("div");
  let divText = document.createElement("div");
  let favBtn = document.createElement("img");
  let dwlBtn = document.createElement("img");
  let fullBtn = document.createElement("img");
  let userTitle = document.createElement("p");
  let gifName = document.createElement("p");

  //defino los estilos, entre los que están la posición del gif con museover
  backDiv.className = "cardDiv";
  backDiv.id = "backDiv";
  backDiv.style.top = top + "px";
  backDiv.style.left = left + "px";
  parentDiv.insertBefore(backDiv, parentDiv.children[i]);

  //resto de los componentes
  divIcons.className = "divIcons";
  divText.className = "divText";
  favBtn.setAttribute("src", "assets/icon-fav-hover.svg");
  dwlBtn.setAttribute("src", "assets/icon-download.svg");
  fullBtn.setAttribute("src", "assets/icon-max.svg");
  userTitle.innerHTML = json.username;
  gifName.innerHTML = json.title;

  divIcons.appendChild(favBtn);
  divIcons.appendChild(dwlBtn);
  divIcons.appendChild(fullBtn);
  divText.appendChild(userTitle);
  divText.appendChild(gifName);

  backDiv.appendChild(divIcons);
  backDiv.appendChild(divText);
}
function gifCardOut() {
  let divViejo = document.getElementById("backDiv");
  divViejo.remove();
}
