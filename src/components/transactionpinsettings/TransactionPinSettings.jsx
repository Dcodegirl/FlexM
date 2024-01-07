import React, { useState, useEffect, useRef } from "react";
import axios from "../../utils/axiosInstance";
import { useToasts } from "react-toast-notifications";



const TransactionPinSettings = ({ title }) => {
    const pinInputRefs = [useRef(), useRef(), useRef(), useRef()];
    const confirmPinInputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [pin, setPin] = useState([]);
    const [confirmPin, setConfirmPin] = useState([]);
    const [loading, setLoading] = useState('');
    const { addToast } = useToasts();


    const [pinPayload, setPinPayload] = useState({
        agent_id: "",
        transaction_pin: "",
      });

      const TRANSACTION_PIN = "/AgPin";

      useEffect(() => {
        // Make API call to fetch user information
        axios
          .get("/agent/userinfo")
          .then((response) => {
           
    
            setPinPayload({
              ...pinPayload,
              agent_id: response.data.data.agent.id,
            });
          })
          .catch((error) => {
            console.error("Error fetching user information:", error);
          });
      }, []);
    
    const handleInputChange = (index, setValue, nextInputRef, e) => {
        const { value } = e.target;
        setValue((prevPin) => {
          const newPin = [...prevPin];
          newPin[index] = value;
    
          // Move focus to the next input field if there is one and the current input is not the last one
          if (value !== "" && index < 3 && nextInputRef.current) {
            nextInputRef.current.focus();
          } else if (index === 3 && value !== "") {
            // Move to the first input of the confirm PIN form when the last PIN input is filled
            confirmPinInputRefs[0].current.focus();
          }
    
          return newPin;
        });
      };
      
  const handleConfirmPinInputChange = (index, e) => {
    const { value } = e.target;
    setConfirmPin((prevConfirmPin) => {
      const newConfirmPin = [...prevConfirmPin];
      newConfirmPin[index] = value;

      // Move focus to the next input field if there is one
      if (value !== "" && confirmPinInputRefs[index + 1]?.current) {
        confirmPinInputRefs[index + 1].current.focus();
      }

      return newConfirmPin;
    });
  };
  const handleTransactionPin = async () => {
    // Check if pin and confirmPin are not the same
    setLoading(true)
    if (pin.join("") !== confirmPin.join("")) {
      // Display an error toast if pin and confirmPin do not match
      addToast("PIN and Confirm PIN do not match!", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000, // milliseconds
      });
      setLoading(false)
      return; // Stop further processing
    }
  
    // Check if either pin or confirmPin is empty
    if (pin.join("") === "" || confirmPin.join("") === "") {
      addToast("Please enter both PIN and Confirm PIN", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000, // milliseconds
      });
      setLoading(false)
      return; // Stop further processing
    }
  
    // At this point, pin and confirmPin are the same, and both are not empty
    const transactionPin = {
      agent_id: pinPayload.agent_id,
      transaction_pin: pin.join(""),
    };
  
    try {
      let data = await axios.post(TRANSACTION_PIN, transactionPin);
      addToast("Transaction pin updated successfully!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000, // milliseconds
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // This ensures that setLoading(false) is executed regardless of success or failure
    }
  };

  return (
    <div className="flex md:flex-row flex-col">
              <div className="md:w-[200px] w-0"></div>
      <div className="flex justify-center align-center" id="pin">
           <div className="md:py-20 md:px-40 px-20 text-2xl">
          <div className="flex md:flex-row flex-col md:gap-20 items-center mb-8">
            <div className="flex flex-col my-4 md:my-0">
              <p>Enter Pin</p>
              <form className="flex space-x-4">
                {pinInputRefs.map((ref, index) => (
                  <input
                    key={index}
                    placeholder="*"
                    type="text"
                    className="md:w-[66px] w-[40px] md:h-[69px] h-[53px] border border-gray-300 rounded text-center md:text-4xl text-2xl"
                    maxLength="1"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        setPin,
                        pinInputRefs[index + 1],
                        e
                      )
                    }
                    ref={ref}
                  />
                ))}
              </form>
            </div>
            <div className="flex flex-col  my-4 md:my-0">
              <p>Confirm Pin</p>
              <form className="flex space-x-4">
                {confirmPinInputRefs.map((ref, index) => (
                  <input
                    key={index}
                    placeholder="*"
                    type="text"
                    className="md:w-[66px] w-[40px] md:h-[69px] h-[53px] border border-gray-300 rounded text-center md:text-4xl text-2xl"
                    maxLength="1"
                    onChange={(e) => handleConfirmPinInputChange(index, e)}
                    ref={ref}
                  />
                ))}
              </form>
            </div>
          </div>

         
          <button
            type="submit"
            onClick={handleTransactionPin}
            className={`bg-color1  rounded-lg h-14 w-full text-white mx-auto relative ${loading ? 'opacity-50 pointer-events-none' : ''
              }`}
            disabled={loading}
          >
            {loading && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="loader"></div>
              </div>
            )}
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
        </div>
    </div>
  )
}

export default TransactionPinSettings
