import FenixIcon from "./FenixIcon";

function DashboardCard({
  icon,
  label,
  delay = 1600,
}) {
  return (
    <article
      className="dashboard-card"
      style={{
        "--card-delay": `${delay}ms`,
      }}
    >

      <FenixIcon
        name={icon}
        size={30}
        strokeWidth={1.7}
        className="dashboard-card__icon"
      />

      <strong>
        {label}
      </strong>

    </article>
  );
}

export default DashboardCard;