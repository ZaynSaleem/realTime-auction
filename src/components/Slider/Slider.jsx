import React from "react";
import "./slider.css";

const Slider = ({ image }) => {
  return (
    <div className="slider">
      <img src={image} alt="Slider Image" />
    </div>
  );
};

export default Slider;
