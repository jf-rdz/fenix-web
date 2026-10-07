function FenixIcon({
  name,
  size = 24,
  strokeWidth = 1.8,
  className = "",
}) {
  const icons = {
    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),

    home: (
      <>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10.5V20h14v-9.5" />
        <path d="M9 20v-6h6v6" />
      </>
    ),

    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-2.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V20" />
        <path d="M16 5.5a3 3 0 0 1 0 5.5" />
        <path d="M17 14a4 4 0 0 1 3.5 4v2" />
      </>
    ),

    userCog: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-2.5A4.5 4.5 0 0 1 8 13h2" />
        <circle cx="17.5" cy="16.5" r="2.5" />
        <path d="M17.5 12.5v1" />
        <path d="M17.5 19.5v1" />
        <path d="m14.7 13.7.7.7" />
        <path d="m19.6 18.6.7.7" />
        <path d="M13.5 16.5h1" />
        <path d="M20.5 16.5h1" />
      </>
    ),

    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <path d="M3 10h18" />
      </>
    ),

    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4.5V3h6v1.5" />
        <path d="M9 10h6" />
        <path d="M9 14h6" />
        <path d="M9 18h4" />
      </>
    ),

    file: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </>
    ),

    service: (
      <>
        <path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-3 3-3-3z" />
      </>
    ),

    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
      </>
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 13.5v-3l-2-.5a7 7 0 0 0-.7-1.7l1.1-1.8-2.1-2.1-1.8 1.1A7 7 0 0 0 12 5l-.5-2h-3L8 5a7 7 0 0 0-1.7.7L4.5 4.6 2.4 6.7l1.1 1.8A7 7 0 0 0 3 10l-2 .5v3l2 .5a7 7 0 0 0 .7 1.7l-1.1 1.8 2.1 2.1 1.8-1.1A7 7 0 0 0 8 19l.5 2h3l.5-2a7 7 0 0 0 1.7-.7l1.8 1.1 2.1-2.1-1.1-1.8A7 7 0 0 0 17 14z" />
      </>
    ),

    logout: (
      <>
        <path d="M10 4H5v16h5" />
        <path d="M13 8l4 4-4 4" />
        <path d="M8 12h9" />
      </>
    ),

    truck: (
      <>
        <path d="M3 6h11v11H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),

    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),

    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.3 2.3 0 1 1 3.4 2c-.8.5-1.2 1-1.2 2" />
        <path d="M12 17h.01" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name] ?? icons.home}
    </svg>
  );
}

export default FenixIcon;