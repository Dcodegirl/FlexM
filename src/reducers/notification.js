const initialState = {
  notifications: [
    {
      title: `announcement`,
      body: `Dear Agent, be informed that you can now fun your wallet through your VFD account generated for you`,
    },
  ],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_NOTIFICATIONS":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    default:
      return state;
  }
};

export default notificationReducer;
