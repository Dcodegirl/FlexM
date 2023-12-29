import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../utils/axiosInstance";
import svg from "../../assets/images/Upload.svg";
import profileAvatar from "../../assets/images/avatarImg.svg";
import { useToasts } from "react-toast-notifications";


const SettingsForm = () => {
  const [otp, setOtp] = useState("");
  const biodataRef = useRef(null);
  const [step, setStep] = useState(1);
  const [tabIndex, setTabIndex] = useState(1);
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
  const [pinPayload, setPinPayload] = useState({
    agent_id: "",
    transaction_pin: "",
  });
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [documentImage, setDocumentImage] = useState(null);
  const [utilityImage, setUtilityImage] = useState(null);
  const [docImage, setDocImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [guarantorSelect, setGuarantorSelect] = useState(null);
  const [pin, setPin] = useState([]);
  const [confirmPin, setConfirmPin] = useState([]);


  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const pinInputRefs = [useRef(), useRef(), useRef(), useRef()];
  const confirmPinInputRefs = [useRef(), useRef(), useRef(), useRef()];
  const utilityBillInputRef = useRef();
  const idDocumentInputRef = useRef();
  const [loading, setLoading] = useState('');


  // business_address
  // document_type
  // document_image
  // utility_image
  // guarantor_file

  const CONTACT_DETAILS = "/agent/contact";
  const TRANSACTION_PIN = "/AgPin";


  
  useEffect(() => {
    const url = new URL(window.location.href);
    const scrollToBiodata = url.searchParams.get('scrollToBiodata') === 'true' || url.hash === '#biodata';

    if (scrollToBiodata && biodataRef.current) {
      biodataRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  const handleDocumentFileChange = (e) => {
    const file = e.target.files[0];
  
    // Check if means of ID has been selected
    if (!selectedDocument) {
      addToast("Please select a valid means of ID", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      setDocumentImage(null); // Clear the selected file
    } else {
      // Check if the file size exceeds 3MB
      if (file && file.size > 3 * 1024 * 1024) {
        addToast("Means of ID image size should not exceed 3MB", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        setDocumentImage(null); // Clear the selected file
      } else {
        setDocumentImage(file);
      }
    }
  };
  
  const handleUtilityBillChange = (e) => {
    const file = e.target.files[0];
  
    // Check if the file size exceeds 3MB
    if (file && file.size > 3 * 1024 * 1024) {
      addToast("Utility image size should not exceed 3MB", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 6000,
      });
      setUtilityImage(null); // Clear the selected file
    } else {
      setUtilityImage(file);
    }
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
  

  const handleUserBioData = async () => {
    setLoading(true);
  
    // Check if the utility image size is more than 3MB
    
    // Check if the document image size is more than 3MB
     if (documentImage && documentImage.size > 3 * 1024 * 1024) {
      // Display an error toast notification
      addToast("Document image size should not exceed 3MB", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000, // milliseconds
      });
      setLoading(false);
      return;
    }
     // Check if selectedDocument is empty when documentImage is uploaded
  else if (!selectedDocument && documentImage) {
    addToast("Means of ID type is required to change Means of ID", {
      appearance: "error",
      autoDismiss: true,
      autoDismissTimeout: 3000, // milliseconds
    });
    setLoading(false);
    return;
  }
    // If neither utilityImage nor documentImage exceeds 3MB, proceed with the API request
    else {
      const bio = new FormData();
      bio.append("business_address", docUploadPayload);
      bio.append("guarantor_file", guarantorSelect || '');
      bio.append("utility_image", utilityImage || '');
      bio.append("document_type", selectedDocument);
      bio.append("document_image", documentImage || '');
      bio.append("country", selectedCountry || '');
      bio.append("state", selectedState || '');
  
      try {

        let data = await axios.post("/agent/bio-data", bio);
        if (data.status === 200) {
          addToast("Biodata updated successfully!", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000, // milliseconds
          });
          setLoading(false);
        }
      } catch (error) {
        addToast("An error occurred", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000, // milliseconds
        });
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  const handleGuarantorSelect = (e) => {
    const file = e.target.files[0];
  
    // Check if the file size exceeds 3MB
    if (file && file.size > 3 * 1024 * 1024) {
      addToast("Guarantor form size should not exceed 3MB", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 6000,
      });
      setGuarantorSelect(null); // Clear the selected file
    } else {
      setGuarantorSelect(file);
    }
  };
  
  const guarantorUpload = () => {
    // Your file upload logic here
    // After successful upload, setFileUploaded(true);
    setFileUploaded(true); // Simulate a successful upload for demonstration purposes
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

        setDocUploadPayload(response.data.data.agent.business_address);
        setPinPayload({
          ...pinPayload,
          agent_id: response.data.data.agent.id,
        });
        selectedCountry(response.data.data.agent.country || "");
        selectedState(response.data.data.agent.state || "");
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
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log(file)
  };

  const linkRef = useRef(null);

  const handleDocumentChange = (event) => {
    setSelectedDocument(event.target.value);
    setFileUploaded(true);
  };

  const handleUtilityFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        convertUtilityToBase64Utility(selectedFile);
        console.log("utility image = ", selectedFile);
      } catch (error) {
        console.error("Error encoding utility image:", error);
      }
    }
  };
  const convertUtilityToBase64Utility = (file) => {
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUtilityImage(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error encoding utility image:", error);
      }
    }
    setFileUploaded(true);
  };
  const downloadForm = () => {
    // Replace with the actual URL of the form document to be downloaded
    const formDocumentURL = "/path-to-your-form-document.pdf";
    window.open(formDocumentURL);
  };
  const handleDownload = () => {
    // Replace 'your_file_url_here' with the actual URL of the file you want to download
    const fileUrl = "your_file_url_here";

    // Create a download link
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "downloaded-file"; // Specify the desired filename

    // Append the link to the container ref and trigger a click event
    linkRef.current.appendChild(link);
    link.click();

    // Remove the link from the container ref
    linkRef.current.removeChild(link);
  };

  const handleFileChange = (event) => {
    // Access the selected files from the input
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform actions with the selected files, e.g., upload to a server
    if (selectedFiles) {
      // Here, you can handle file uploads or any other logic
      console.log("Selected files:", selectedFiles);
    }
  };



  const handleStateChange = (event) => {
    const selectedStateId = event.target.value;

    // Find the selected state object
    const selectedStateObject = states.find(state => state.id === selectedStateId);
    console.log(selectedStateObject)

    // Update selectedState state with the entire state object
    setSelectedState(selectedStateObject);
  };

  useEffect(() => {
    // Fetch the list of countries when the component mounts
    const fetchCountries = async () => {
      try {
        const response = await axios.get("/countries/all-countries");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const selectedCountryId = event.target.value;

    // Find the selected country object
    const selectedCountryObject = countries.find(country => country.id === selectedCountryId);

    // Update selectedCountry state with the entire country object
    setSelectedCountry(selectedCountryObject);

    // Fetch states based on the selected country
    try {
      const response = await axios.get(`/countries/all-states/${selectedCountryId}`);
      setStates(response.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formTitles = ["Contact Details", "Biodata", "Transaction Pin"];

  const handleStepChange = (newStep) => {
    setStep(newStep);
    setTabIndex(newStep);
  };
  const handleSaveChanges = async () => {
    setLoading(true)
    // Check if the image size is more than 3MB
    if (selectedImage && selectedImage.size > 3 * 1024 * 1024) {
      console.error("Image size exceeds 3MB");
      // Display an error toast notification
      addToast("Image size should not exceed 3MB", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000, // milliseconds
      });
      setLoading(false)
      return; // Stop further processing
    }

    const contactUpdate = new FormData();
    contactUpdate.append('email', userData.email)
    contactUpdate.append('image', selectedImage)
    contactUpdate.append('old_password', payload.password.old_password)
    contactUpdate.append('new_password', payload.password.new_password)
    contactUpdate.append('confirm_password', payload.password.new_password)
    console.log(contactUpdate);

    try {
      // Send a request to update the user profile
      await axios.post(CONTACT_DETAILS, contactUpdate);

      console.log("Changes saved!");

      // Display a success toast notification
      addToast("Profile updated successfully!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000, // milliseconds
      });
      setLoading(false)
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };


  let currentStepComponent;
  console.log(userData);
  switch (step) {
    case 1:
      currentStepComponent = (
        <div className="md:p-20 p-5 text-2xl">
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
                    accept="image/*"
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
      );
      break;
    case 2:
      currentStepComponent = (
        <div id="biodata" ref={biodataRef}>
        {/* Add your biodata form here */}
          <div className="md:p-20 p-5 text-2xl">
            {/* Replace the following comment with your actual contact details form */}
            <form className="flex flex-col">
              <div className="flex gap-10 items-center my-8">
                <div className="flex flex-col text-xl">
                  <label htmlFor="phone number" className="my-3">
                    Legal First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Type..."
                    id="phone-number"
                    name="phone number"
                    className="outline outline-gray-100  md:py-3 md:px-3 p-2 md:w-[300px] lg:w-[500px] w-full"
                    value={userData ? userData.first_name : ""}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="my-3">
                    Legal Last Name
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Type..."
                    name="email"
                    className="outline outline-gray-100 md:p-3 p-2 md:w-[300px] lg:w-[500px] w-full"
                    value={userData ? userData.last_name : ""}
                    disabled
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col md:gap-3 lg:justify-between md:items-center my-8 ">
                <div className="flex flex-col">
                  <label htmlFor="address" className="my-3">
                    Address
                  </label>
                  <div className="password-input">
                    <input
                      id="address"
                      name="address"
                      onChange={(e) => setDocUploadPayload(e.target.value)}
                      placeholder="Type Address"
                      className="outline outline-gray-100 md:p-4 p-2 md:w-[300px] lg:w-[500px] w-full"
                      value={docUploadPayload}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="countrySelect" className="my-3">
                    Country:
                  </label>
                  <select
                    className=' bg-white border-[#D0D5DD] border rounded-lg h-18 md:w-[150px] lg:w-[244px] w-full mb-6 md:p-4 p-2'
                    value={selectedCountry.id}
                    onChange={handleCountryChange}
                  >
                    <option value="">Choose Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="stateSelect" className="my-3">
                    State
                  </label>
                  <select
                    className=' bg-white border-[#D0D5DD] border rounded-lg h-18 md:w-[150px] lg:w-[244px] w-full mb-6 md:p-4 p-2'
                    value={selectedState.id}
                    onChange={handleStateChange}
                  >
                    <option value="">Choose State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex md:flex-row flex-col md:justify-between md:items-center my-8 ">
                <div className="flex flex-col">
                  <div className="text-deep-green font-bold text-left gap-2 mb-2 flex flex-col">
                    <p className="text-2xl">Guarantor Form</p>
                    <p className="text-gray-700 text-2xl font-thin w-[360px]">
                      Upload a signed copy of this form in your profile
                    </p>
                  </div>
                  <div className="relative">
                      <div className="border border-gray-300 border-dotted p-2 rounded-md h-full w-full md:w-[350px] lg:w-full ">
                        <div className=" flex flex-col lg:flex-row  gap-5 items-center justify-between">
                          <div className='flex gap-2'>
                            <img
                              src={svg} // Provide the actual path to your SVG upload icon
                              alt="Upload Icon"
                              className="h-10 w-10"
                            />
                            <div className='flex flex-col'>
                              <p className="text-sm text-gray-900">Tap to Upload</p>
                              <p className="block text-gray-400 text-xs">PNG, JPG | 3MB max</p>
                            </div>

                          </div>
                          <div>
                            <input
                              type="file"
                              accept=".pdf, .jpg, .png"
                              id="guarantor"
                              name="guarantorForm"
                              onChange={handleGuarantorSelect}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  <div className="mt-6">
                    <p className="text-gray-700 text-2xl mb-2">
                      Utilities Bill
                    </p>
                    <div className="relative">
                      <div className="border border-gray-300 border-dotted p-2 rounded-md h-full w-full md:w-[350px] lg:w-full ">
                        <div className=" flex flex-col lg:flex-row  gap-5 items-center justify-between">
                          <div className='flex gap-2'>
                            <img
                              src={svg} // Provide the actual path to your SVG upload icon
                              alt="Upload Icon"
                              className="h-10 w-10"
                            />
                            <div className='flex flex-col'>
                              <p className="text-sm text-gray-900">Tap to Upload</p>
                              <p className="block text-gray-400 text-xs">PNG, JPG | 3MB max</p>
                            </div>

                          </div>
                          <div>
                            <input
                              type="file"
                              accept=".pdf, .jpg, .png"
                              id="utilityBillInput"
                              name="utilityBill"
                              ref={utilityBillInputRef}
                              onChange={handleUtilityBillChange}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-deep-green font-bold text-left gap-2 mb-2 my-4 md:my-0">
                    <p className="text-2xl">Means of ID</p>
                    <p className="text-gray-700 text-sm font-thin w[360px]">Download and Upload a signed copy of this form in your profile</p>
                  </div>
                  <select
                    className="md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-18 w-full mb-6 md:p-4 p-2 my-6"
                    value={selectedDocument}
                    onChange={handleDocumentChange}
                  >
                    <option value="">Choose Document Type</option>
                    <option value="drivers-license">Driver's License</option>
                    <option value="nin-id">NIN ID</option>
                    <option value="int-passport">Int Passport</option>
                  </select>
                  <div className="relative">
                    <div className="border border-gray-300 border-dotted p-2 rounded-md h-full w-full md:w-[350px] lg:w-full my-6">
                      <div className=" flex flex-col lg:flex-row gap-5 items-center justify-between">
                        <div className='flex gap-2'>
                          <img
                            src={svg} // Provide the actual path to your SVG upload icon
                            alt="Upload Icon"
                            className="h-10 w-10"
                          />
                          <div className='flex flex-col'>
                            <p className="text-sm text-gray-900">Tap to Upload</p>
                            <p className="block text-gray-400 text-xs">PNG, JPG | 3MB max</p>
                          </div>

                        </div>
                        <div>
                          <input
                            type="file"
                            accept=".pdf, .jpg, .png"
                            id="documentFileInput"
                            name="documentFile"
                            ref={idDocumentInputRef}
                            onChange={handleDocumentFileChange}
                          />
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>


              <button
                type="submit"
                onClick={handleUserBioData}
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
        </div>
      );
      break;
    case 3:
      currentStepComponent = (
        <div className="flex justify-center">
           <div className="md:py-20 md:px-40 px-20 text-2xl">
          <div className="flex md:flex-row flex-col md:gap-20 items-center mb-8">
            <div className="flex flex-col my-4 md:my-0">
              <p>Enter Pin</p>
              <form className="flex space-x-4">
                {pinInputRefs.map((ref, index) => (
                  <input
                    key={index}
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
       
      );
      break;
    default:
      currentStepComponent = null;
      break;
  }

  return (
    <div className="rounded-lg mt-10 pt-20 ">
      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex ">
            <div className="flex flex-row w-full gap-2 justify-evenly">
              {formTitles.map((title, index) => (
                <div
                  key={index}
                  onClick={() => handleStepChange(index + 1)}
                  className={`cursor-pointer ${index === tabIndex - 1
                    ? "text-color1 font-semibold border-b-2 border-color1 pb-2"
                    : "text-[#1F1F1F]"
                    } transition-all ease-in-out duration-300 text-2xl md:w[200px]`}
                >
                  {title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">{currentStepComponent}</div>
      </div>
    </div>
  );
};

export default SettingsForm;
