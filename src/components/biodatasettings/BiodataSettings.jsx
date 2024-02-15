import React from "react";
import { useState, useEffect, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import axios from "../../utils/axiosInstance";
import svg from "../../assets/images/Upload.svg";
import { useCustomToast } from "../toast/useCustomToast";
import { GET_USER_INFO } from "../../utils/constants";
import { POST_BIO_DATA } from "../../utils/constants";
import { GET_ALL_COUNTRIES } from "../../utils/constants";

const BiodataSettings = ({ title }) => {
  const idDocumentInputRef = useRef();
  const utilityBillInputRef = useRef();
  const [documentImage, setDocumentImage] = useState("");
  const showToast = useCustomToast();
  const [userData, setUserData] = useState("");
  const [guarantorSelect, setGuarantorSelect] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [utilityImage, setUtilityImage] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");
  const [loading, setLoading] = useState("");
  const [guarantorFileName, setGuarantorFileName] = useState("");
  const [utilityFileName, setUtilityFileName] = useState("");
  const [ninFileName, setNinFileName] = useState("");

  const [alldoc, setAllDoc] = useState({
    guarantor: "",
    utility: "",
    nin_id: "",
  });
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
  const [currentAddressPayload, setCurrentAddressPayload] = useState("");

  const downloadForm = () => {
    const fileUrl = process.env.PUBLIC_URL + "/GUARANTOR form.pdf";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "GUARANTOR form.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDocumentFileChange = (e) => {
    const file = e.target.files[0];

    // Check if means of ID has been selected
    if (!selectedDocument) {
      showToast("Please select a valid means of ID", "error");
      setDocumentImage(null); // Clear the selected file
    } else {
      // Check if the file size exceeds 3MB
      if (file && file.size > 3 * 1024 * 1024) {
        showToast("Means of ID image size should not exceed 3MB", "error");
        setDocumentImage(null); // Clear the selected file
      } else {
        setDocumentImage(file);
        setNinFileName(file.name);
      }
    }
  };

  const handleDocumentChange = (event) => {
    setSelectedDocument(event.target.value);
    setFileUploaded(true);
  };

  const handleUtilityBillChange = (e) => {
    const file = e.target.files[0];

    // Check if the file size exceeds 3MB
    if (file && file.size > 3 * 1024 * 1024) {
      showToast("Utility image size should not exceed 3MB", "error");
      setUtilityImage(null); // Clear the selected file
    } else {
      setUtilityImage(file);
      setUtilityFileName(file.name);
    }
  };

  const handleGuarantorSelect = (e) => {
    const file = e.target.files[0];

    // Check if the file size exceeds 3MB
    if (file && file.size > 3 * 1024 * 1024) {
      showToast("Guarantor form size should not exceed 3MB", "error");
      setGuarantorSelect(null); // Clear the selected file
    } else {
      setGuarantorSelect(file);
      setGuarantorFileName(file.name);
    }
  };
  // useEffect(() => {
  //   const guarantorFile = localStorage.getItem("guarantor");
  //   const utilityFile = localStorage.getItem("utility");
  //   const ninFile = localStorage.getItem("nin");

  //   if (guarantorFile !== null || guarantorFile !== undefined) {
  //     setGuarantorFileName(guarantorFile);

  //   }
  //   if (utilityFile !== null || utilityFile !== undefined) {
  //     setUtilityFileName(utilityFile);
  //   }
  //   if (ninFile !== null || ninFile !== undefined) {
  //     setNinFileName(ninFile);
  //   }
  // }, [guarantorSelect, utilityImage, documentImage ]);

  const guarantorUpload = () => {
    // Your file upload logic here
    // After successful upload, setFileUploaded(true);
    setFileUploaded(true); // Simulate a successful upload for demonstration purposes
  };
  const fetchStates = async (expectedCountryId, secondParameter) => {
    try {
      const response = await axios.get(
        `/countries/all-states/${expectedCountryId}`
      );
      setStates(response.data.data);
      if (secondParameter !== "") {
        setSelectedState(secondParameter);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    // Make API call to fetch user information
    axios
      .get(GET_USER_INFO)
      .then((response) => {
        setUserData(response.data.data.agent);
        setPayload({
          ...payload,
          email: response.data.data.agent.email,
        });

        setDocUploadPayload(response.data.data.agent.business_address);
        // setUtilityImage(response.data.data.agent.documents.utility);
        // setSelectedDocument(response.data.data.agent.documents.nin_id);
        // setGuarantorSelect(response.data.data.agent.documents.guarantor)
        let allMyDoc = response?.data?.data?.agent.documents.map((d, index) => {
          let newLength = response?.data?.data?.agent.documents.length;
          let getImgName = d.image.split("/");
         
          getImgName = getImgName[getImgName.length - 1];
          if (d?.type == "guarantor") {
            // setAllDoc({
            //   ...alldoc,
            //   guarantor: getImgName

            // });
            setGuarantorFileName(getImgName);
          }
          if (d?.type == "utility") {
            setUtilityFileName(getImgName);
          }
          if (d?.type == "nin-id") {
            setNinFileName(getImgName);
          }
        });
        setCurrentAddressPayload(response.data.data.agent.current_address);
        setSelectedCountry(response.data.data.agent.country_id || "");
        if (response.data.data.agent.country_id) {
          fetchStates(
            response.data.data.agent.country_id,
            response.data.data.agent.state_id
          );
        }
        // setSelectedState(response.data.data.agent.state_id || '');
      })
      .catch((error) => {
      });
  }, []);
  const handleUserBioData = async () => {
    setLoading(true);

    // Check if the utility image size is more than 3MB

    // Check if the document image size is more than 3MB
    if (documentImage && documentImage.size > 3 * 1024 * 1024) {
      // Display an error toast notification
      showToast("Document image size should not exceed 3MB", "error");
      setLoading(false);
      return;
    } else if (guarantorSelect && guarantorSelect.size > 3 * 1024 * 1024) {
      // Display an error toast notification
      showToast("Document image size should not exceed 3MB", "error");
      setLoading(false);
    }
    // If neither utilityImage nor documentImage exceeds 3MB, proceed with the API request
    else {
      const bio = new FormData();
      bio.append("business_address", docUploadPayload);
      bio.append("current_address", currentAddressPayload);
      bio.append("guarantor_file", guarantorSelect || "");
      bio.append("utility_image", utilityImage || "");
      bio.append("document_type", selectedDocument);
      bio.append("document_image", documentImage || "");

      const countryId = selectedCountry.id || "";
      const stateId = selectedState.id || "";

      bio.append("country_id", selectedCountry);
      bio.append("state_id", selectedState);

      try {
        let data = await axios.post(POST_BIO_DATA, bio);

        if (data.status === 200) {
          const userInfoResponse = await axios.get(GET_USER_INFO);

          setUserData(userInfoResponse.data.data.agent);

          showToast("Biodata updated successfully!", "success");
        }
      } catch (error) {
        const { status, data } = error.response;
        if (status === 400 || status === 404 || status === 422) {
          // Bad Request (400)
          if (data && data.errors) {
            Object.values(data.errors)
              .flat()
              .forEach((errorMessage) => {
                showToast(`${errorMessage}`, "error");
              });
          } else if (status && data && data.message) {
            showToast(`${data.message}`, "error");
          } else {
            showToast("Bad Request. Please check your input.", "error");
          }
        } else if (status === 500) {
          // Internal Server Error (500)
          showToast("Internal Server Error. Please try again later.", "error");
        } else {
          // Display an error toast with the API response message for other status codes
          showToast(data.message || "An unexpected error occurred.", "error");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStateChange = (event) => {
    const selectedStateId = event.target.value;

    // Find the selected state object
    const selectedStateObject = states.find(
      (state) => state.id === selectedStateId
    );

    // Update selectedState state with the entire state object

    setSelectedState(selectedStateObject.id);
  };
  useEffect(() => {
    // Fetch the list of countries when the component mounts
    const fetchCountries = async () => {
      try {
        const response = await axios.get(GET_ALL_COUNTRIES);
        setCountries(response.data.data);
      } catch (error) {
      }
    };

    fetchCountries();
  }, []);
  const handleCountryChange = async (event) => {
    const selectedCountryId = event.target.value;

    // Find the selected country object
    const selectedCountryObject = countries.find(
      (country) => country.id === selectedCountryId
    );

    // Update selectedCountry state with the entire country object
    setSelectedCountry(selectedCountryObject.id);

    // Fetch states based on the selected country
    fetchStates(selectedCountryObject.id, "");
  };

  return (
    <div>
      <h2>{title}</h2>
      <div id="biodata">
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
                    className="outline outline-gray-100 md:p-3 p-2 md:w-[300px] lg:w-[500px] w-full"
                    value={docUploadPayload}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="my-3">
                  Current Address
                </label>
                <div className="password-input">
                  <input
                    id="currentAddress"
                    name="currentAddress"
                    value={currentAddressPayload}
                    onChange={(e) => setCurrentAddressPayload(e.target.value)}
                    placeholder="Type Current Address"
                    className="outline outline-gray-100 md:p-4 p-2 md:w-[300px] lg:w-[500px] w-full"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex md:flex-row flex-col md:gap-3 lg:gap-8 md:items-center my-8 ">
              <div className="flex flex-col">
                <label htmlFor="countrySelect" className="my-3">
                  Country:
                </label>
                <select
                  className=" bg-white border-[#D0D5DD] border rounded-lg h-18 md:w-[150px] lg:w-[244px] w-full mb-6 md:p-4 p-2"
                  value={selectedCountry}
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
                  className=" bg-white border-[#D0D5DD] border rounded-lg h-18 md:w-[150px] lg:w-[244px] w-full mb-6 md:p-4 p-2"
                  value={selectedState}
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
            <div className="flex md:flex-col lg:flex-row flex-col md:justify-between md:items-center my-8 ">
              <div className="flex flex-col">
                <div className="text-deep-green font-bold text-left gap-2 mb-2 flex flex-col">
                  <p className="text-2xl">Guarantor Form</p>
                  <div className="flex justify-between items-center md:px-4">
                    <p className="text-gray-700 text-2xl font-thin md:w-[360px]">
                      Download guarantor's form
                    </p>
                    <button
                      type="button"
                      className="bg-[#ECE9FC] py-2 px-4 mt-2 rounded-md"
                      onClick={downloadForm}
                    >
                      Download
                    </button>
                  </div>

                  <p className="text-gray-700 text-2xl font-thin w-[360px]">
                    Upload a signed copy of the downloaded guarantor's form
                  </p>
                </div>
                <div className="relative">
                  <div className="border border-gray-300 border-dotted p-2 rounded-md h-full w-full md:w-[350px] lg:w-full ">
                    <div className=" flex flex-col lg:flex-row  gap-5 items-center justify-between">
                      <div className="flex gap-2">
                        <img
                          src={svg} // Provide the actual path to your SVG upload icon
                          alt="Upload Icon"
                          className="h-10 w-10"
                        />
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-900">Tap to Upload</p>
                          <p className="block text-gray-400 text-xs">
                            PNG, JPG | 3MB max
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        {guarantorFileName && (
                          <p className="absolute top-0 right-0 bg-white w-[20rem] p-2">
                            {guarantorFileName}
                          </p>
                        )}
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
                  <p className="text-gray-700 text-2xl mb-2">Utilities Bill</p>
                  <div className="relative">
                    <div className="border border-gray-300 border-dotted p-2 rounded-md h-full w-full md:w-[350px] lg:w-full ">
                      <div className=" flex flex-col lg:flex-row  gap-5 items-center justify-between">
                        <div className="flex gap-2">
                          <img
                            src={svg} // Provide the actual path to your SVG upload icon
                            alt="Upload Icon"
                            className="h-10 w-10"
                          />
                          <div className="flex flex-col">
                            <p className="text-sm text-gray-900">
                              Tap to Upload
                            </p>
                            <p className="block text-gray-400 text-xs">
                              PNG, JPG | 3MB max
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                         {utilityFileName && (
                          <p className="absolute top-0 right-0 bg-white w-[20rem] p-2">
                            {utilityFileName}
                          </p>
                        )}
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
                <div className="text-deep-green font-bold text-left gap-2 mb-2 my-4 md:my-6 lg:my-0">
                  <p className="text-2xl">Means of ID</p>
                  <p className="text-gray-700 text-sm font-thin w[360px]">
                    Upload a signed copy of this form in your profile
                  </p>
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
                      <div className="flex gap-2">
                        <img
                          src={svg} // Provide the actual path to your SVG upload icon
                          alt="Upload Icon"
                          className="h-10 w-10"
                        />
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-900">Tap to Upload</p>
                          <p className="block text-gray-400 text-xs">
                            PNG, JPG | 3MB max
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                      {ninFileName && (
                          <p className="absolute top-0 right-0 bg-white w-[20rem] p-2">
                            {ninFileName}
                          </p>
                        )}
                        
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
              className={`bg-color1  rounded-lg h-14 w-full text-white mx-auto relative ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
              disabled={loading}
            >
              {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="loader"></div>
                </div>
              )}
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BiodataSettings;
