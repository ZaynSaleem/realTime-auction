import React from "react";

const DashboardCard = ({
  icon,
  headText,
  count,
  colorIcon,
  color,
  cardBgColor,
}) => {
  return (
    <div
      className="dashboard-card"
      style={{
        backgroundColor: cardBgColor,
        color: color,
      }}
    >
      <div
        className="dashboard-card-icon"
        style={{ background: colorIcon, color: color }}
      >
        {icon}
      </div>
      <div className="dashboard-card-content">
        <h2>{headText}</h2>
        <h1>{count}</h1>
      </div>
    </div>
  );
};

export default DashboardCard;
