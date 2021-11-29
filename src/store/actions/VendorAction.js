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
}

