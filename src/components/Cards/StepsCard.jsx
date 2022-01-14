import React from "react";

const StepsCard = ({ circleIcon, angleIcon, head, bodyText }) => {
  return (
    <div className="steps-card">
      <div className="steps-icons">
        <div className="circle-icons">{circleIcon}</div>
      </div>

      <div className="steps-card-text">
        <h3>{head}</h3>
        <p>{bodyText}</p>
      </div>
    </div>
  );
};

export default StepsCard;
