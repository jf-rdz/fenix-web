import {
  useEffect,
  useState,
} from "react";


function useSceneTimeline() {

  const [salesTarget, setSalesTarget] =
    useState(0);

  const [newSaleAdded, setNewSaleAdded] =
    useState(false);

  const [salePulse, setSalePulse] =
    useState(false);


  useEffect(() => {

    /*
     * 1.3 s
     *
     * El dashboard termina de entrar y
     * aparece el primer total de ventas.
     */

    const initialSalesTimer =
      setTimeout(() => {

        setSalesTarget(274.03);

      }, 1300);


    /*
     * 4.3 s
     *
     * Simulamos una nueva venta.
     *
     * $274.03
     * +
     * $187.73
     * =
     * $461.76
     */

    const newSaleTimer =
      setTimeout(() => {

        setSalesTarget(461.76);

        setNewSaleAdded(true);

        setSalePulse(true);

      }, 4300);


    /*
     * Después del feedback visual,
     * dejamos el estado actualizado
     * pero retiramos el pulso.
     */

    const removePulseTimer =
      setTimeout(() => {

        setSalePulse(false);

      }, 5700);


    return () => {

      clearTimeout(
        initialSalesTimer
      );

      clearTimeout(
        newSaleTimer
      );

      clearTimeout(
        removePulseTimer
      );

    };

  }, []);


  return {
    salesTarget,
    newSaleAdded,
    salePulse,
  };
}


export default useSceneTimeline;