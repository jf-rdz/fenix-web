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


/* ==========================================================
   SWIPE
   ========================================================== */

const SWIPE_THRESHOLD = 45;

const SWIPE_DIRECTION_RATIO = 1.2;


/* ==========================================================
   MOBILE INTRO

   0 - 350 ms
   pantalla web completa

   350 - 1100 ms
   zoom hacia el encuadre responsive

   1100 ms+
   cámara normal del slide
   ========================================================== */

const INTRO_ZOOM_START = 350;

const INTRO_SETTLED = 1100;


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
   * hold:
   * pantalla completa / alejada
   *
   * zoom:
   * transición al encuadre responsive
   *
   * settled:
   * animación normal del slide
   */

  const [
    introPhase,
    setIntroPhase,
  ] = useState("hold");


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
     INTRO RESPONSIVE
     ======================================================== */

  useEffect(() => {
    /*
     * Al montar o reiniciar cualquier slide,
     * volvemos al plano general.
     */

    setIntroPhase("hold");


    const zoomTimer =
      setTimeout(() => {
        setIntroPhase("zoom");
      }, INTRO_ZOOM_START);


    const settledTimer =
      setTimeout(() => {
        setIntroPhase("settled");
      }, INTRO_SETTLED);


    return () => {
      clearTimeout(
        zoomTimer
      );

      clearTimeout(
        settledTimer
      );
    };

  }, [
    currentSlide,
    cycle,
  ]);



  /* ========================================================
     AUTOPLAY
     ======================================================== */

  useEffect(() => {
    const timer =
      setTimeout(() => {

        /*
         * Es importante regresar primero
         * al plano general.
         *
         * Así el siguiente slide siempre
         * comienza mostrando contexto.
         */

        setIntroPhase(
          "hold"
        );


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

  const goToSlide = (
    index
  ) => {

    setIntroPhase(
      "hold"
    );


    /*
     * Si toca el indicador
     * correspondiente al slide actual,
     * simplemente reiniciamos toda la escena.
     */

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


    setCurrentSlide(
      index
    );


    setCycle(
      (current) =>
        current + 1
    );
  };



  /* ========================================================
     NEXT
     ======================================================== */

  const goToNextSlide =
    () => {

      setIntroPhase(
        "hold"
      );


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



  /* ========================================================
     PREVIOUS
     ======================================================== */

  const goToPreviousSlide =
    () => {

      setIntroPhase(
        "hold"
      );


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
     TOUCH / POINTER
     ======================================================== */

  const handlePointerDown = (
    event
  ) => {

    /*
     * En mouse solamente aceptamos
     * botón principal.
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
      Math.abs(
        deltaX
      );


    const verticalDistance =
      Math.abs(
        deltaY
      );


    /*
     * El gesto solamente cuenta
     * cuando es claramente horizontal.
     *
     * De esta forma el carrusel no
     * bloquea el scroll vertical.
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
       * Dedo hacia la derecha:
       * anterior.
       */

      if (
        deltaX > 0
      ) {
        goToPreviousSlide();
      }


      /*
       * Dedo hacia la izquierda:
       * siguiente.
       */

      if (
        deltaX < 0
      ) {
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
          className={[
            "fenix-demo-frame__viewport",

            `fenix-demo-frame__viewport--${slide.id}`,

            `fenix-demo-frame__viewport--intro-${introPhase}`,
          ].join(" ")}

          /*
           * El navegador conserva el scroll
           * vertical de la landing.
           *
           * Nosotros interpretamos únicamente
           * el swipe horizontal.
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
          (
            item,
            index
          ) => (

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
                goToSlide(
                  index
                )
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