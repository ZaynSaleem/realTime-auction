import "./style.css";
import React, { useEffect, useState } from "react";

const WiningCard = (props) => {
  const [maxBid, setMaxBid] = useState("");
  useEffect(() => {
    if (props?.arr[0]?.bids && props?.arr[0]?.bids?.length) {
      let shots = props?.arr[0]?.bids;
      let max = shots?.reduce((max, obj) =>
        max?.bidPrice > obj?.bidPrice ? max : obj
      );

      setMaxBid(max?.bidPrice);
    }
  }, [props?.arr]);

  return (
    <div className="user-card-wrapper">
      {props?.arr && props?.arr?.length
        ? props?.arr?.map((item, index) => {
            return (
              <div className="user-wining-card">
                <div className="user-card-image">
                  <img src={item?.imageUrl[0]} alt="image" />
                </div>
                <div className="user-card-content">
                  <div className="user-card-heading">
                    <h4>
                      <a onClick={() => props?.togglepage(item)}>
                        {item?.productName}
                      </a>
                    </h4>
                  </div>
                  <div className="user-card-description">
                    {item?.description
                      ? item?.description
                      : "No Description of this product"}
                  </div>
                  <div className="user-card-price">
                    <span>Starting bid :</span> $
                    {item?.startingBid
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  {props?.timerStatus === "Expired" ? (
                    <div className="user-card-endprice">
                      <span>Sold at :</span> $
                      {item?.winner?.bidPrice
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                  ) : (
                    <div className="user-card-endprice">
                      <span>Highest bid :</span> $
                      {maxBid?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default WiningCard;
