let modeSwitch = document.getElementById("toggleModes");
let Mode = "Light";
modeSwitch.addEventListener("click", () => {
  switchMode(Mode);
  if (Mode == "Light") {
    Mode = "Dark";
  } else if (Mode == "Dark") {
    Mode = "Light";
  }
});
function swithcMode(Mode) {
  if (Mode == "Dark") {
    document.documentElement.style.setproperty("--colorPricipal", "valor");
    document.documentElement.style.setproperty("--colorSecundario", "valor");
    document.documentElement.style.setproperty("--colorBackground", "#37383C");
    document.documentElement.style.setproperty("--clPrincTrans", "valor");
    document.documentElement.style.setproperty("--clSpanHamb", "valor");
    document.documentElement.style.setproperty("--colorSearchs", "#9CAFC3");
    document.documentElement.style.setproperty("--trendBackColor", "valor");
    document.documentElement.style.setproperty("--letrasNegras", "valor");
  } else if (Mode == "light") {
    document.documentElement.style.setproperty("--colorPricipal", "#572ee5");
    document.documentElement.style.setproperty("--colorSecundario", "#50e3c2");
    document.documentElement.style.setproperty("--colorBackground", "#ffffff");
    document.documentElement.style.setproperty(
      "--clPrincTrans",
      "rgba(87, 46, 229, 0.9)"
    );
    document.documentElement.style.setproperty(
      "--clSpanHamb",
      "rgba(255, 255, 255, 0.3)"
    );
    document.documentElement.style.setproperty("--colorSearchs", " #9cafc3");
    document.documentElement.style.setproperty("--trendBackColor", "#f3f5f8");
    document.documentElement.style.setproperty("--letrasNegras", "#000000");
  } else {
    console.log("fuck");
  }
}
