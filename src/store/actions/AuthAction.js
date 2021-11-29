export const login = (obj) => {
  return (dispatch) => {
    // console.log("-----Action----");
    dispatch({
      type: "SIGN_IN",
      payload: obj ,
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: "SIGN_OUT",
    });
  };
};
