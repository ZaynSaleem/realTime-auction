import React, { useState } from "react";
import "./auth.css";
// import { FaUser, FaLock, FaEnvelope, FaTwitter } from "react-icons/fa";
import left from "../../assets/left_main.png";
import firebase, { db } from "../../config/firebase/firebase";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {
  let history = useHistory();
  const [bool, setBool] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
   
    setBool(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user.uid;
        console.log(user);

        db.collection("users")
          .add({
            uid: user,
            name: data.username,
            email: data.email,
            role: data.role,
            status : false
          })
          .then((docRef) => {
            setBool(false);
            toast.success("User Registered");
            console.log("Document written with ID: ", docRef.id);
            history.push("/sign-in");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

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
        <div className="image_left">{/* <img src={left} /> */}</div>
      </div>

      <div className="flex_right">
        <div className="top_text">
          Already a member?<a href="/sign-in"> Sign in now</a>{" "}
        </div>
        <div className="center_content">
          <div className="SignUp_head">
            <h2>Sign Up to iBID</h2>
          </div>

          <div className="auth_form_wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form_input">
                <span>Username</span>
                <input
                  id="username"
                  {...register("username", { required: true, maxLength: 30 })}
                />
                {errors.username && errors.username.type === "required" && (
                  <span>This is required</span>
                )}
              </div>

              <div className="form_input">
                <span>Email</span>
                <input
                  id="email"
                  {...register("email", { required: true, maxLength: 30 })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span>This is required</span>
                )}
              </div>

              <div className="form_input">
                <span>Password</span>
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: true, maxLength: 30 })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span>This is required</span>
                )}
              </div>

              <div className="form_input">
                <span>Select Role</span>
                <select {...register("role", { required: true })}>
                  <option value="" disabled selected hidden>
                    Select Role
                  </option>
                  <option value="vendor">Vendor</option>
                  <option value="user">User</option>
                </select>
                {errors.role &&
                  errors.role.type === "required" && (
                    <span>This is required</span>
                  )}
              </div>

              <div className="form_input_btn">
                {bool === false ? (
                  <button className="btn_create" type="submit">
                    Create Account
                  </button>
                ) : (
                  <button className="btn_create" type="submit" disabled>
                    <span class="spinner-border spinner-border-sm"></span>{" "}
                    Create Account
                  </button>
                )}
              </div>
              <div className="top_text_end">
                Already a member?<a href="/sign-in"> Sign in now</a>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
