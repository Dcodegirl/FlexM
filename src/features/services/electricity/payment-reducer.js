export const initialFormState = {
  // disco: "",
  meterNo: "",
  accountName: "",
  paymentPlan: "",
  amount: "",
  phone: "",
  transaction_pin:"",
};

const ElecticityPaymentReducer = (formState, { type, payload }) => {
  switch (type) {
    case "UPDATE_FORM_STATE":
      return { ...formState, ...payload };
    default:
      return formState;
  }
};

export default ElecticityPaymentReducer;
