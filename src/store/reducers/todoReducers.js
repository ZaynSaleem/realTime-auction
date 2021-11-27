let initialState111 = {
  todo: [],
};

const reducer = (state = initialState111, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };

    case "DELETE":
      let dupData = [...state.todo];
      let newArr = dupData.filter((x) => x.id !== action.payload);
      return {
        ...state,
        todo: newArr,
      };

    case "UPDATE":
      let dup = [...state.todo];
      let updated = dup.findIndex((x) => x.id === action.payload.id);
      dup[updated].category = action.payload.category;

      return {
        ...state,
        todo: dup,
      };
    default:
      return state;
  }
};

export default reducer;
