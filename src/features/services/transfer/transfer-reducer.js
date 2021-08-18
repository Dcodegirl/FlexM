export const initialFormState = {
    beneficiaryBankCode: '',
    beneficiaryBankName: '',
    amount: '',
    accountNumber: '',
    accountName: '',
    phone: '',
    narration: '',
    total: '',
    otp: '',
};

const FundsTransferReducer = (state, { type, payload }) => {
    switch (type) {
        case 'UPDATE_FORM_STATE':
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default FundsTransferReducer;
