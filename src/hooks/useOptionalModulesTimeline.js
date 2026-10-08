import {
  useEffect,
  useState,
} from "react";


const MODULE_PRESETS = {
  full: [
    "services",
    "raw-material",
    "products",
    "production",
    "sales",
    "surveys",
    "quotes",
    "orders",
  ],

  commerce: [
    "products",
    "sales",
    "quotes",
  ],

  production: [
    "raw-material",
    "products",
    "production",
    "sales",
    "quotes",
  ],

  services: [
    "services",
    "quotes",
    "orders",
  ],
};


function useOptionalModulesTimeline(
  isActive = true
) {
  const [
    preset,
    setPreset,
  ] = useState("full");


  const [
    savedPulse,
    setSavedPulse,
  ] = useState(false);


  const [
    cameraPhase,
    setCameraPhase,
  ] = useState(
    "overview"
  );


  const [
    cycle,
    setCycle,
  ] = useState(0);


  useEffect(() => {
    /*
     * Fuera del viewport dejamos la
     * escena preparada desde el inicio.
     *
     * Cuando vuelva a entrar, la historia
     * comenzará desde cero.
     */

    if (!isActive) {
      setPreset("full");

      setSavedPulse(false);

      setCameraPhase(
        "overview"
      );

      return undefined;
    }


    /* =====================================
       RESET
       ===================================== */

    setPreset("full");

    setSavedPulse(false);

    setCameraPhase(
      "overview"
    );


    const timers = [];


    const schedule = (
      callback,
      delay
    ) => {
      const timer =
        setTimeout(
          callback,
          delay
        );

      timers.push(timer);
    };



    /* =====================================
       MOBILE CAMERA

       Desktop ignora visualmente estas
       fases mediante CSS.
       ===================================== */


    /*
     * 0 - 0.9 s
     *
     * Mostramos la pantalla completa.
     */

    schedule(
      () => {
        setCameraPhase(
          "modules"
        );
      },
      900
    );



    /* =====================================
       2 s
       COMMERCE
       ===================================== */

    schedule(
      () => {
        setPreset(
          "commerce"
        );
      },
      2000
    );


    schedule(
      () => {
        setSavedPulse(true);
      },
      2500
    );


    schedule(
      () => {
        setSavedPulse(false);
      },
      3300
    );



    /* =====================================
       PREPARAMOS CÁMARA PARA VER
       NUEVOS MÓDULOS EN SIDEBAR
       ===================================== */

    schedule(
      () => {
        setCameraPhase(
          "sidebar"
        );
      },
      4350
    );



    /* =====================================
       4.7 s
       PRODUCTION

       Materia Prima y Producción
       reaparecen mientras observamos
       el sidebar.
       ===================================== */

    schedule(
      () => {
        setPreset(
          "production"
        );
      },
      4700
    );


    schedule(
      () => {
        setSavedPulse(true);
      },
      5200
    );


    schedule(
      () => {
        setSavedPulse(false);
      },
      6000
    );


    /*
     * Abrimos ligeramente la cámara.
     */

    schedule(
      () => {
        setCameraPhase(
          "balanced"
        );
      },
      5550
    );


    /*
     * Volvemos hacia los switches.
     */

    schedule(
      () => {
        setCameraPhase(
          "modules"
        );
      },
      6250
    );



    /* =====================================
       7.3 s
       SERVICES

       Primero miramos el sidebar.
       Después aparecen Servicios y
       Órdenes de Servicio.
       ===================================== */

    schedule(
      () => {
        setCameraPhase(
          "sidebar"
        );
      },
      6950
    );


    schedule(
      () => {
        setPreset(
          "services"
        );
      },
      7300
    );


    schedule(
      () => {
        setSavedPulse(true);
      },
      7800
    );


    schedule(
      () => {
        setSavedPulse(false);
      },
      8600
    );


    schedule(
      () => {
        setCameraPhase(
          "balanced"
        );
      },
      8150
    );



    /* =====================================
       PREPARAMOS EL REGRESO A FULL
       ===================================== */

    schedule(
      () => {
        setCameraPhase(
          "modules"
        );
      },
      8800
    );


    schedule(
      () => {
        setCameraPhase(
          "sidebar"
        );
      },
      9350
    );



    /* =====================================
       9.6 s
       FULL

       Varios módulos reaparecen y reciben
       el flash navy que ya aprobamos.
       ===================================== */

    schedule(
      () => {
        setPreset(
          "full"
        );
      },
      9600
    );


    schedule(
      () => {
        setSavedPulse(true);
      },
      10100
    );


    schedule(
      () => {
        setSavedPulse(false);
      },
      10800
    );


    schedule(
      () => {
        setCameraPhase(
          "balanced"
        );
      },
      10400
    );


    /*
     * Antes de reiniciar regresamos
     * suavemente a la vista completa.
     */

    schedule(
      () => {
        setCameraPhase(
          "overview"
        );
      },
      11000
    );



    /* =====================================
       RESTART
       ===================================== */

    schedule(
      () => {
        setCycle(
          (current) =>
            current + 1
        );
      },
      11600
    );


    return () => {
      timers.forEach(
        (timer) => {
          clearTimeout(timer);
        }
      );
    };

  }, [
    cycle,
    isActive,
  ]);


  return {
    preset,

    activeModules:
      MODULE_PRESETS[
        preset
      ],

    savedPulse,

    cameraPhase,
  };
}


export default useOptionalModulesTimeline;