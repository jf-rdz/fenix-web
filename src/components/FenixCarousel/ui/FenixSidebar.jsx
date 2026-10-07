import FenixIcon from "./FenixIcon";

const navigation = [
  {
    label: "Inicio",
    icon: "home",
    active: true,
  },
  {
    label: "Colaboradores",
    icon: "userCog",
  },
  {
    label: "Clientes",
    icon: "users",
  },
  {
    label: "Agenda",
    icon: "calendar",
  },
  {
    label: "Levantamientos",
    icon: "clipboard",
  },
  {
    label: "Cotizaciones",
    icon: "file",
  },
  {
    label: "Órdenes de Servicio",
    icon: "users",
  },
  {
    label: "Servicios",
    icon: "service",
  },
];

const account = [
  {
    label: "Suscripciones",
    icon: "card",
  },
  {
    label: "Configuración",
    icon: "settings",
  },
  {
    label: "Cerrar sesión",
    icon: "logout",
  },
];

function SidebarItem({ item }) {
  return (
    <div
      className={[
        "fenix-sidebar__item",
        item.active
          ? "fenix-sidebar__item--active"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <FenixIcon
        name={item.icon}
        size={17}
        strokeWidth={1.7}
      />

      <span>{item.label}</span>
    </div>
  );
}

function FenixSidebar() {
  return (
    <aside className="fenix-sidebar">
      <div className="fenix-sidebar__heading">
        <strong>NAVEGACIÓN</strong>
        <span>Panel de control</span>
      </div>

      <div className="fenix-sidebar__divider" />

      <nav className="fenix-sidebar__nav">
        {navigation.map((item) => (
          <SidebarItem
            item={item}
            key={item.label}
          />
        ))}
      </nav>

      <div className="fenix-sidebar__account">
        <div className="fenix-sidebar__account-title">
          CUENTA
        </div>

        {account.map((item) => (
          <SidebarItem
            item={item}
            key={item.label}
          />
        ))}
      </div>
    </aside>
  );
}

export default FenixSidebar;