import React, { useState } from "react";

export default function Contador() {
  const [contador, setContador] = useState(0);

  const contar = (): void => {
    setContador(contador + 1);
  };

  return <button onClick={contar}>Contador: {contador}</button>;
}
