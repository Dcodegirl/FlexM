import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { startLogout } from "../../../actions/auth";
import { createNotification } from "../../../actions/notification";
import imagebg from "../../../assets/icons/Ellipse 179.png";
import notification from "../../../assets/icons/bell 1.svg";
import pic from "../../../assets/images/user.svg";
import searchIcon from "../../../assets/icons/mdi_search.svg";
import arrowdown from "../../../assets/icons/mdi_.svg";
import right from "../../../assets/icons/arrowright.svg";
import lock from "../../../assets/icons/lock.svg";
import users from "../../../assets/icons/users.svg";
import bioUser from "../../../assets/icons/bio-user.svg";
import exit from "../../../assets/icons/exit.svg";
import pinLock from "../../../assets/icons/pin.svg";
import flexShield from "../../../assets/icons/bronze-badge.svg";
import premiumShield from "../../../assets/icons/silver-badge.svg";
import vipShield from "../../../assets/icons/gold-badge.svg";
import mark from "../../../assets/icons/aggregator.svg";
import sun from "../../../assets/icons/sun.svg";
import Ellipse from "../../../assets/icons/Ellipse.svg";
import profile from "../../../assets/images/profileImage.png";
import moon from "../../../assets/icons/moon.svg";
import styles from "./Header.module.scss";
import axios from "../../../utils/axiosInstance";
import { useGlobalContext } from "../../../custom-hooks/Context";

const Header = ({
  currentPage,
  isDefaultPassword,
  notifications,
  createNotification,
  logout,
  user,
  bank,
  image,
}) => {
  console.log("Current user state:", user);
  const [toggleUser, setToggleUser] = useState(false);
  const name = user ? `${user.first_name} ${user.last_name}` : "User";
  const walletId = user ? user.walletNo : "N/A";
  const virtualAccountNumber = user ? user.account_number : "N/A";
  const virtualAccountBank = bank ? bank.name : "N/A";
  const wrapperRef = useRef(null);
  const { addToast } = useToasts();
  const currentDate = new Date();
  const { updateUserInfoArray } = useGlobalContext();

  const currentHour = currentDate.getHours();

  const isAfter4PM = currentHour >= 16;

  // useEffect(() => {
  //     let isCancelled;

  //     if (!isCancelled) {
  //         if (isDefaultPassword == 1) {
  //             addToast('Please create a new password to continue', {
  //                 appearance: 'info',
  //                 autoDismiss: false,
  //             });
  //         }
  //     }

  //     return () => {
  //         isCancelled = true;
  //     };
  // }, []);

  // const get_user = async() => {
  //     try {
  //         const {data} = await axiosInstance.get(`/agent/userinfo`);
  //         console.log(data.data.image);
  //         setUserInfo(data.data.image)
  //     }catch(err) {
  //         console.log(err)
  //     }
  // }

  // useEffect(() => {
  //     get_user ();

  // },[])
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(true);

  const handleToggleNotifications = () => {
    notifications.forEach((notification) => {
      addToast(notification.body, {
        appearance: "info",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    });
  };

  function useClickOutside(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggleUser(false);
      }
    }

    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  }
  useClickOutside(wrapperRef);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Make the API call
        const response = await axios.get("/agent/userinfo");

        // Set the user info in the state
        setUserInfo(response.data.data);
        updateUserInfoArray(response.data.data);

        // Set loading to false
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);

        // Set loading to false even if there's an error
        setLoading(false);
      }
    };

    // Call the fetchUserInfo function
    fetchUserInfo();
  }, []);
  return (
    <header
      className={`flex md:justify-end bg-white h-full justify-between py-6 md:my-0`}
    >
      <div
        className={` flex justify-between h-full items-center md:gap-3 md:w-[300px] w-[450px]  md:px-12 px-3`}
      >
        {/* serchbar */}
        {/* <div className="relative md:block hidden">
          <img
            src={searchIcon}
            alt="Search"
            className="absolute left-2 top-3  text-gray-400"
          />
          <input
            type="text"
            placeholder="Search transactions"
            className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2"
          />
        </div> */}
        <div className="flex items-center gap-10">
          <div
            className={`${styles.notification} md:block hidden`}
            onClick={handleToggleNotifications}
          >
            <img
              src={notification}
              alt="notification bell"
              className="md:block hidden"
            />
            <span className={` ${styles.active} md:block hidden`}>
              {notifications.length}
            </span>
          </div>
          <div className="">
            <div className="flex items-center">
              <div className="md:block hidden">
                {
                  <img
                    className="w-[30px] h-[30px] top-8 ml-2 rounded-full"
                    src={userInfo.image || pic}
                    alt="User silhoutte"
                    onClick={() => {
                      setToggleUser(!toggleUser);
                    }}
                  />
                }
              </div>

              <div className="flex items-center">
                <div className="w-36 md:w-full pl-6 text-[12px] text-icon-purple uppercase md:block hidden">
                  {name}
                </div>
                <img
                  src={arrowdown}
                  className={`${styles.profileToggle} md:mx-6 cursor-pointer`}
                  onClick={() => {
                    setToggleUser(!toggleUser);
                  }}
                  alt=""
                />
              </div>
            </div>
            {/* dropdown toggle */}
            {toggleUser && (
              <div
                className={`top-28 right-16 w-72 h-[300px] bg-white shadow-md rounded-lg text-center text-lg absolute z-10`}
                ref={wrapperRef}
              >
                <div className="h-1/2 bg-color1 p-8 text-white rounded-tl-lg rounded-tr-lg ">
                  <img
                    src={userInfo.image || pic}
                    alt="user avatar"
                    className="block mx-auto w-10 h-10 rounded-full"
                  />
                  {/* <span className='my-4 flex items-center justify-center'>
                                        {name}
                                        <img
                                            className='inline-block w-16 h-16 ml-4'
                                            src={agentClassificationIcon}
                                            alt=''
                                        />
                                    </span> */}

                  <span className="block w-70 bg-white rounded-md p-2 mx-auto my-2 text-purple-800 text-base">
                    Wallet ID: {userInfo.agent.wallet_no}
                  </span>
                  <span className="block w-70 bg-white rounded-md p-2 mx-auto my-2 text-purple-800 text-base">
                    Account No: {userInfo.agent.virtual_account_number || "N/A"}
                  </span>
                  <span className="block w-70 bg-white rounded-md p-2 mx-auto my-2 text-purple-800 text-base">
                    Bank Name : {userInfo.agent.virtual_account_bank || "N/A"}
                  </span>
                </div>
                <div className="p-5">
                  <Link
                    to="/settings/pin"
                    className="flex items-center relative  text-no-underline text-purple-800 text-lg"
                  >
                    <img
                      className="w-6 h-6 mr-4 rounded-full"
                      src={pinLock}
                      alt=""
                    />
                    <span>Update transaction pin</span>
                    <img
                      className="w-4 h-4 absolute top-1/2 right-1 transform -translate-y-1/2"
                      src={right}
                      alt=""
                    />
                  </Link>
                  <Link
                    to="/settings/biodata"
                    className="flex items-center relative  no-underline text-purple-800 text-lg"
                  >
                    <img
                      className="w-6 h-6 mr-4 rounded-full"
                      src={bioUser}
                      alt=""
                    />
                    <span>Edit Profile</span>
                    <img
                      className="w-4 h-4 absolute top-1/2 right-1 transform -translate-y-1/2"
                      src={right}
                      alt=""
                    />
                  </Link>
                  <Link
                    to="users"
                    className="flex items-center relative  no-underline text-purple-800 text-lg"
                  >
                    <img
                      className="w-6 h-6 mr-4 rounded-full"
                      src={users}
                      alt=""
                    />
                    <span>Users</span>
                    <img
                      className="w-4 h-4 absolute top-1/2 right-1 transform -translate-y-1/2"
                      src={right}
                      alt=""
                    />
                  </Link>
                  <Link
                    to="/settings/contact"
                    className="flex items-center relative  no-underline text-purple-800 text-lg"
                  >
                    <img
                      className="w-6 h-6 mr-4 rounded-full"
                      src={lock}
                      alt=""
                    />
                    <span>Change Password</span>
                    <img
                      className="w-4 h-4 absolute top-1/2 right-1 transform -translate-y-1/2"
                      src={right}
                      alt=""
                    />
                  </Link>
                  <div
                    className="flex items-center relative  no-underline text-purple-800 text-lg cursor-pointer"
                    aria-label="button"
                    onClick={() => {
                      logout();
                    }}
                  >
                    <img
                      className="w-6 h-6 mr-4 rounded-full"
                      src={exit}
                      alt=""
                    />
                    <span className="">Logout</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* welcome */}
          <div className="md:hidden flex gap-9">
            <div className="flex gap-3 items-center">
              <div>
                <img
                  src={userInfo.image || pic}
                  alt=""
                  className="w-20 h-20 rounded-full"
                />

                <img
                  src={image}
                  alt="user pic"
                  className="w-[20px] md:hidden lg:block hidden"
                />
              </div>
              <div className="">
                <div className="flex gap-2">
                  <div>
                    <h1 className="text-[12px] font-bold"> {name} </h1>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-3 items-center -mt-2 item-center">
                    <span>
                      <img
                        src={isAfter4PM ? moon : sun}
                        alt=""
                        className="w-[10px]"
                      />
                    </span>
                    <span className="">
                      <img src={Ellipse} alt="" />
                    </span>
                    <span className="text-[#748274]">
                      {currentDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="">
                      <img src={Ellipse} alt="" />
                    </span>
                    <span className="text-[#748274]">
                      {currentDate.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <img
                src={arrowdown}
                className="w-4 cursor-pointer mt-4"
                onClick={() => {
                  setToggleUser(!toggleUser);
                }}
                alt=""
                style={{ width: "30px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state?.page,
    user: state.auth.user,
    bank: state.auth.bank,
    image: state.auth.image,
    isDefaultPassword: state?.auth.user.verified,
    notifications: state?.notification.notifications,
    walletId: state?.auth?.user?.walletNo,
    name: `${state?.auth?.user?.first_name} ${state?.auth?.user?.last_name}`,
    agentClassification: state?.auth.user.agentClassification,
    vfdAccountNumber: state?.auth?.user?.vfd_account_number,
    virtualAccountNumber: state?.auth?.user?.account_number,
    virtualAccountBank: state?.bank?.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      localStorage.removeItem("guarantor");
      localStorage.removeItem("utility");
      localStorage.removeItem("nin");
    console.log("hey local storage");
      dispatch(startLogout());
    
      return;
    },
    createNotification: (payload) => dispatch(createNotification(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
