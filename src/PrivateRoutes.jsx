import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const Data = useSelector((state) => state?.auth.auth);
  console.log(Data);
  if (Data && Data.length) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
    // return <Component  />;
  } else {
    return <Redirect to="/sign-in" />;
  }
}
