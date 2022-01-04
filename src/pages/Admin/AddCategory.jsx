import React, { useEffect } from "react";
import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import { FaPlusCircle, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "../../components/header/Sidebar";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { db } from "../../config/firebase/firebase";
import { addCat, dltTodo, updateCat } from "../../store/actions";
import Loader from "../../components/Loader/loader";
import Topbar from "../../components/topbar/Topbar";

const AddCategory = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state?.todo.todo);
  // console.log(Data);
  const [toggleBool, setToggleBool] = useState(false);
  const [modal, setModal] = useState(false);
  const [btnBool, setBtnBool] = useState(false);
  const [editId, setEditId] = useState("");
  const [categoryName, setcategoryName] = useState("");
  const [dataCat, setDataCat] = useState([]);
  const [loaderBool, setLoaderBool] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({});
  let arr = [];
  useEffect(() => {
    setLoaderBool(true);
    db.collection("category")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            id: doc?.id,
            category: doc?.data()?.categoryName,
          };
          arr.push(obj);
        });
        setDataCat(arr);
        setLoaderBool(false);
      });
    // console.log(Data);
  }, []);

  const toggleButton = () => {
    if (!toggleBool) {
      setToggleBool(true);
    } else {
      setToggleBool(!toggleBool);
    }
  };

  const toggle = () => {
    setValue("category", "");
    setEditId("");
    setModal(!modal);
    setBtnBool(false);
  };

  const onSubmit = (data) => {
    setcategoryName("");
    if (!editId) {
      db.collection("category")
        .add({
          categoryName: data.category,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          let obj = {
            id: docRef.id,
            category: data.category,
          };
          arr.push(obj);
          setDataCat([...dataCat, ...arr]);
          // dispatch(addCat(obj));
          toast.success("New Category Added!");
          setModal(!modal);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      console.log(editId);
      setcategoryName("");
      setBtnBool(!btnBool);
      setModal(!modal);
      console.log(data);
      db.collection("category")
        .doc(editId)
        .update({
          categoryName: data.category,
        })
        .then(() => {
          let dup = [...dataCat];
          let updated = dup.findIndex((x) => x.id === editId);
          dup[updated].category = data.category;
          console.log(dup);
          setDataCat(dup);
        });
    }
  };

  const editCat = (id) => {
    setEditId(id);
    let dataDup = dataCat.find((x) => x.id === id);
    if (dataDup) {
      setValue("category", dataDup?.category);
      setModal(!modal);
      setBtnBool(true);
    }
  };

  const deleteCat = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      db.collection("category")
        .doc(id)
        .delete()
        .then(() => {
          toast.success("Document successfully deleted!");
          let dupData = [...dataCat];
          let newArr = dupData.filter((x) => x.id !== id);
          setDataCat(newArr);
        })
        .catch((error) => {
          toast.error("Error removing document: ", error);
        });
    }
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
          <div
            className="vendor-dashboard-card-wrapper"
            style={{ display: loaderBool === true ? "none" : "block" }}
          >
            <div className="vendor-container-category-wrapper">
              <div className="container-category-wrapper">
                <div className="add-button">
                  <button className="btn btn-success " onClick={toggle}>
                    <FaPlusCircle />
                  </button>
                </div>

                <div className="table-wrapper">
                  <div className="table-form">
                    <Table bordered>
                      <thead dark>
                        <tr>
                          <th>#</th>
                          <th>Category</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataCat && dataCat?.length ? (
                          dataCat.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{item.category}</td>
                                <td className="button-action">
                                  <button
                                    className="btn btn-success"
                                    onClick={() => editCat(item?.id)}
                                  >
                                    {" "}
                                    <FaRegEdit size={20} />
                                  </button>

                                  <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCat(item?.id)}
                                  >
                                    {" "}
                                    <FaTrashAlt size={20} />
                                  </button>
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
      <Modal isOpen={modal} toggle={toggle}>
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
          <ModalHeader toggle={toggle} charCode="X">
            Category
          </ModalHeader>
          <ModalBody>
            <div className="forms-category-wrapper">
              <div className="form-category">
                <div className="form-label">Add Category</div>
                <div className="form-input-cat">
                  <input
                    name="category"
                    {...register("category", { required: true, maxLength: 30 })}
                  />
                </div>
                {errors.category && errors.category.type === "required" && (
                  <span className="error-message">This is required</span>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {btnBool === false ? (
              <Button color="primary" type="submit">
                Add
              </Button>
            ) : (
              <Button color="primary" type="submit">
                Update
              </Button>
            )}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default AddCategory;
