import {
  useEffect,
  useState,
} from "react";


function useSalesSceneTimeline() {

  /*
   * =========================================
   * MÉTRICAS INICIALES
   * =========================================
   */

  const [
    salesTodayTarget,
    setSalesTodayTarget,
  ] = useState(1);


  const [
    incomeTodayTarget,
    setIncomeTodayTarget,
  ] = useState(153.92);


  const [
    monthlySalesTarget,
    setMonthlySalesTarget,
  ] = useState(4);


  /*
   * =========================================
   * EVENTOS VISUALES
   * =========================================
   */

  const [
    saleRegistered,
    setSaleRegistered,
  ] = useState(false);


  const [
    showToast,
    setShowToast,
  ] = useState(false);


  const [
    highlightMetrics,
    setHighlightMetrics,
  ] = useState(false);


  useEffect(() => {

    /*
     * 3.8 segundos
     *
     * Se registra una nueva venta.
     */

    const saleTimer =
      setTimeout(() => {

        setSaleRegistered(true);

        setShowToast(true);

        setHighlightMetrics(true);

        setSalesTodayTarget(2);

        setIncomeTodayTarget(
          307.84
        );

        setMonthlySalesTarget(5);

      }, 3800);


    /*
     * 5.6 segundos
     *
     * Retiramos el toast.
     */

    const toastTimer =
      setTimeout(() => {

        setShowToast(false);

      }, 5600);


    /*
     * 6.2 segundos
     *
     * Finaliza el pulso de métricas.
     */

    const metricsTimer =
      setTimeout(() => {

        setHighlightMetrics(false);

      }, 6200);


    return () => {

      clearTimeout(
        saleTimer
      );

      clearTimeout(
        toastTimer
      );

      clearTimeout(
        metricsTimer
      );

    };

  }, []);


  return {
    salesTodayTarget,
    incomeTodayTarget,
    monthlySalesTarget,

    saleRegistered,
    showToast,
    highlightMetrics,
  };
}


export default useSalesSceneTimeline;