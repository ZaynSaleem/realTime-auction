export const getVendor = (obj) => {
  return (dispatch) => {
    //   console.log(obj , 'Vendor');
    dispatch({
      type: "GET_VENDOR",
      payload: obj,
    });
  };
};

export const getVendorProduct = (obj) => {
  return (dispatch) => {
    //   console.log(obj , 'Vendor');
    dispatch({
      type: "GET_VENDOR_PRODUCT",
      payload: obj,
    });
  };
};

// export const dltProduct = (id) => {
//   // console.log("action", id);
//   return (dispatch) => {
//     dispatch({
//       type: "PRODUCT_DELETE",
//       payload: id,
//     });
//   };
// };
