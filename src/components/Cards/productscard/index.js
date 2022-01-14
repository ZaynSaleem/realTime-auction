import "./style.css";
import React from "react";
import { useHistory } from "react-router-dom";
import { FaEye, FaGavel } from "react-icons/fa";
import Timer from "../../timer/timer";

const ProductCard = (props) => {
  let history = useHistory();

  const toggleProduct = (item) => {
    let str = item?.productName;
    str = str.replace(/\s+/g, "-").toLowerCase();

    history.push(`/product/${item?.id}/${str}`);
  };

  return props ? (
    <div className="home-card">
      <div className="card-image">
        <img src={props?.image} alt="image" />
        <div className="timer-card">
          {" "}
          <Timer startTime={props?.startTime} endTime={props?.endTime} />
        </div>
        <div className="gavel-bid">
          {props?.roles === "user" ? (
            <button onClick={() => toggleProduct(props?.items)}>
              <FaGavel />
            </button>
          ) : (
            <button
              datatoggle="tooltip"
              title="View Product"
              onClick={() => toggleProduct(props?.items)}
            >
              <FaEye />
            </button>
          )}
        </div>
      </div>
      <div className="content-card">
        <div className="title-card" onClick={() => toggleProduct(props?.items)}>
          {props?.productname}
        </div>
        <div className="price-card">
          current bid: <span>${props?.items?.startingBid}</span>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ProductCard;
