import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./OptionalModulesAnimation.css";

import FenixTopbar
  from "../FenixCarousel/ui/FenixTopbar";

import FenixIcon
  from "../FenixCarousel/ui/FenixIcon";

import useOptionalModulesTimeline
  from "../../hooks/useOptionalModulesTimeline";


/* =========================================
   MODULE DATA
   ========================================= */

const modules = [
  {
    id: "services",

    title:
      "Servicios",

    sidebarLabel:
      "Servicios",

    icon:
      "service",

    description:
      "Gestiona el catálogo de servicios que ofreces a tus clientes.",
  },

  {
    id: "raw-material",

    title:
      "Materia Prima",

    sidebarLabel:
      "Inventario de Materia Prima",

    icon:
      "clipboard",

    description:
      "Controla tus insumos antes de convertirlos en productos terminados.",
  },

  {
    id: "products",

    title:
      "Inventario de Productos",

    sidebarLabel:
      "Inventario de Productos",

    icon:
      "file",

    description:
      "Administra el stock de tus productos listos para la venta.",
  },

  {
    id: "production",

    title:
      "Producción",

    sidebarLabel:
      "Producción",

    icon:
      "settings",

    description:
      "Registra órdenes de producción para convertir materia prima en producto terminado.",
  },

  {
    id: "sales",

    title:
      "Venta Mostrador",

    sidebarLabel:
      "Venta Mostrador",

    icon:
      "card",

    description:
      "Realiza ventas rápidas en mostrador como un cajero.",
  },

  {
    id: "surveys",

    title:
      "Levantamientos",

    sidebarLabel:
      "Levantamientos",

    icon:
      "clipboard",

    description:
      "Crea visitas técnicas o toma medidas antes de cotizar.",
  },

  {
    id: "quotes",

    title:
      "Cotizaciones",

    sidebarLabel:
      "Cotizaciones",

    icon:
      "file",

    description:
      "Genera presupuestos formales para tus clientes.",
  },

  {
    id: "orders",

    title:
      "Órdenes de Servicio",

    sidebarLabel:
      "Órdenes de Servicio",

    icon:
      "userCog",

    description:
      "Seguimiento a trabajos, reparaciones o servicios en progreso.",
  },
];


const primaryNavigation = [
  {
    label:
      "Inicio",

    icon:
      "home",
  },

  {
    label:
      "Colaboradores",

    icon:
      "userCog",
  },

  {
    label:
      "Clientes",

    icon:
      "users",
  },

  {
    label:
      "Agenda",

    icon:
      "calendar",
  },
];


const secondaryNavigation = [
  {
    label:
      "Contabilidad",

    icon:
      "card",
  },

  {
    label:
      "Reportes",

    icon:
      "file",
  },
];


const accountNavigation = [
  {
    label:
      "Suscripciones",

    icon:
      "card",
  },

  {
    label:
      "Configuración",

    icon:
      "settings",

    active:
      true,
  },

  {
    label:
      "Cerrar sesión",

    icon:
      "logout",
  },
];



/* =========================================
   SIDEBAR ITEM
   ========================================= */

function SidebarItem({
  label,
  icon,
  active = false,
  entering = false,
}) {
  return (
    <div
      className={[
        "optional-sidebar__item",

        active
          ? "optional-sidebar__item--active"
          : "",

        entering
          ? "optional-sidebar__item--entering"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <FenixIcon
        name={icon}
        size={16}
        strokeWidth={1.7}
      />

      <span>
        {label}
      </span>

    </div>
  );
}



/* =========================================
   MODULE CARD
   ========================================= */

function OptionalModuleCard({
  module,
  enabled,
}) {
  return (
    <article
      className={[
        "optional-module-card",

        enabled
          ? "optional-module-card--enabled"
          : "optional-module-card--disabled",
      ].join(" ")}
    >

      <div className="optional-module-card__copy">

        <strong>
          {module.title}
        </strong>


        <p>
          {module.description}
        </p>

      </div>


      <span
        className={[
          "optional-module-switch",

          enabled
            ? "optional-module-switch--on"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >

        <span />

      </span>

    </article>
  );
}



/* =========================================
   ANIMATION
   ========================================= */

function OptionalModulesAnimation({
  isActive = true,
}) {
  const {
    activeModules,
    savedPulse,
    cameraPhase,
  } =
    useOptionalModulesTimeline(
      isActive
    );


  /*
   * Detectamos únicamente módulos
   * que acaban de aparecer.
   */

  const previousModulesRef =
    useRef(activeModules);


  const [
    enteringModules,
    setEnteringModules,
  ] = useState([]);


  useEffect(() => {
    /*
     * Mientras no estamos visibles,
     * sincronizamos el estado pero no
     * disparamos highlights.
     */

    if (!isActive) {
      previousModulesRef.current =
        activeModules;

      setEnteringModules([]);

      return undefined;
    }


    const previousModules =
      previousModulesRef.current;


    const newlyActivatedModules =
      activeModules.filter(
        (moduleId) =>
          !previousModules.includes(
            moduleId
          )
      );


    if (
      newlyActivatedModules.length >
      0
    ) {
      setEnteringModules(
        newlyActivatedModules
      );


      const clearTimer =
        setTimeout(() => {
          setEnteringModules([]);
        }, 650);


      previousModulesRef.current =
        activeModules;


      return () => {
        clearTimeout(
          clearTimer
        );
      };
    }


    previousModulesRef.current =
      activeModules;

    setEnteringModules([]);

    return undefined;

  }, [
    activeModules,
    isActive,
  ]);


  const isModuleActive =
    (moduleId) =>
      activeModules.includes(
        moduleId
      );


  const isModuleEntering =
    (moduleId) =>
      enteringModules.includes(
        moduleId
      );


  return (
    <div
      className={[
        "optional-modules-demo",

        `optional-modules-demo--camera-${cameraPhase}`,

        isActive
          ? "optional-modules-demo--running"
          : "optional-modules-demo--waiting",
      ].join(" ")}
      aria-hidden="true"
    >

      {/* =================================
          RESPONSIVE CAMERA VIEWPORT
          ================================= */}

      <div className="optional-modules-demo__viewport">

        <div className="optional-modules-demo__screen">


          {/* ===================================
              TOPBAR REAL DE FÉNIX
              =================================== */}

          <FenixTopbar />


          <div className="optional-modules-demo__body">


            {/* ===================================
                SIDEBAR
                =================================== */}

            <aside className="optional-sidebar">

              <div className="optional-sidebar__scroll">

                <div className="optional-sidebar__nav-label">

                  <strong>
                    NAVEGACIÓN
                  </strong>

                  <span>
                    Panel de control
                  </span>

                </div>


                {primaryNavigation.map(
                  (item) => (

                    <SidebarItem
                      key={
                        item.label
                      }
                      {...item}
                    />

                  )
                )}


                {modules.map(
                  (module) => {

                    const active =
                      isModuleActive(
                        module.id
                      );


                    const entering =
                      isModuleEntering(
                        module.id
                      );


                    return (
                      <div
                        key={
                          module.id
                        }
                        className={[
                          "optional-sidebar__dynamic",

                          active
                            ? "optional-sidebar__dynamic--visible"
                            : "",

                          entering
                            ? "optional-sidebar__dynamic--entering"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >

                        <SidebarItem
                          label={
                            module.sidebarLabel
                          }

                          icon={
                            module.icon
                          }

                          entering={
                            entering
                          }
                        />

                      </div>
                    );
                  }
                )}


                {secondaryNavigation.map(
                  (item) => (

                    <SidebarItem
                      key={
                        item.label
                      }
                      {...item}
                    />

                  )
                )}

              </div>


              <div className="optional-sidebar__account">

                <strong className="optional-sidebar__account-title">
                  CUENTA
                </strong>


                {accountNavigation.map(
                  (item) => (

                    <SidebarItem
                      key={
                        item.label
                      }
                      {...item}
                    />

                  )
                )}

              </div>

            </aside>



            {/* ===================================
                WORKSPACE
                =================================== */}

            <main className="optional-workspace">

              <section className="optional-settings">


                {/* ===============================
                    SECTION HEADER
                    =============================== */}

                <header className="optional-settings__header">

                  <div className="optional-settings__header-icon">
                    ⠿
                  </div>


                  <div>

                    <strong>
                      Módulos Opcionales
                    </strong>

                    <p>
                      Selecciona los módulos opcionales que usarás
                    </p>

                  </div>


                  <span className="optional-settings__collapse">
                    ⌃
                  </span>

                </header>



                {/* ===============================
                    CONTENT
                    =============================== */}

                <div className="optional-settings__content">

                  <div className="optional-settings__intro">

                    <p>
                      Activa solo los módulos que necesites, de acuerdo a tu actividad empresarial.
                    </p>


                    <div
                      className={[
                        "optional-saved-badge",

                        savedPulse
                          ? "optional-saved-badge--pulse"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >

                      <span>
                        ✓
                      </span>

                      Cambios guardados al momento

                    </div>

                  </div>



                  {/* ===============================
                      MODULE GRID
                      =============================== */}

                  <div className="optional-modules-grid">

                    {modules.map(
                      (module) => (

                        <OptionalModuleCard
                          key={
                            module.id
                          }

                          module={
                            module
                          }

                          enabled={
                            isModuleActive(
                              module.id
                            )
                          }
                        />

                      )
                    )}

                  </div>

                </div>

              </section>

            </main>

          </div>

        </div>

      </div>

    </div>
  );
}


export default OptionalModulesAnimation;