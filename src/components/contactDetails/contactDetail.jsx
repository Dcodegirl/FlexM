import React, { useState, useEffect, useRef } from "react";
import profileAvatar from "../../assets/images/avatarImg.svg";
import svg from "../../assets/images/Upload.svg";
import axios from "../../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";


const ContactDetail = () => {
    const [userData, setUserData] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const fileInputRef = useRef('');
    const [fileUploaded, setFileUploaded] = useState(false);
    const [loading, setLoading] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const { addToast } = useToasts();


    const [payload, setPayload] = useState({
        email: "",
        password: {
          old_password: "",
          new_password: "",
          confirm_password: "",
        },
        image: "",
      });
      const [docUploadPayload, setDocUploadPayload] = useState("");

      console.log(userData);

      const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
      };
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        console.log(file)
      };

      const CONTACT_DETAILS = "/agent/contact";

      const handleUpload = () => {
        // Perform upload logic
        // Set uploadProgress based on the actual progress
        // This is just a placeholder, replace it with your actual upload logic
        setUploadProgress(100);
        setFileUploaded(true);
        setTimeout(() => {
          setFileUploaded(false);
        }, 2000);
      };

      const handleUploadButtonClick = () => {
        // Trigger click on the hidden file input
        fileInputRef.current.click();
      };

      const handleSaveChanges = async () => {
        try {
          setLoading(true);
      
          // Check if the image size is more than 3MB
          if (selectedImage && selectedImage.size > 3 * 1024 * 1024) {
            console.error("Image size exceeds 3MB");
            // Display an error toast notification
            addToast("Image size should not exceed 3MB", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000, // milliseconds
            });
            return; // Stop further processing
          }
      
          const contactUpdate = new FormData();
          contactUpdate.append('email', userData.email);
          contactUpdate.append('image', selectedImage);
          contactUpdate.append('old_password', payload.password.old_password);
          contactUpdate.append('new_password', payload.password.new_password);
          contactUpdate.append('confirm_password', payload.password.new_password);
      
          console.log(contactUpdate);
      
          // Send a request to update the user profile
          await axios.post(CONTACT_DETAILS, contactUpdate);
          // Display a success toast notification
          addToast("Profile updated successfully!", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000, // milliseconds
          });
        } catch (error) {
          console.error("Error saving changes:", error);
      
          if (error.response) {
            // The request was made and the server responded with a status code
            const { data, status } = error.response;
            console.error(`HTTP error! Status: ${status}, Message: ${data.message}`);
            
            // Handle different status codes
            switch (status) {
              case 400:
                // Bad Request (400)
                if (data && data.errors) {
                  Object.values(data.errors).flat().forEach(errorMessage => {
                    addToast(`${errorMessage}`, {
                      appearance: 'error',
                      autoDismiss: true,
                      autoDismissTimeout: 3000,
                    });
                  });
                } else if (data && data.message) {
                  addToast(`${data.message}`, {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                  });
                } else {
                  addToast('Bad Request. Please check your input.', {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                  });
                }
                break;
              case 500:
                // Internal Server Error (500)
                addToast('Internal Server Error. Please try again later.', {
                  appearance: 'error',
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });
                break;
              // Add more cases for other status codes as needed
              default:
                // Display an error toast with the API response message
                addToast(data.message || 'An unexpected error occurred.', {
                  appearance: "error",
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received from the server.");
      
            addToast("No response from the server. Please try again.", {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          } else {
            // Something happened in setting up the request that triggered an error
            console.error("An unexpected error occurred:", error.message);
      
            // Display an error toast with the API response message if available
            addToast(error.message || 'An unexpected error occurred.', {
              appearance: "error",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          }
        } finally {
          setLoading(false); // Set loading to false regardless of success or error
        }
      };
      
  useEffect(() => {
    // Make API call to fetch user information
    axios
      .get("/agent/userinfo")
      .then((response) => {
        setUserData(response.data.data.agent);
        setPayload({
          ...payload,
          email: response.data.data.agent.email,

        });

      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(CONTACT_DETAILS);
        const userProfileData = response.data; // Adjust this based on your API response structure
        console.log(response.data);

        // setEmail(userProfileData.email || '');
        // setPassword(userProfileData.password || '');
        // setConfirmPassword(userProfileData.password || '');
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
      
  return (
    <div className="md:p-20 p-5 text-2xl" id="contact">
          {/* Replace the following comment with your actual contact details form */}
          <form className="flex flex-col">
            <div className="flex gap-10 items-center my-8">
              <div className="flex flex-col text-xl">
                <label htmlFor="phone number" className="my-3">
                  Phone Number:
                </label>
                <input
                  type="number"
                  placeholder="Type..."
                  id="phone-number"
                  name="phone number"
                  value={userData ? userData.business_phone : ""}
                  className="outline outline-gray-100 py-3 px-3 md:w-[300px] lg:w-[500px] w-full"
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="my-3">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Type..."
                  id="email"
                  name="email"
                  className="outline outline-gray-100 py-3 px-1 md:w-[300px] lg:w-[500px] w-full"
                  value={userData ? userData.email : ""}
                />
              </div>
            </div>
            <div className="flex gap-10 items-center my-8">
              <div className="flex flex-col">
                <label htmlFor="password" className="my-3">
                  Old Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={payload.password.old_password}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        password: {
                          ...payload.password,
                          old_password: e.target.value,
                        },
                      })
                    }
                    placeholder="***********"
                    className="outline outline-gray-100 py-3 px-3 md:w-[300px] lg:w-[500px] w-full pr-12" // Adjust paddingRight to accommodate the icon
                    required
                  />
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="password-toggle absolute inset-y-0 right-0 flex items-center cursor-pointer"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="confirmPassword" className="my-3">
                  New Password:
                </label>
                <div className="password-input relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={payload.password.new_password}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        password: {
                          ...payload.password,
                          new_password: e.target.value,
                          confirm_password: e.target.value,
                        },
                      })
                    }
                    placeholder="***********"
                    className="outline outline-gray-100 py-3 px-3 md:w-[300px] lg:w-[500px] w-full pr-12" // Adjust paddingRight to accommodate the icon
                    required
                  />
                  <button
                    type="button"
                    onClick={handleToggleConfirmPasswordVisibility}
                    className="password-toggle absolute inset-y-0 right-0 flex items-center cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-10 items-center my-8">
              {/* Display the selected image (if any) */}
              <div className="flex flex-col">
                {/* {selectedImage && (
                  <img
                    src={}
                    alt="Selected"
                    className="mb-4 rounded-lg"
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                )} */}

                {/* Image upload input */}
                <label htmlFor="imageInput" className="mb-2">
                  Image:
                </label>

                <div className="flex flex-col border border-gray-100 items-center p-6">
                  <input
                    type="file"
                    id="imageInput"
                    name="image"
                    accept=".pdf, .jpg, .png"
                    onChange={handleImageChange}
                    className=" mb-4"
                    ref={fileInputRef} // Reference to the hidden file input
                    style={{ display: "none" }}
                  />
                  <div className="h-20 w-20 overflow-hidden rounded-full">
                    <img
                      alt=""
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : profileAvatar
                      }
                      className="w-full h-full"
                    />
                  </div>

                  <button
                    type="button"
                    className="bg-white text-white px-4 py-2 rounded"
                    onClick={handleUploadButtonClick}
                  >
                    <img src={svg} alt="" />
                  </button>
                  <p className="w-1/2 text-center">
                    Click to upload or drag and drop SVG, PNG, JPG (max,
                    3mb)
                  </p>
                </div>
              </div>

              {/* Additional form elements or buttons can be added here */}

              <div className="flex gap-10 items-center my-8"></div>
            </div>

            <button
              type="submit"
              onClick={handleSaveChanges}
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
          </form>
        </div>
  )
}

export default ContactDetail
