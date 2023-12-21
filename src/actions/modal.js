import { DISPLAY_MODAL } from "../utils/types";

export const setDisplayModal = (payload) => {
  console.log(payload);
  return {
    type: DISPLAY_MODAL,
    payload,
  };
};
