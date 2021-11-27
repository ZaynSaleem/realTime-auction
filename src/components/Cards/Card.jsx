import React from "react";
import "./style.css";

const Card = ({ image }) => {
  return (
  
      <div className="card-home">
        <div className="card-home-image">
          <img src={image} />
        </div>
        <div className="card-home-content">
          <div className="card-home-timer">2d 7h 56m 16s</div>
          <div className="card-home-title">MacBook 15-Inch Laptop</div>
          <div className="card-home-text">
            <div className="category">Electronic</div>
            <div className="bid">10 Bids</div>
          </div>
        </div>
          <div className="card-home-button">
            <button>Submit bid</button>
          </div>
      </div>
   
  );
};

export default Card;
