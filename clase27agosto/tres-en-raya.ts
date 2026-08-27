let jugadorActual = "❌";

function TresEnRaya(casilla: HTMLTableCellElement) {
  if (casilla.textContent !== "") {
    return;
  }

  casilla.textContent = jugadorActual;

  cambiarJugador();
  mostrarTurno();
}

function cambiarJugador() {
  if (jugadorActual === "❌") {
    jugadorActual = "⭕";
  } else {
    jugadorActual = "❌";
  }
}

function mostrarTurno() {
  const mensaje = document.getElementById("mensaje");

  if (mensaje !== null) {
    mensaje.textContent = "Turno de " + jugadorActual;
  }
}