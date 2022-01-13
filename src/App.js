// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
import Users from "./pages/Admin/users";
import VendorProducts from "./pages/Admin/products";
import ViewProductDetails from "./pages/Vendors/viewproductdetails";
import Product from "./pages/Main/product";
import UserDash from "./pages/Users/dashboard";
import CurrentAuction from "./pages/Users/currentauction";
import MultipleProducts from "./pages/Main/multipleproducts";
 
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
          <PrivateRoute path="/bidders" component={Users} />
          <PrivateRoute path="/products" component={VendorProducts} />
          <PrivateRoute path="/viewproduct" component={ViewProductDetails} />
          <PrivateRoute path="/product/:id/:name" component={Product} />
          <PrivateRoute path="/allproducts" component={MultipleProducts} />

          <PrivateRoute path="/user-dash" component={UserDash} />
          
          <PrivateRoute path="/current-auction" component={CurrentAuction} />
          
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
