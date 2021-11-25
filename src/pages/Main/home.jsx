import Navbar from "../../components/header/Navbar";
import Slider from "../../components/Slider/Slider";
import card1 from "../../assets/card1.jpg";
import card2 from "../../assets/card2.jpg";
import card3 from "../../assets/card3.jpg";
import card4 from "../../assets/card4.jpg";
import "./style.css";
import Card from "../../components/Cards/Card";
import {
  FaAngleRight,
  FaUserAlt,
  FaGlassMartini,
  FaTrophy,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import StepsCard from "../../components/Cards/StepsCard";
import Footer from "../../components/footer/Footer";
import sliderImage from "../../assets/sliderHome.jpg";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <FaAngleRight/> */}
      {/* <FaUserAlt/> */}
      <Slider image={sliderImage} />
      <div className="main-content">
        <div className="custom_container">
          <div className="main-content-head">
            <div className="text-content">
              Current <span>Auctions</span>
            </div>
          </div>

          <div className="card-main">
            <Card image={card1} />
            <Card image={card2} />
            <Card image={card3} />
            <Card image={card4} />
            <Card image={card1} />
            <Card image={card1} />
          </div>
          
        </div>
      </div>
      <div className="steps-wrapper">
        <div className="custom_container">
          <div className="steps-head">
            <div className="head-text">
              <p> How ?</p>{" "}
              <h1>
                How <span>It Works</span>{" "}
              </h1>
            </div>
          </div>
          <div className="steps-card-wrapper">
            <StepsCard
              circleIcon={<FaUserAlt />}
              angleIcon={<FaAngleRight size={25} />}
              head="Register"
              bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur quaerat magnam sequi nobis ut et iure."
            />
            <StepsCard
              circleIcon={<FaRegMoneyBillAlt />}
              angleIcon={<FaAngleRight size={25} />}
              head="Buy or Bid"
              bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur quaerat magnam sequi nobis ut et iure."
            />
            <StepsCard
              circleIcon={<FaGlassMartini />}
              angleIcon={<FaAngleRight size={25} />}
              head="Submit a bid"
              bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur quaerat magnam sequi nobis ut et iure."
            />
            <StepsCard
              circleIcon={<FaTrophy />}
              head="Win"
              bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur quaerat magnam sequi nobis ut et iure."
            />
          </div>
        </div>
      </div>

      <div className="register-now-wrapper">
        <div className="custom_container">
          <div className="register-now-main">
            <div className="register-now-text">
              <h1> Create an account and start Buy, Bid or Sell Now!</h1>
            </div>
            <div className="register-now-button">
              <button>Register</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
