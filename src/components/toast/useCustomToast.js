import { useToasts } from "react-toast-notifications";

// Custom hook to use toast functionality
export const useCustomToast = () => {
  const { addToast } = useToasts();

  const showToast = (message, appearance, autoDismiss = true, autoDismissTimeout = 5000) => {
    addToast(message, {
      appearance,
      autoDismiss,
      autoDismissTimeout,
    });
  };

  return showToast;
};
