export const initialState = {
    utilitybill: false,
    passportpix: false,
    idcard: false,
    guarantorform: false,
};

const UploadReducer = (state, { type, payload }) => {
    switch (type) {
        case 'UPDATE_DETAILS':
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default UploadReducer;
