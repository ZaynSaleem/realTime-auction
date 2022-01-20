import React from "react";

const DashboardCard = ({ icon, headText, count, colorIcon, color }) => {
  return (
    <div className="dashboard-card-new">
      <div
        className="dashboard-card-icons"
        style={{ background: colorIcon, color: color }}
      >
        {icon}
      </div>
      <div className="dashboard-card-title">
        <span className="head">{headText}</span>
        <p style={{ color: colorIcon, opacity: 0.9 }}>{count}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
