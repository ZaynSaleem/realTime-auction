const initialState = {
  auth: [],
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log(action.payload, "REDUCER AUTH");
      return { ...state, auth: [action.payload] };

    default:
      return state;
  }
};
export default AuthReducer;
