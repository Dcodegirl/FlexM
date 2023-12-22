import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../utils/axiosInstance";
import svg from "../../assets/images/Upload.svg";
import profileAvatar from "../../assets/images/avatarImg.svg";
import { useToasts } from "react-toast-notifications";

const Settings = () => {
  const [otp, setOtp] = useState("");
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
  const handleDocumentFileChange = (e) => {
    const file = e.target.files[0];
    setDocumentImage(file);
  };
  const handleUtilityBillChange = (e) => {
    const file = e.target.files[0];
    setUtilityImage(file);
  };
  const handleTransactionPin = async () => {
    console.log({
      pin: pin.join(""),
      confirmPin: confirmPin.join(""),
    });
    if (pin.join("") === confirmPin.join("")) {
      const transactionPin = {
        agent_id: pinPayload.agent_id,
        transaction_pin: pin.join(""),
      };

      try {
        let data = await axios.post(TRANSACTION_PIN, transactionPin);
        console.log(data);
        addToast("Profile updated successfully!", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000, // milliseconds
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      addToast("Pin Incorrect!", {
        appearance: "warning",
        autoDismiss: true,
        autoDismissTimeout: 3000, // milliseconds
      });
    }
  };

  const handleUserBioData = async () => {
  const bio = new FormData();
  bio.append("business_address", docUploadPayload);
  bio.append("guarantor_file", guarantorSelect || ''); // If guarantorSelect is null, append an empty string
  bio.append("utility_image", utilityImage || ''); // If utilityImage is null, append an empty string
  bio.append("document_type", selectedDocument);
  bio.append("document_image", documentImage || '');
  bio.append("country", selectedCountry || '');
  bio.append("state", selectedState || '');  // If documentImage is null, append an empty string

  console.log(docUploadPayload);
  try {
    let data = await axios.post("/agent/bio-data", bio);
    if (data.status === 200) {
      addToast("Profile updated successfully!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000, // milliseconds
      });
    }
  } catch (error) {
    addToast("An error occurred", {
      appearance: "error",
      autoDismiss: true,
      autoDismissTimeout: 3000, // milliseconds
    });
    console.log(error);
  }
};

const handleGuarantorSelect = (e) => {
  const file = e.target.files[0];
  setGuarantorSelect(file);
  setFileUploaded(true); // Reset the fileUploaded state when a new file is selected
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
    const contactUpdate = new FormData();
    contactUpdate.append('email', userData.email )
    contactUpdate.append('image', selectedImage )
    contactUpdate.append('old_password', payload.password.old_password )
    contactUpdate.append('new_password', payload.password.new_password )
    contactUpdate.append('confirm_password', payload.password.new_password )
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
                  className="outline outline-gray-100 py-3 px-3 md:w-[500px] w-full"
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
                  className="outline outline-gray-100 py-3 px-1 md:w-[500px] w-full"
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
                    className="outline outline-gray-100 py-3 px-3 md:w-[500px] w-full pr-12" // Adjust paddingRight to accommodate the icon
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
                    className="outline outline-gray-100 py-3 px-3 md:w-[500px] w-full pr-12" // Adjust paddingRight to accommodate the icon
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
                    800*400px)
                  </p>
                </div>
              </div>

              {/* Additional form elements or buttons can be added here */}

              <div className="flex gap-10 items-center my-8"></div>
            </div>

            <button
                type="submit"
                onClick={handleSaveChanges}
                className={`bg-color1  rounded-lg h-14 w-full text-white mx-auto relative ${
                  loading ? 'opacity-50 pointer-events-none' : ''
                }`}
                disabled={loading}
              >
                {loading && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="loader"></div>
                  </div>
                )}
                {loading ? 'Saving...' : 'Saving'}
              </button>
          </form>
        </div>
      );
      break;
    case 2:
      currentStepComponent = (
        <div id="Biodata">
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
                    className="outline outline-gray-100  md:py-3 md:px-3 p-2 md:w-[500px] w-full"
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
                    className="outline outline-gray-100 md:p-3 p-2 md:w-[500px] w-full"
                    value={userData ? userData.last_name : ""}
                    disabled
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col md:justify-between md:items-center my-8 ">
                <div className="flex flex-col">
                  <label htmlFor="addres" className="my-3">
                    Address
                  </label>
                  <div className="password-input">
                    <input
                      id="address"
                      name="address"
                      onChange={(e) => setDocUploadPayload(e.target.value)}
                      placeholder="Type Address"
                      className="outline outline-gray-100 md:p-4 p-2 md:w-[500px] w-full"
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
                  className=' bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[244px] w-full mb-6 p-4'
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
                  className=' bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[244px] w-full mb-6 p-4'
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
                  <div className="bg-white border border-gray-100 rounded-lg h-14 w-full mb-6 md:p-6 p-3 flex items-center justify-between mt-4 md:w-[300px] lg:w-[500px] relative">
      <input
        type="file"
        id="upload"
        name="upload"
        onChange={handleGuarantorSelect}
        className="outline outline-gray-100 md:p-4 p-2 w-full absolute top-0 left-0 opacity-0 z-10"
        required
      />
      <div className="flex gap-2">
        <img src={svg} alt="Upload Icon" className="h-10 w-10" />
        <div className="flex flex-col">
          <p className="text-2xl text-gray-900">Upload Guarantor Form</p>
          <p className="block text-gray-400 text-xs">
            Guarantor form | 10MB max.
          </p>
        </div>
      </div>
      <div className="mb-2">
        {!fileUploaded ? (
          <button
            type="button"
            className="bg-[#ECE9FC] py-3 md:px-6 px-3 mt-2 rounded-md text-deep-green"
            onClick={guarantorUpload}
          >
            Upload
          </button>
        ) : (
          <span className="text-deep-green">
            {guarantorSelect ? guarantorSelect.name : ''}
          </span>
        )}
      </div>
    </div>
                  <div className="mt-6">
                    <p className="text-gray-700 text-2xl mb-2">
                      Utilities Bill
                    </p>
                    <div className="relative">
                      <input
                        type="file"
                        id="utilityBillInput"
                        name="utilityBill"
                        ref={utilityBillInputRef}
                        className="outline outline-gray-100 md:p-4 p-2 w-full"
                        onChange={handleUtilityBillChange}
                        accept=".pdf, .jpg, .png"
                      />
                      {utilityImage ? (
                        // Display the uploaded image information
                        <div className="flex gap-5 items-center justify-between mt-4">
                          <div className="flex gap-2">
                            <img
                              src={svg}
                              alt="Uploaded Icon"
                              className="h-10 w-10"
                            />
                            <div className="flex flex-col">
                              <p className="text-2xl text-gray-900">
                                Image Uploaded
                              </p>
                            </div>
                          </div>
                          <div>
                            {/* Optionally, add an "Edit" button or additional actions */}
                            <button
                              type="button"
                              className="bg-[#ECE9FC] text-deep-green p-2 rounded-md"
                              onClick={() => setUtilityImage(null)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Display the "Tap to Upload" section
                        <label
                          htmlFor="utilityBillInput"
                          className="flex gap-2 cursor-pointer mt-4"
                        >
                          <div className="flex gap-2">
                            <img
                              src={svg}
                              alt="Upload Icon"
                              className="h-10 w-10"
                            />
                            <div className="flex flex-col">
                              <p className="text-2xl text-gray-900">
                                Tap to Upload
                              </p>
                              <p className="block text-gray-400 text-xs">
                                PDF, JPG, PNG | 10MB max
                              </p>
                            </div>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-deep-green font-bold text-left gap-2 mb-2 my-4 md:my-0">
                    <p className="text-2xl">Means of ID</p>
                    <p className="text-gray-700 text-2xl font-thin w-[360px]">
                      Download and Upload a signed copy of this form in your
                      profile
                    </p>
                  </div>
                  <select
                    className="md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 md:p-4 p-2"
                    value={selectedDocument}
                    onChange={handleDocumentChange}
                  >
                    <option value="">Choose Document Type</option>
                    <option value="drivers-license">Driver's License</option>
                    <option value="nin-id">NIN ID</option>
                    <option value="int-passport">Int Passport</option>
                  </select>
                  <div className="relative">
                    <input
                      type="file"
                      id="documentFileInput"
                      name="documentFile"
                      ref={idDocumentInputRef}
                      className="outline outline-gray-100 md:p-4 p-2 w-full"
                      onChange={handleDocumentFileChange}
                      accept=".pdf, .jpg, .png"
                    />
                    {documentImage ? (
                      // Display the uploaded image information
                      <div className="flex gap-5 items-center justify-between mt-4">
                        <div className="flex gap-2">
                          <img
                            src={svg}
                            alt="Uploaded Icon"
                            className="h-10 w-10"
                          />
                          <div className="flex flex-col">
                            <p className="text-2xl text-gray-900">
                              Image Uploaded
                            </p>
                          </div>
                        </div>
                        <div>
                          {/* Optionally, add an "Edit" button or additional actions */}
                          <button
                            type="button"
                            className="bg-[#ECE9FC] text-deep-green p-2 rounded-md"
                            onClick={() => setDocumentImage(null)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display the "Tap to Upload" section
                      <label
                        htmlFor="documentFileInput"
                        className="flex gap-2 cursor-pointer mt-4"
                      >
                        <div className="flex gap-2">
                          <img
                            src={svg}
                            alt="Upload Icon"
                            className="h-10 w-10"
                          />
                          <div className="flex flex-col">
                            <p className="text-2xl text-gray-900">
                              Tap to Upload
                            </p>
                            <p className="block text-gray-400 text-xs">
                              PDF, JPG, PNG | 10MB max
                            </p>
                          </div>
                        </div>
                      </label>
                    )}
                  </div>

                  {/* Conditionally render the Upload button based on the state */}
                  {/* {documentImage && (
                    <button
                      type="button"
                      className="bg-progress-green text-white p-2 mt-2 rounded-md"
                      onClick={() => {
                        // Handle the upload logic here
                        // You may want to include your upload logic or trigger an API call
                        console.log("Document Uploaded");
                      }}
                    >
                      Upload
                    </button>
                  )} */}
                </div>
              </div>

              
              <button
                type="submit"
                onClick={handleUserBioData}
                className={`bg-color1  rounded-lg h-14 w-full text-white mx-auto relative ${
                  loading ? 'opacity-50 pointer-events-none' : ''
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
        <div className="flex flex-col items-center md:py-20 md:px-40 px-20 text-2xl">
          <div className="flex md:flex-row flex-col md:gap-20 items-center">
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
            type="button"

            className="bg-color1 md:py-6 md:px-36 p-6  m-auto my-10  text-white rounded-lg hover:scale-105 transition-transform duration-500"

            onClick={handleTransactionPin}
            disabled={pin.length !== 4 && confirmPin.length !== 4}
          >
            Save Changes
          </button>
          <button
                type="submit"
                onClick={handleSubmit}
                className={`bg-color1  rounded-lg h-14 w-full text-white mx-auto relative ${
                  loading ? 'opacity-50 pointer-events-none' : ''
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
                  className={`cursor-pointer ${
                    index === tabIndex - 1
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

export default Settings;
