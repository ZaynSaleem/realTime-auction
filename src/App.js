import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Home from "./pages/Main/home";
import Dashboard from "./pages/Admin/Dashboard";
import AddCategory from "./pages/Admin/AddCategory";
import { ToastContainer, toast } from 'react-toastify';

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
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/add-category">
            <AddCategory />
          </Route>
          <Route path="/">
            <Home />
          </Route>

          {/* 
        <Route path="/">
          <Home />
        </Route> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
