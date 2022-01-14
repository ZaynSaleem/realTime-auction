import React from "react";
import "./style.css";
const InformationLine = (props) => {
  return (
    <div className="information-wrapper">
      <span>{props.title}</span>
    </div>
  );
};

export default InformationLine;
