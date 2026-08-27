const tablero = document.getElementById("tablero");
const posicionBomba = 4;
const totalCasillas = 9;

function mostrarBombaEnTodasLasCasillas() {
  const casillas = document.querySelectorAll(".casilla");

  casillas.forEach(function (casilla) {
    casilla.textContent = "bomba";
  });
}

function crearCasilla(posicion) {
  const casilla = document.createElement("button");

  casilla.className = "casilla";

  casilla.addEventListener("click", function () {
    if (posicion === posicionBomba) {
      mostrarBombaEnTodasLasCasillas();
    } else {
      casilla.textContent = "bien";
    }
  });

  return casilla;
}

if (tablero !== null) {
  for (let posicion = 0; posicion < totalCasillas; posicion++) {
    const casilla = crearCasilla(posicion);
    tablero.appendChild(casilla);
  }
}