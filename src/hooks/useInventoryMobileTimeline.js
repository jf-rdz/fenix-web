import {
  useEffect,
  useState,
} from "react";

function useInventoryMobileTimeline() {
  const [bellPulse, setBellPulse] =
    useState(false);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [highlightAlert, setHighlightAlert] =
    useState(false);

  useEffect(() => {
    /*
     * 2.0s
     * La campana empieza a llamar la atención.
     */
    const bellStartTimer =
      setTimeout(() => {
        setBellPulse(true);
      }, 2000);

    /*
     * 3.0s
     * Se abre el panel de notificaciones.
     */
    const openDrawerTimer =
      setTimeout(() => {
        setDrawerOpen(true);
      }, 3000);

    /*
     * 3.45s
     * Enfatizamos la alerta de stock.
     */
    const highlightTimer =
      setTimeout(() => {
        setHighlightAlert(true);
      }, 3450);

    /*
     * 6.7s
     * Retiramos el foco principal.
     */
    const unhighlightTimer =
      setTimeout(() => {
        setHighlightAlert(false);
      }, 6700);

    /*
     * 7.2s
     * Cerramos el drawer para regresar a contexto.
     */
    const closeDrawerTimer =
      setTimeout(() => {
        setDrawerOpen(false);
      }, 7200);

    /*
     * 7.3s
     * Dejamos de pulsar la campana.
     */
    const bellStopTimer =
      setTimeout(() => {
        setBellPulse(false);
      }, 7300);

    return () => {
      clearTimeout(bellStartTimer);
      clearTimeout(openDrawerTimer);
      clearTimeout(highlightTimer);
      clearTimeout(unhighlightTimer);
      clearTimeout(closeDrawerTimer);
      clearTimeout(bellStopTimer);
    };
  }, []);

  return {
    bellPulse,
    drawerOpen,
    highlightAlert,
  };
}

export default useInventoryMobileTimeline;