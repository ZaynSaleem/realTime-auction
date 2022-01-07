import React from "react";
import Timer from "../timer/timer";
import "./style.css";

const Card = (props) => {
  return (
    <div className="card-home">
      <div className="card-home-image">
        <img src={props?.image} />
      </div>
      <div className="card-home-content">
        <div className="card-home-timer">
          <Timer startTime={props?.startTime} endTime={props?.endTime} />
        </div>
        <div className="card-home-title">{props.productname}</div>
        <div className="card-home-text">
          <div className="category">{props.category}</div>
          <div className="bid">{props?.bids}</div>
        </div>
      </div>
      <div className="card-home-button">{props?.roles === "user" ? (
        
        <button onClick={() => props.toggleProduct(props.items)}>Submit bid</button>
      ) : (
        <button onClick={() => props.toggleProduct(props.items)}>View product</button>

      )} 
      </div>
    </div>
  );
};

export default Card;
