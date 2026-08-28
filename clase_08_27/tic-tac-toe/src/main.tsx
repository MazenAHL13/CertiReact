import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Contador from "./contador";
import "./style.css";
import EjemploLlaves from "./llaves";

const contenedor = document.querySelector("#root");

const root = createRoot(contenedor!);

root.render(
  <StrictMode>
    <EjemploLlaves/>
    <Contador />
  </StrictMode>
);
