import React from "react";
import Navbar from "../../../components/header/Navbar";
import "./style.css";
import Slider from "react-slick";
import card1 from "../../../assets/card1.jpg";
import card2 from "../../../assets/card2.jpg";
import card3 from "../../../assets/card3.jpg";
import card4 from "../../../assets/card4.jpg";
import BreadCrumb from "../../../components/breadCrumb";
const Product = () => {
  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   };
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={`https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg`}
            width={50}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Navbar />
      <BreadCrumb />
      <div className="main-content">
        <div className="custom_container">
          <div className="product-detail-wrapper">
            <div className="lazy-slider">
              <Slider {...settings}>
                <div>
                  <img src={card1} />
                </div>
                <div>
                  <img src={card2} />
                </div>
                <div>
                  <img src={card3} />
                </div>
              </Slider>
            </div>

            <div className="content-product">
              <div className="content-head">
                <h2>
                  Sold for:{" "}
                  <span style={{ color: "#5f91b9" }}>$4,233,434.00</span>
                </h2>
              </div>

              {/* <p className="auction-condition">Item condition: New</p> */}

              <div className="auction-description">
                <div className="auction-condition">Item condition: New</div>
                <div className="auction-sku">
                  SKU: <span>BF054</span>
                </div>
                <div className="auction-category">
                  Categories:{" "}
                  <span style={{ fontWeight: "700", color: "#686868" }}>
                    Electronics
                  </span>
                </div>
              </div>

              <div className="auction-timer">
                Time left:
                <div className="auction-countdown">
                  <div className="auction-months">
                    <h4>4</h4>
                    <span>Months</span>
                  </div>{" "}
                  <div className="auction-weeks">
                    <span>
                      <h4>3</h4>Weeks
                    </span>
                  </div>{" "}
                  <div className="auction-days">
                    <span>
                      <h4>6</h4>days
                    </span>
                  </div>
                  <div className="auction-hours">
                    <span>
                      <h4>5</h4>hours
                    </span>
                  </div>{" "}
                  <div className="auction-mintues">
                    <span>
                      <h4>42</h4>mintues
                    </span>
                  </div>
                  <div className="auction-seconds">
                    <span>
                      <h4>30</h4>second
                    </span>
                  </div>
                </div>
              </div>
              <div className="auction-timezone">
                <p>Auction ends: June 1, 2022 12:00:00 am</p>
                <p>Timezone: UTC +3</p>
              </div>
              <div className="make-a-bid">
                  <div className="form-bid">
                      <input type="number" min="99" defaultValue="$99" size="4"/>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
