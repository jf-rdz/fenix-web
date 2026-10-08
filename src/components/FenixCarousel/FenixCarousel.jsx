import {
  useEffect,
  useRef,
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


const SWIPE_THRESHOLD = 45;
const SWIPE_DIRECTION_RATIO = 1.2;


function FenixCarousel() {
  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);

  const [
    cycle,
    setCycle,
  ] = useState(0);


  /*
   * Guardamos la información del gesto
   * sin provocar renders mientras el usuario
   * mueve el dedo.
   */

  const gestureRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
  });


  const slide =
    slides[currentSlide];

  const Scene =
    slide.component;


  /* ========================================================
     AUTOPLAY
     ======================================================== */

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
    cycle,
    slide.duration,
  ]);


  /* ========================================================
     DIRECT NAVIGATION
     ======================================================== */

  const goToSlide = (index) => {
    if (
      index ===
      currentSlide
    ) {
      /*
       * Si toca el slide activo,
       * reiniciamos su animación y también
       * reiniciamos el temporizador.
       */

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


  /* ========================================================
     PREVIOUS / NEXT
     ======================================================== */

  const goToNextSlide = () => {
    setCurrentSlide(
      (current) =>
        (current + 1) %
        slides.length
    );

    setCycle(
      (current) =>
        current + 1
    );
  };


  const goToPreviousSlide = () => {
    setCurrentSlide(
      (current) =>
        (
          current -
          1 +
          slides.length
        ) %
        slides.length
    );

    setCycle(
      (current) =>
        current + 1
    );
  };


  /* ========================================================
     POINTER / TOUCH GESTURES
     ======================================================== */

  const handlePointerDown = (
    event
  ) => {
    /*
     * Si en desktop utilizamos mouse,
     * solamente aceptamos el botón principal.
     */

    if (
      event.pointerType ===
        "mouse" &&
      event.button !== 0
    ) {
      return;
    }


    gestureRef.current = {
      active: true,
      pointerId:
        event.pointerId,
      startX:
        event.clientX,
      startY:
        event.clientY,
    };
  };


  const handlePointerUp = (
    event
  ) => {
    const gesture =
      gestureRef.current;


    if (
      !gesture.active ||
      gesture.pointerId !==
        event.pointerId
    ) {
      return;
    }


    const deltaX =
      event.clientX -
      gesture.startX;

    const deltaY =
      event.clientY -
      gesture.startY;


    const horizontalDistance =
      Math.abs(deltaX);

    const verticalDistance =
      Math.abs(deltaY);


    /*
     * Consideramos swipe solamente cuando:
     *
     * 1. recorrió una distancia suficiente;
     * 2. el movimiento fue claramente
     *    más horizontal que vertical.
     *
     * Esto evita bloquear el scroll normal
     * de la landing.
     */

    const isHorizontalSwipe =
      horizontalDistance >=
        SWIPE_THRESHOLD &&
      horizontalDistance >
        verticalDistance *
          SWIPE_DIRECTION_RATIO;


    if (
      isHorizontalSwipe
    ) {
      /*
       * dedo →
       * mostramos slide anterior
       */

      if (deltaX > 0) {
        goToPreviousSlide();
      }

      /*
       * dedo ←
       * mostramos slide siguiente
       */

      if (deltaX < 0) {
        goToNextSlide();
      }
    }


    gestureRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      startY: 0,
    };
  };


  const handlePointerCancel =
    () => {
      gestureRef.current = {
        active: false,
        pointerId: null,
        startX: 0,
        startY: 0,
      };
    };


  /* ========================================================
     RENDER
     ======================================================== */

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


        <div
          className="fenix-demo-frame__viewport"

          /*
           * pan-y es clave:
           *
           * permitimos al navegador manejar
           * el scroll vertical normalmente,
           * mientras nosotros interpretamos
           * los gestos horizontales.
           */

          style={{
            touchAction:
              "pan-y",
          }}

          onPointerDown={
            handlePointerDown
          }

          onPointerUp={
            handlePointerUp
          }

          onPointerCancel={
            handlePointerCancel
          }

          /*
           * Evita que una imagen dentro de
           * las simulaciones active el drag
           * nativo del navegador.
           */

          onDragStart={(
            event
          ) => {
            event.preventDefault();
          }}
        >

          <Scene
            key={`${slide.id}-${cycle}`}
          />

        </div>

      </div>


      {/* ===================================================
          PROGRESS
          =================================================== */}

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


      {/* ===================================================
          INDICATORS
          =================================================== */}

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

              title={
                item.label
              }
            />

          )
        )}

      </div>

    </div>
  );
}


export default FenixCarousel;