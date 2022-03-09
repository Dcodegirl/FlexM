export const initialState = {
    amount: "",
   
  };
  
  const commissionReducer = (state, { type, payload }) => {
    switch (type) {
      case "UPDATE_STATE":
        return { ...state, ...payload };
      default:
        return state;
    }
  };
  
  export default commissionReducer;