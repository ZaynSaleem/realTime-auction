import React from "react";
import "./style.css";

const Card = ({ image }) => {
  return (
  
      <div className="card">
        <div className="card-image">
          <img src={image} />
        </div>
        <div className="card-content">
          <div className="card-timer">2d 7h 56m 16s</div>
          <div className="card-title">MacBook 15-Inch Laptop</div>
          <div className="card-text">
            <div className="category">Electronic</div>
            <div className="bid">10 Bids</div>
          </div>
        </div>
          <div className="card-button">
            <button>Submit bid</button>
          </div>
      </div>
   
  );
};

export default Card;
