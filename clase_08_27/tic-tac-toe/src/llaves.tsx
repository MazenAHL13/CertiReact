import React from "react";

export default function EjemploLlaves() {
  const mensaje: string = "hola upb";
  const suma: number= 3 + 4;
  const sumar = (a:number, b: number): number=>{
    return a +b 
  }
  return (
    <section className="juego">
      <h1> {mensaje}</h1>
      <h2> 3 + 4 = {suma}</h2>
    </section>
  );
}
