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


function useOptionalModulesTimeline() {
  const [
    preset,
    setPreset,
  ] = useState("full");

  const [
    savedPulse,
    setSavedPulse,
  ] = useState(false);

  const [
    cycle,
    setCycle,
  ] = useState(0);


  useEffect(() => {
    /*
     * Reiniciamos siempre desde una
     * configuración completa.
     */

    setPreset("full");
    setSavedPulse(false);


    /*
     * 2 s
     *
     * Simplificamos Fénix para una
     * operación principalmente comercial.
     */

    const commerceTimer =
      setTimeout(() => {
        setPreset("commerce");
      }, 2000);


    const commerceSavedTimer =
      setTimeout(() => {
        setSavedPulse(true);
      }, 2500);


    const commerceSavedEndTimer =
      setTimeout(() => {
        setSavedPulse(false);
      }, 3300);


    /*
     * 4.7 s
     *
     * El negocio ahora necesita producción.
     */

    const productionTimer =
      setTimeout(() => {
        setPreset("production");
      }, 4700);


    const productionSavedTimer =
      setTimeout(() => {
        setSavedPulse(true);
      }, 5200);


    const productionSavedEndTimer =
      setTimeout(() => {
        setSavedPulse(false);
      }, 6000);


    /*
     * 7.3 s
     *
     * Mostramos una configuración orientada
     * a servicios.
     */

    const servicesTimer =
      setTimeout(() => {
        setPreset("services");
      }, 7300);


    const servicesSavedTimer =
      setTimeout(() => {
        setSavedPulse(true);
      }, 7800);


    const servicesSavedEndTimer =
      setTimeout(() => {
        setSavedPulse(false);
      }, 8600);


    /*
     * 9.6 s
     *
     * Regresamos a una configuración amplia.
     */

    const fullTimer =
      setTimeout(() => {
        setPreset("full");
      }, 9600);


    const finalSavedTimer =
      setTimeout(() => {
        setSavedPulse(true);
      }, 10100);


    const finalSavedEndTimer =
      setTimeout(() => {
        setSavedPulse(false);
      }, 10800);


    /*
     * Reiniciamos la microhistoria.
     */

    const restartTimer =
      setTimeout(() => {
        setCycle(
          (current) =>
            current + 1
        );
      }, 11600);


    return () => {
      clearTimeout(commerceTimer);
      clearTimeout(commerceSavedTimer);
      clearTimeout(commerceSavedEndTimer);

      clearTimeout(productionTimer);
      clearTimeout(productionSavedTimer);
      clearTimeout(productionSavedEndTimer);

      clearTimeout(servicesTimer);
      clearTimeout(servicesSavedTimer);
      clearTimeout(servicesSavedEndTimer);

      clearTimeout(fullTimer);
      clearTimeout(finalSavedTimer);
      clearTimeout(finalSavedEndTimer);

      clearTimeout(restartTimer);
    };

  }, [cycle]);


  return {
    preset,

    activeModules:
      MODULE_PRESETS[preset],

    savedPulse,
  };
}


export default useOptionalModulesTimeline;