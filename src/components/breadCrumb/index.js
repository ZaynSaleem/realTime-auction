import React from "react";
import "./style.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const BreadCrumb = (props) => {
  return (
    <div className="main-content">
      <div className="custom_container">
        <div className="bread-crumbs">
          {!props?.bool ? (
            <>
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Library</Breadcrumb.Item>
                <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="product-name">
                <h3>{props?.title}</h3>
              </div>
            </>
          ) : (
            <Breadcrumb>
              <Breadcrumb.Item href="/">iBID</Breadcrumb.Item>
              <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
