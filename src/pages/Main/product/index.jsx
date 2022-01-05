import React, { useEffect, useState } from "react";
import Navbar from "../../../components/header/Navbar";
import Slider from "react-slick";
import card1 from "../../../assets/card1.jpg";
import card2 from "../../../assets/card2.jpg";
import card3 from "../../../assets/card3.jpg";
import card4 from "../../../assets/card4.jpg";
import BreadCrumb from "../../../components/breadCrumb";
import Footer from "../../../components/footer/Footer";
import "./style.css";
import { useParams } from "react-router-dom";

const Product = () => {
  const [tabId, setTabId] = useState("history");
  const { id, name } = useParams();
  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   };

  useEffect(() => {
  console.log(id)
  console.log(name);
  
  }, []);

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
      <BreadCrumb title="product" />
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
                  Starting bid:{" "}
                  <span style={{ color: "#2695ff" }}>$4,233,434.00</span>
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
                  <input type="number" min="99" defaultValue="$99" size="4" />
                </div>
                <div className="btn-bid">
                  <button>BID</button>
                </div>
              </div>
            </div>
          </div>

          <div className="auction-tabs">
            <div className="button-description">
              <button
                className={tabId === "description" ? "active" : ""}
                onClick={() => setTabId("description")}
              >
                Description
              </button>
            </div>
            <div className="button-addition">
              <button
                className={tabId === "information" ? "active" : ""}
                onClick={() => setTabId("information")}
              >
                {" "}
                Addtional information
              </button>
            </div>
            <div className="button-history">
              <button
                className={tabId === "history" ? "active" : ""}
                onClick={() => setTabId("history")}
              >
                {" "}
                Auction History
              </button>
            </div>
            <div className="button-vendorinfo">
              <button
                className={tabId === "vendorinfo" ? "active" : ""}
                onClick={() => setTabId("vendorinfo")}
              >
                {" "}
                Vendor Info
              </button>
            </div>
          </div>

          <div className="auction-tabcontent">
            <div
              className="content-description"
              id="description"
              style={
                tabId === "description"
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <p>
                Going forward knowledge is power or we need to button up our
                approach old boys club. Please use “solutionise” instead of
                solution ideas! 🙂 draw a line in the sand, for take five, punch
                the tree, and come back in here with a clear head. Out of scope
                data-point work flows , nor critical mass, and time to open the
                kimono yet move the needle.
              </p>
            </div>
            <div
              className="content-information"
              id="information"
              style={
                tabId === "information"
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <table class="table" bordered>
                <tbody>
                  <tr>
                    <td scope="row" className="td-custom">
                      Color
                    </td>
                    <td>White</td>
                  </tr>
                  <tr>
                    <td scope="row" className="td-custom">
                      Condition
                    </td>
                    <td>New</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              className="auction-history"
              style={
                tabId === "history" ? { display: "block" } : { display: "none" }
              }
            >
              <table>
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Bid</td>
                    <td>User</td>
                    <td>Auto</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>August 20, 2021 06:49:15 pm</td>
                    <td className="table-bid-price">$295.00</td>
                    <td>s************************m</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
