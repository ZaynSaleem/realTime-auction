import React, { useEffect } from "react";
import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { db } from "../../config/firebase/firebase";
import { addCat, dltTodo, updateCat } from "../../store/actions";

const AddCategory = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state?.todo.todo);
  // console.log(Data);
  const [toggleBool, setToggleBool] = useState(false);
  const [modal, setModal] = useState(false);
  const [btnBool, setBtnBool] = useState(false);
  const [editId, setEditId] = useState("");
  const [categoryName, setcategoryName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({});

  useEffect(() => {
    console.log(Data);
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
          dispatch(addCat(obj));
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
          dispatch(updateCat(editId, data.category));
          console.log("Document successfully updated!");
        });
    }
  };

  const editCat = (id) => {
    setEditId(id);
    let data = Data.find((x) => x.id === id);
    if (data) {
      setValue("category", data?.category);
      setModal(!modal);
      setBtnBool(true);
    }
  };

  const deleteCat = (id) => {
    db.collection("category")
      .doc(id)
      .delete()
      .then(() => {
        toast.success("Deleted Successfully");
        dispatch(dltTodo(id));
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div>
      <div className="container-admin">
        <Sidebar toggleBool={toggleBool} />

        <div
          className="dashboard-content"
          style={toggleBool === false ? { width: "80%" } : { width: "100%" }}
        >
          <div className="dashboard-content-container">
            <div className="dashboard-top-bar">
              <div className="button-toggle">
                <button onClick={toggleButton}>
                  {" "}
                  <img src={ToggleMenu} />
                </button>
              </div>
              <div className="content-top">Add-Category</div>
            </div>

            <div className="dashboard-card-wrapper">
              <div className="container-category-wrapper">
                <div className="add-button">
                  <button className="btn btn-success" onClick={toggle}>
                    Add Category
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
                        {Data && Data?.length ? (
                          Data.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{item.category}</td>
                                <td className="button-action">
                                  <button
                                    className="btn btn-success"
                                    onClick={() => editCat(item.id)}
                                  >
                                    {" "}
                                    <FaRegEdit size={20} />
                                  </button>

                                  <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCat(item.id)}
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
