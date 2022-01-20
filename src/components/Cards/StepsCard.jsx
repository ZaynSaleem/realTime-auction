import React from "react";
import './style.css'

const StepsCard = ({ circleIcon, angleIcon, head, bodyText }) => {
  return (
    <div className="steps-card">
      <div className="steps-icons">
        <div className="circle-icons">{circleIcon}</div>
      </div>

      <div className="steps-card-text">
        <span>{head}</span>
        <p>{bodyText}</p>
      </div>
    </div>
  );
};

export default StepsCard;
