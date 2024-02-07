const initialState = {
  notifications: [
    {
      title: `announcement`,
      body: `Dear Agent, be informed that you can now fund your wallet through your Wema account generated for you`,
    },
    {
      title: `Bank Transfer`,
      body: `Dear Agent, If you're experiencing difficulties with fund transfers, please navigate to Contact Details settings section and click on the "Save" button to ensure that your data are up-to-date.`,
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
