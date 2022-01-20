import "./style.css";
import React, { lazy, Suspense, useEffect } from "react";
import { useState } from "react";
import { Table } from "reactstrap";
import { useForm } from "react-hook-form";
import ToggleMenu from "../../assets/toggleMenu.png";
import { db } from "../../config/firebase/firebase";

const Sidebar = lazy(() => import("../../components/header/Sidebar"));
const Topbar = lazy(() => import("../../components/topbar/Topbar"));
const BreadCrumb = lazy(() => import("../../components/breadCrumb"));
const Loader = lazy(() => import("../../components/Loader/loader"));

const Users = () => {
  const [toggleBool, setToggleBool] = useState(false);
  const [loaderBool, setLoaderBool] = useState(false);
  const [vendorData, setVendorData] = useState([]);

  const {
    formState: { errors },
  } = useForm({});
  let arr = [];
  useEffect(() => {
    setLoaderBool(true);
    db.collection("users")
      .where("role", "==", "user")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            id: doc.id,
            email: doc.data()?.email,
            name: doc.data()?.name,
            role: doc.data()?.role,
            uid: doc.data()?.uid,
            status: doc.data()?.status,
          };
          arr.push(obj);
        });
        setVendorData(arr);
        setLoaderBool(false);
      });
  }, []);

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
    db.collection("users")
      .doc(id)
      .update({
        status: boolSwitch,
      })
      .then(() => {
        let dup = [...vendorData];
        let updated = dup.findIndex((x) => x.id === id);
        dup[updated].status = boolSwitch;

        setVendorData(dup);
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
              <BreadCrumb title="Users" bool={true} />

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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vendorData && vendorData?.length ? (
                            vendorData.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td scope="row">{++index}</td>
                                  <td>{item?.name}</td>
                                  <td>{item?.email}</td>
                                  <td>
                                    {!item?.status ? (
                                      <span className="status-active">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="status-vendor">
                                        blocked
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="btn-switch">
                                      <label className="switch">
                                        <input
                                          checked={item.status}
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

export default Users;
