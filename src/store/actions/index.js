export const addCat = (obj) => {
  return (dispatch) => {
    dispatch({
      type: "ADD",
      payload: obj,
    });
  };
};

export const dltTodo = (id) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };
};

export const updateCat = (id, category) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE",
      payload: { id, category },
    });
  };
};
