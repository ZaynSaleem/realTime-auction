import React from "react";

const DashboardCard = ({
  icon,
  headText,
  count,
  colorIcon,
  color,

  textColor,
}) => {
  return (
    <div className="dashboard-card-new">
      <div
        className="dashboard-card-icons"
        style={{ background: colorIcon, color: color }}
      >
        {icon}
      </div>
      <div className="dashboard-card-title" >
        <sapn className="head">{headText}</sapn>
        <p style={{ color: colorIcon , opacity: 0.9 }}>{count}</p>
      </div>
    </div>

    // <div
    //   className="dashboard-card"
    //   style={{
    //     backgroundColor: cardBgColor,
    //     color: color,
    //   }}
    // >
    //   <div
    //     className="dashboard-card-icon"
    //     style={{ background: colorIcon, color: color }}
    //   >
    //     {icon}
    //   </div>
    //   <div className="dashboard-card-content">
    //     <h2>{headText}</h2>
    //     <h1>{count}</h1>
    //   </div>
    // </div>
  );
};

export default DashboardCard;
