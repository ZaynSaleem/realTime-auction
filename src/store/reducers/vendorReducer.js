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

    // case "PRODUCT_DELETE":
    //   // console.log("reducer dlte", action.payload);

    // let dupData = [...state.products];
    // let newArr = dupData.filter((x) => x.id !== action.payload);
    // return {
    //   ...state,
    //   products: newArr,
    // };

    default:
      return state;
  }
};

export default VendorReducer;
