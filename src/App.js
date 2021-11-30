import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Home from "./pages/Main/home";
import Dashboard from "./pages/Admin/Dashboard";
import AddCategory from "./pages/Admin/AddCategory";
import { ToastContainer, toast } from "react-toastify";
import PrivateRoute from "./PrivateRoutes";
import Vendor from "./pages/Admin/Vendors";
import VendorDash from "./pages/Vendors/vendorDash";
import AddProduct from "./pages/Vendors/addProduct";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        {" "}
        <Switch>
          <PrivateRoute path="/vendor-dash" component={VendorDash} />
          <PrivateRoute path="/add-category" component={AddCategory} />
          <PrivateRoute path="/add-product" component={AddProduct} />
          <PrivateRoute path="/edit-product/:id" component={AddProduct} />
          <PrivateRoute path="/vendors" component={Vendor} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
