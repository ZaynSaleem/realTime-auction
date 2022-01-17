import React, { useEffect } from "react";
import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";

import { useState } from "react";

import Sidebar from "../../components/header/Sidebar";
import { Table } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { db } from "../../config/firebase/firebase";

import Loader from "../../components/Loader/loader";
import Topbar from "../../components/topbar/Topbar";
import BreadCrumb from "../../components/breadCrumb";

const Vendor = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state?.vendor.data);
  // console.log(Data);
  const [toggleBool, setToggleBool] = useState(false);
  const [loaderBool, setLoaderBool] = useState(false);
  const [vendorData, setVendorData] = useState([]);

  const {
    formState: { errors },
    setValue,
  } = useForm({});
  let arr = [];
  useEffect(() => {
    setLoaderBool(true);
    db.collection("users")
      .where("role", "==", "vendor")
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
    console.log(e.target.checked);
    console.log(e.target.value);
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
        console.log(dup);
        setVendorData(dup);
      });
  };

  return (
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
            <BreadCrumb title="Vendors" bool={true} />

            <div
              className="vendor-container-category-wrapper"
              style={{ display: loaderBool === true ? "none" : "block" }}
            >
              <div className="container-category-wrapper">
                <div className="table-wrapper">
                  <div className="table-form">
                    <Table bordered>
                      <thead dark>
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
                                <th scope="row">{++index}</th>
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
                                    <label class="switch">
                                      <input
                                        checked={item.status}
                                        value={item?.id}
                                        type="checkbox"
                                        onChange={(e) => handleStatus(e)}
                                      />
                                      <span class="slider-switch round"></span>
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
  );
};

export default Vendor;
