import "./style.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import { db } from "../../config/firebase/firebase";
import ToggleMenu from "../../assets/toggleMenu.png";

const Sidebar = lazy(() => import("../../components/header/Sidebar"));
const Topbar = lazy(() => import("../../components/topbar/Topbar"));
const BreadCrumb = lazy(() => import("../../components/breadCrumb"));
const Loader = lazy(() => import("../../components/Loader/loader"));

const VendorProducts = () => {
  let history = useHistory();

  const [toggleBool, setToggleBool] = useState(false);
  const [loaderBool, setLoaderBool] = useState(false);
  const [productData, setProductData] = useState([]);

  let arr = [];
  useEffect(async () => {
    setLoaderBool(true);
    db.collection("products")
      .get()
      .then(async (querySnapshot) => {
        for (let i = 0; i < querySnapshot.docs.length; i++) {
          let dupData = querySnapshot.docs[i].data();
          dupData.id = querySnapshot.docs[i].id;
          try {
            let item = await db.collection("category").doc(dupData.catId).get();
            dupData.catId = item?.data()?.categoryName;
            arr.push(dupData);
          } catch (error) {
            toast.error(error);
          }
        }
        setProductData(arr);
        setLoaderBool(false);
      });
  }, []);

  const toggleProduct = (item) => {
    let str = item?.productName;
    str = str.replace(/\s+/g, "-").toLowerCase();

    history.push(`/product/${item?.id}/${str}`);
  };

  const toggleButton = () => {
    if (!toggleBool) {
      setToggleBool(true);
    } else {
      setToggleBool(!toggleBool);
    }
  };

  const handleStatus = (e) => {
    let id = e.target.value;
    let boolSwitch = e.target.checked;
    db.collection("products")
      .doc(id)
      .update({
        adminStatus: boolSwitch,
      })
      .then(() => {
        let dup = [...productData];
        let updated = dup.findIndex((x) => x.id === id);
        dup[updated].adminStatus = boolSwitch;

        setProductData(dup);
      });
  };

  return (
    <Suspense fallback={<div></div>}>
      <div>
        <div className="container-admin">
          <Sidebar toggleBool={toggleBool} />

          <div
            className={
              toggleBool === false
                ? "vendor-dashboard-content"
                : "vendor-dashboard-content-toggle"
            }
          >
            <Topbar togglebtn={toggleButton} img={ToggleMenu} />

            <Loader bool={loaderBool} />
            <div className="vendor-dashboard-card-wrapper">
              <BreadCrumb title="Products" bool={true} />

              <div
                className="vendor-container-category-wrapper"
                style={{ display: loaderBool === true ? "none" : "block" }}
              >
                <div className="container-category-wrapper">
                  <div className="table-wrapper">
                    <div className="table-form">
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Category Name</th>
                            <th>Vendor status</th>
                            <th>Starting Bid</th>
                            <th>Admin Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData && productData?.length ? (
                            productData.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td scope="row">{++index}</td>
                                  <td>
                                    {" "}
                                    <a onClick={() => toggleProduct(item)}>
                                      {item?.productName}
                                    </a>
                                  </td>
                                  <td>{item?.catId}</td>
                                  <td>
                                    {item?.timerStatus === "Expired" ? (
                                      <span className="status-expired">
                                        Expired
                                      </span>
                                    ) : !item?.adminStatus ? (
                                      !item?.productStatus ? (
                                        <span className="status-active">
                                          Live
                                        </span>
                                      ) : (
                                        <span className="status-vendor">
                                          disabled
                                        </span>
                                      )
                                    ) : (
                                      <span className="status-vendor">
                                        blocked
                                      </span>
                                    )}
                                  </td>
                                  <td>{item?.startingBid}</td>
                                  <td>
                                    {!item?.adminStatus ? (
                                      <span className="status-active">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="status-vendor">
                                        disabled by admin
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="btn-switch">
                                      <label className="switch">
                                        <input
                                          checked={item?.adminStatus}
                                          value={item?.id}
                                          type="checkbox"
                                          onChange={(e) => handleStatus(e)}
                                        />
                                        <span className="slider-switch round"></span>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>No DATA</tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default VendorProducts;
