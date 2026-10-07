import {
  useEffect,
  useState,
} from "react";


function useReportsSceneTimeline() {
  const [
    commercialExpanded,
    setCommercialExpanded,
  ] = useState(false);

  const [
    highlightSalesReport,
    setHighlightSalesReport,
  ] = useState(false);

  const [
    activeView,
    setActiveView,
  ] = useState("overview");

  const [
    metricFocus,
    setMetricFocus,
  ] = useState("");

  const [
    highlightTrend,
    setHighlightTrend,
  ] = useState(false);


  useEffect(() => {

    /*
     * 1.1 s
     * Abrimos Reportes Comerciales.
     */

    const expandTimer =
      setTimeout(() => {
        setCommercialExpanded(true);
      }, 1100);


    /*
     * 2.2 s
     * Destacamos Reporte de ventas por Período.
     */

    const highlightReportTimer =
      setTimeout(() => {
        setHighlightSalesReport(true);
      }, 2200);


    /*
     * 3.2 s
     * Entramos al reporte.
     */

    const openReportTimer =
      setTimeout(() => {
        setHighlightSalesReport(false);
        setActiveView("report");
      }, 3200);


    /*
     * 4.5 s
     * Ventas Totales.
     */

    const salesMetricTimer =
      setTimeout(() => {
        setMetricFocus("sales");
      }, 4500);


    /*
     * 5.35 s
     * Mejor Día.
     */

    const bestMetricTimer =
      setTimeout(() => {
        setMetricFocus("best");
      }, 5350);


    /*
     * 6.15 s
     * Quitamos foco de KPI.
     */

    const clearMetricTimer =
      setTimeout(() => {
        setMetricFocus("");
      }, 6150);


    /*
     * 6.35 s
     * Tendencia toma protagonismo.
     */

    const trendTimer =
      setTimeout(() => {
        setHighlightTrend(true);
      }, 6350);


    /*
     * 7.45 s
     * Finaliza el énfasis.
     */

    const clearTrendTimer =
      setTimeout(() => {
        setHighlightTrend(false);
      }, 7450);


    return () => {
      clearTimeout(expandTimer);
      clearTimeout(highlightReportTimer);
      clearTimeout(openReportTimer);
      clearTimeout(salesMetricTimer);
      clearTimeout(bestMetricTimer);
      clearTimeout(clearMetricTimer);
      clearTimeout(trendTimer);
      clearTimeout(clearTrendTimer);
    };

  }, []);


  return {
    commercialExpanded,
    highlightSalesReport,
    activeView,
    metricFocus,
    highlightTrend,
  };
}


export default useReportsSceneTimeline;