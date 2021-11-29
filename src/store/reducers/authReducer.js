const initialState = {
  auth: [],
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      // console.log(action.payload, "REDUCER AUTH");
      return { ...state, auth: [action.payload] };

    case "SIGN_OUT":
      console.log("Signout Reducer");
      return {
        ...state,
        auth: [],
      };

    default:
      return state;
  }
};
export default AuthReducer;
