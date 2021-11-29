const initialState = {
  data: [],
  products: [],
};

const VendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VENDOR":
      return {
        ...state,
        data: action.payload,
      };

    case "GET_VENDOR_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default VendorReducer;
