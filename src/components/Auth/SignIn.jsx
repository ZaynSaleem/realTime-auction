import React, { useState } from "react";
import "./auth.css";
import { FaTwitter, FaGoogle } from "react-icons/fa";
import LoginImg from "../../assets/loginImage.png";
import firebase, { db } from "../../config/firebase/firebase";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/AuthAction";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const SignIn = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [errorMessages, setErrorMessages] = useState("");
  const [bool, setBool] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setErrorMessages("");
    setBool(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data?.email, data?.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        if (
          data?.email === "admin@admin.com" &&
          data?.password === "12345678"
        ) {
          dispatch(login(data));
          toast.success("Logged in successfully");
          setBool(false);
          history.push("/dashboard");
        } else {
          db.collection("users")
            .where("email", "==", data?.email)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (!doc?.data()?.status) {
                  dispatch(login(doc.data()));
                  console.log(doc.id, " => ", doc?.data());
                  setBool(false);
                  toast.success("Logged in successfully");
                  history.push("/");
                } else {
                  setBool(false);
                  toast.error("Your account is blocked by admin");
                }
              });
            })
            .catch((error) => {
              toast.error("Error adding document: ", error);
            });
        }
      })
      .catch((error) => {
        toast.error("Error adding document: ", error?.message);
        setBool(false);
        setErrorMessages(error);
      });
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form_input_signIn">
                <span>Email</span>
                <input
                  id="email"
                  {...register("email", { required: true, maxLength: 30 })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="error-message">This is required</span>
                )}
              </div>

              <div className="form_input_signIn">
                <span>Password</span>
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: true, maxLength: 30 })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="error-message">This is required</span>
                )}
                {errorMessages ? (
                  <p className="error-message">incorrect email or password</p>
                ) : null}
              </div>

              <div className="form_input_btn">
                {bool === false ? (
                  <button className="btn_create_signIn" type="submit">
                    Sign In
                  </button>
                ) : (
                  <button className="btn_create_signIn" type="submit" disabled>
                    <span className="spinner-border spinner-border-sm"></span>
                    Sign In
                  </button>
                )}
              </div>
              <div className="top_text_end_signIn">
                Not a member?<a href="#"> Sign up now</a>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
