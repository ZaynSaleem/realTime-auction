import React from "react";
import "./auth.css";
import { FaTwitter, FaGoogle } from "react-icons/fa";
import LoginImg from "../../assets/loginImage.png";

const SignIn = () => {
  return (
    <div className="flex_container">
      <div className="flex_left_signIn">
        <div className="left_head_signIn">
          <div className="logo_signIn">
            <h1>
              {" "}
              <span>i</span>BID
            </h1>{" "}
          </div>
          <div className="text">
            <h1>Discover the world’s top Designers & Creatives.</h1>
          </div>
        </div>
        <div className="image_left_signIn">
          <img src={LoginImg} />
        </div>
      </div>

      <div className="flex_right_signIn">
        <div className="top_text_signIn">
          Not a Member?<a href="/sign-up"> Sign up now</a>{" "}
        </div>
        <div className="center_content_signIn">
          <div className="SignIn_head">
            <div className="text_signIn_head">
              <h2>Sign In to iBID</h2>
            </div>
            <div className="btn_signIn_google">
              <button>
                <span>
                  <FaGoogle />
                </span>{" "}
                Sign in with Google
              </button>
            </div>
            <div className="btn_twitter_signIn">
              <button>
                <span>
                  <FaTwitter />
                </span>
                Twitter
              </button>
            </div>
          </div>
          <div className="SignIn_line">
            <hr className="divider"></hr>
          </div>
          <div className="auth_form_wrapper_signIn">
            <div className="form_input_signIn">
              <span>Email</span>
              <input type="email" />
            </div>

            <div className="form_input_signIn">
              <span>Password</span>
              <input type="password" />
            </div>

            <div className="form_input_btn">
              <button className="btn_create_signIn">Sign In</button>
            </div>
            <div className="top_text_end_signIn">
              Not a member?<a href="#"> Sign up now</a>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
