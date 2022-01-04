import React from "react";
import "./style.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";


const BreadCrumb = () => {
  return (
    <div className="main-content">
      <div className="custom_container">
        <div className="bread-crumbs">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Library</Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
          <div className="product-name">
            <h3>Dual SIM Smartphone</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
