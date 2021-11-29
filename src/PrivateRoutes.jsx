import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

export default function PrivateRoute({ component: Component }) {
  const Data = useSelector((state) => state?.auth.auth);
    console.log(Data);
  if (Data && Data.length) {
    return <Component />;
  } else {
    return <Redirect to="/sign-in" />;
  }
}
