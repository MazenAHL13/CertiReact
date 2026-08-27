let turno = "X";
let juegoTerminado = false;

function TresEnRaya(casilla: HTMLTableCellElement) {
  if (juegoTerminado || casilla.textContent !== "") {
    return;
  }

  casilla.textContent = turno;

  turno = turno === "X" ? "O" : "X";

  const mensaje = document.getElementById("mensaje");

  if (mensaje !== null) {
    mensaje.textContent = "Turno de " + turno;
  }
}