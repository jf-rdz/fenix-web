import {
  useEffect,
  useState,
} from "react";

import "./FenixCarousel.css";
import "./FenixCarouselResponsive.css";

import HomeScene from "./scenes/HomeScene";
import SalesScene from "./scenes/SalesScene";
import InventoryMobileScene from "./scenes/InventoryMobileScene";
import OrderServiceScene from "./scenes/OrderServiceScene";
import ReportsScene from "./scenes/ReportsScene";


const slides = [
  {
    id: "home",
    label: "Panel de control",
    component: HomeScene,
    duration: 10000,
  },

  {
    id: "sales",
    label: "Venta Mostrador",
    component: SalesScene,
    duration: 10000,
  },

  {
    id: "inventory-mobile",
    label: "Inventario móvil",
    component: InventoryMobileScene,
    duration: 10000,
  },

  {
    id: "order-service",
    label: "Órdenes de Servicio",
    component: OrderServiceScene,
    duration: 10000,
  },

  {
    id: "reports",
    label: "Reportes",
    component: ReportsScene,
    duration: 10000,
  },
];


function FenixCarousel() {
  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);

  const [
    cycle,
    setCycle,
  ] = useState(0);


  const slide =
    slides[currentSlide];

  const Scene =
    slide.component;


  useEffect(() => {
    const timer =
      setTimeout(() => {
        setCurrentSlide(
          (current) =>
            (current + 1) %
            slides.length
        );

        setCycle(
          (current) =>
            current + 1
        );
      }, slide.duration);


    return () => {
      clearTimeout(timer);
    };

  }, [
    currentSlide,
    slide.duration,
  ]);


  const goToSlide = (index) => {
    if (
      index ===
      currentSlide
    ) {
      setCycle(
        (current) =>
          current + 1
      );

      return;
    }


    setCurrentSlide(index);

    setCycle(
      (current) =>
        current + 1
    );
  };


  return (
    <div className="fenix-carousel">

      <div className="fenix-demo-frame">

        <div className="fenix-demo-frame__topbar">

          <div className="fenix-demo-frame__dots">
            <span />
            <span />
            <span />
          </div>


          <div className="fenix-demo-frame__title">
            Fénix · {slide.label}
          </div>

        </div>


        <div className="fenix-demo-frame__viewport">

          <Scene
            key={`${slide.id}-${cycle}`}
          />

        </div>

      </div>


      <div
        className="fenix-carousel__progress"
        aria-hidden="true"
      >

        <span
          key={`${slide.id}-${cycle}`}
          style={{
            animationDuration:
              `${slide.duration}ms`,
          }}
        />

      </div>


      <div className="fenix-carousel__indicators">

        {slides.map(
          (item, index) => (

            <button
              key={item.id}
              type="button"
              className={[
                "fenix-carousel__indicator",

                index ===
                currentSlide
                  ? "fenix-carousel__indicator--active"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                goToSlide(index)
              }
              aria-label={`Mostrar ${item.label}`}
              title={item.label}
            />

          )
        )}

      </div>

    </div>
  );
}


export default FenixCarousel;