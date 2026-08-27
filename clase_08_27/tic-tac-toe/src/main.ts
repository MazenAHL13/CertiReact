let jugadorActual = "X";
let juegoTerminado = false;

function tresEnRaya(casilla: HTMLTableCellElement) {
  if (juegoTerminado) {
    return;
  }

  if (casilla.textContent !== "") {
    return;
  }

  casilla.textContent = jugadorActual;

  if (alguienGano()) {
    mostrarMensaje("Ganó " + jugadorActual);
    juegoTerminado = true;
    return;
  }

  if (hayEmpate()) {
    mostrarMensaje("Empate");
    juegoTerminado = true;
    return;
  }

  cambiarJugador();
  mostrarTurno();
}

function cambiarJugador() {
  if (jugadorActual === "X") {
    jugadorActual = "0";
  } else {
    jugadorActual = "X";
  }
}

function mostrarTurno() {
  mostrarMensaje("Turno de " + jugadorActual);
}

function mostrarMensaje(texto: string) {
  const mensaje = document.getElementById("mensaje");

  if (mensaje !== null) {
    mensaje.textContent = texto;
  }
}

function alguienGano() {
  const casillas = document.querySelectorAll("td");

  return (
    sonIguales(casillas[0], casillas[1], casillas[2]) ||
    sonIguales(casillas[3], casillas[4], casillas[5]) ||
    sonIguales(casillas[6], casillas[7], casillas[8]) ||
    sonIguales(casillas[0], casillas[3], casillas[6]) ||
    sonIguales(casillas[1], casillas[4], casillas[7]) ||
    sonIguales(casillas[2], casillas[5], casillas[8]) ||
    sonIguales(casillas[0], casillas[4], casillas[8]) ||
    sonIguales(casillas[2], casillas[4], casillas[6])
  );
}

function sonIguales(
  casilla1: HTMLTableCellElement,
  casilla2: HTMLTableCellElement,
  casilla3: HTMLTableCellElement
) {
  return (
    casilla1.textContent !== "" &&
    casilla1.textContent === casilla2.textContent &&
    casilla2.textContent === casilla3.textContent
  );
}

function hayEmpate() {
  const casillas = document.querySelectorAll("td");

  for (let i = 0; i < casillas.length; i++) {
    if (casillas[i].textContent === "") {
      return false;
    }
  }

  return true;
}

const casillas = document.querySelectorAll<HTMLTableCellElement>("td");

for (let i = 0; i < casillas.length; i++) {
  casillas[i].addEventListener("click", () => tresEnRaya(casillas[i]));
}
