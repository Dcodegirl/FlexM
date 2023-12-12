import React from "react";
import { NavLink } from "react-router-dom";

import logoWhite from "../../assets/images/flexbycico.svg";
import logoMain from "../../assets/images/flexbycico.svg";

import styles from "./HomeNavBar.module.scss";
import { DeviceHdd } from "react-bootstrap-icons";

const HomeNavBar = ({ theme, signUpContent }) => {
  return (
    <nav className='flex justify-center pt-8 w-full overflow-hidden'>
      <div className="flex flex-col gap-4 text-center">
        <NavLink
          to="/"
        >
          <div className="flex justify-center items-center">
            <img
              className="w-72"
              src={theme === "white" ? logoWhite : logoMain}
              alt=""
            />
          </div>
        </NavLink>
        <div>
          <p className="text-3xl font-bold text-deep-green">{signUpContent}</p>
        </div>
        <div>

        </div>
      </div>
    </nav>
  );
};

export default HomeNavBar;
