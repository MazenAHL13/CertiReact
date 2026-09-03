import { useEffect, useRef, useState } from "react";

export default function SpaceInvaders() {
  // Posicion del jugador. left mueve de lado a lado y bottom mueve arriba/abajo.
  const [left, setLeft] = useState<number>(0);
  const [bottom, setBottom] = useState<number>(0);

  // Posicion del bloque que cae desde arriba.
  // blockTop empieza en 0 porque el profesor pidio usar top: 0.
  const [blockTop, setBlockTop] = useState<number>(0);
  const [blockLeft, setBlockLeft] = useState<number>(10);

  // La bala empieza como null porque no hay bala en pantalla al inicio.
  const [weapon, setWeapon] = useState<{ left: number; bottom: number } | null>(
    null,
  );

  // Guardamos las teclas presionadas para mover al jugador de forma continua.
  const pressedKeys = useRef(new Set<string>());

  // Guardamos la posicion actual del jugador para poder disparar desde ahi.
  const playerPosition = useRef({ left: 0, bottom: 0 });

  // Limites simples del tablero, medidos en rem.
  const gameWidth = 20;
  const gameHeight = 15;

  useEffect(() => {
    // Cuando se presiona una flecha, la guardamos en pressedKeys.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        pressedKeys.current.add(e.key);
      }

      // Con la barra espaciadora disparamos una bala.
      if (e.key === " ") {
        e.preventDefault();
        setWeapon((currentWeapon) => {
          // Si ya hay una bala en pantalla, no creamos otra.
          if (currentWeapon) {
            return currentWeapon;
          }

          // La bala sale desde la posicion actual del jugador.
          return {
            left: playerPosition.current.left,
            bottom: playerPosition.current.bottom + 1,
          };
        });
      }
    };

    // Cuando se suelta una tecla, la quitamos de pressedKeys.
    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.current.delete(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Este intervalo revisa las teclas presionadas y mueve al jugador.
    const movement = setInterval(() => {
      if (pressedKeys.current.has("ArrowLeft")) {
        setLeft((prev) => {
          const nextLeft = Math.max(0, prev - 1);
          playerPosition.current.left = nextLeft;
          return nextLeft;
        });
      }
      if (pressedKeys.current.has("ArrowRight")) {
        setLeft((prev) => {
          const nextLeft = Math.min(gameWidth, prev + 1);
          playerPosition.current.left = nextLeft;
          return nextLeft;
        });
      }
      if (pressedKeys.current.has("ArrowDown")) {
        setBottom((prev) => {
          const nextBottom = Math.max(0, prev - 1);
          playerPosition.current.bottom = nextBottom;
          return nextBottom;
        });
      }
      if (pressedKeys.current.has("ArrowUp")) {
        setBottom((prev) => {
          const nextBottom = Math.min(gameHeight, prev + 1);
          playerPosition.current.bottom = nextBottom;
          return nextBottom;
        });
      }
    }, 100);

    // Limpieza: quitamos los eventos y el intervalo cuando el componente se cierre.
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(movement);
    };
  }, []);

  useEffect(() => {
    // Este intervalo hace que el bloque baje poco a poco.
    const fallingBlock = setInterval(() => {
      setBlockTop((prev) => {
        // Si el bloque llega abajo, vuelve a empezar arriba en otra columna.
        if (prev >= gameHeight) {
          setBlockLeft(Math.floor(Math.random() * gameWidth));
          return 0;
        }

        return prev + 1;
      });
    }, 400);

    // Limpieza del intervalo del bloque.
    return () => clearInterval(fallingBlock);
  }, []);

  useEffect(() => {
    // Si no hay bala, no hacemos nada.
    if (!weapon) {
      return;
    }

    // Este intervalo mueve la bala hacia arriba.
    const movingWeapon = setInterval(() => {
      setWeapon((currentWeapon) => {
        if (!currentWeapon) {
          return null;
        }

        // Convertimos bottom de la bala a top para comparar con el bloque.
        const weaponTop = gameHeight - currentWeapon.bottom;

        // Revisamos si la bala esta en la misma columna y altura que el bloque.
        const hitsBlock =
          currentWeapon.left === blockLeft &&
          weaponTop >= blockTop &&
          weaponTop <= blockTop + 1;

        // Si la bala toca el bloque, el bloque vuelve arriba y la bala desaparece.
        if (hitsBlock) {
          setBlockTop(0);
          setBlockLeft(Math.floor(Math.random() * gameWidth));
          return null;
        }

        // Si la bala llega arriba del tablero, desaparece.
        if (currentWeapon.bottom >= gameHeight) {
          return null;
        }

        // Si no choca, la bala sigue subiendo.
        return { ...currentWeapon, bottom: currentWeapon.bottom + 1 };
      });
    }, 80);

    // Limpieza del intervalo de la bala.
    return () => clearInterval(movingWeapon);
  }, [weapon, blockTop, blockLeft]);

  return (
    <>
      <h1>Space Invaders</h1>
      <div className="game">
        {/* Bloque que cae. Usa top para empezar desde arriba. */}
        <div
          className="block"
          style={{ left: `${blockLeft}rem`, top: `${blockTop}rem` }}
        ></div>

        {/* Jugador. Usa bottom para empezar desde abajo. */}
        <div
          className="shoot"
          style={{ left: `${left}rem`, bottom: `${bottom}rem` }}
        ></div>

        {/* Bala. Solo aparece cuando weapon no es null. */}
        {weapon && (
          <div
            className="weapon"
            style={{
              left: `${weapon.left}rem`,
              bottom: `${weapon.bottom}rem`,
            }}
          ></div>
        )}
      </div>
    </>
  );
}
