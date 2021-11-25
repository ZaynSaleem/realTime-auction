import React from "react";
import "./auth.css";
import { FaUser, FaLock, FaEnvelope, FaTwitter } from "react-icons/fa";
import left from "../../assets/left_main.png";

const SignUp = () => {
  return (
    <div className="flex_container">
      <div className="flex_left">
        <div className="left_head">
          <div className="logo">
            <h1>
              {" "}
              <span>i</span>BID
            </h1>{" "}
          </div>
          <div className="text">
            <h1>Discover the world’s top Designers & Creatives.</h1>
          </div>
        </div>
        <div className="image_left">
          <img src={left} />
        </div>
      </div>

      <div className="flex_right">
        <div className="top_text">
          Already a member?<a href="/sign-in"> Sign in now</a>{" "}
        </div>
        <div className="center_content">
          <div className="SignUp_head">
            <h2>Sign Up to iBID</h2>
            {/* <button className="btn_signUp_google">Sign up with Google</button>
            <button className="btn_twitter">
              <FaTwitter /><span>Twitter</span>
            </button> */}
          </div>
          {/* <div className="SignUp_line">
            <hr className="divider"></hr>
          </div> */}
          <div className="auth_form_wrapper">
            <div className="form_input">
              <span>Username</span>
              <input type="text" />
            </div>

            <div className="form_input">
              <span>Email</span>
              <input type="email" />
            </div>

            <div className="form_input">
              <span>Password</span>
              <input type="password" />
            </div>

            <div className="form_input_btn">
              <button className="btn_create">Create Account</button>
            </div>
            <div className="top_text_end">
          Already a member?<a href="/sign-in"> Sign in now</a>{" "}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
