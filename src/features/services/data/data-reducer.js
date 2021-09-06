export const initialState = {
    amount: '',
    phone: '',
    plan: '',
    transaction_pin: '',
};

const AirtimePurchaseReducer = (state, { type, payload }) => {
    switch (type) {
        case 'UPDATE_FORM_STATE':
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default AirtimePurchaseReducer;
