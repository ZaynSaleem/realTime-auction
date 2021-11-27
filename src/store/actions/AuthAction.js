export const login = (email) => {
  return (dispatch) => {
    console.log("-----Action----");
    dispatch({
      type: "SIGN_IN",
      payload: { email },
    });
  };
};

// export const logout = () => {
//   return (dispatch) => {
//     console.log("logout action");
//     dispatch({
//       type: "SIGN_OUT",
//     });
//   };
// };
