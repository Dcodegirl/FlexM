import React from "react";
import { NavLink } from "react-router-dom";
import './Sidebar.scss';
import avatar from "../../assets/images/user.svg";
import speedometer from "../../assets/images/speedometer.svg";
import user from "../../assets/images/user-icon.svg";
import data from "../../assets/images/data.svg";
import terminal from "../../assets/images/payment-terminal.svg";
import wallet from "../../assets/images/digital-wallet.svg";

const Sidebar = () => {
  return (
  <div className="sidebar">
    <div className="sidebar__profile">
      <img src={avatar} className="sidebar__profile__img" alt="user's avatar" />
      <p className="sidebar__profile__name">Kayode Fayemi</p>
      <button className="sidebar__profile__edit">Edit Profile</button>
    </div>
    <div className="sidebar__links">
      <NavLink to="/dashboard" activeClassName="active" className="sidebar__links__link" >
        <img src={speedometer} className="sidebar__links__link__image" alt="speedometer icon" />
        <p className="sidebar__links__link__text">Dashboard</p>
      </NavLink>
      <NavLink to="/user-management" activeClassName="active" className="sidebar__links__link" >
        <img src={user} className="sidebar__links__link__image" alt="user icon" />
        <p className="sidebar__links__link__text">User Management</p>
        <div className="sidebar__links__link__secondary-links">
          <NavLink to="/add-user" className="sidebar__links__link__secondary-links__link">
          <p>Add User</p>
          </NavLink>
          <NavLink to="/list-users" className="sidebar__links__link__secondary-links__link">
            <p>List Users</p>
          </NavLink>         
        </div>
      </NavLink>
      <NavLink to="/my-terminals" activeClassName="active" className="sidebar__links__link">
        <img src={terminal} className="sidebar__links__link__image" alt="terminals icon" />
        <p className="sidebar__links__link__text">My Terminals</p>
      </NavLink>
      <NavLink to="/transactions" activeClassName="active" className="sidebar__links__link">
        <img src={data} className="sidebar__links__link__image"  alt="data icon" />
        <p className="sidebar__links__link__text">Transactions</p>
      </NavLink>  
      <NavLink to="/my-wallet" activeClassName="active" className="sidebar__links__link">
        <img src={wallet} className="sidebar__links__link__image" alt="wallet icon" />
        <p className="sidebar__links__link__text">My Wallet</p>
      </NavLink>
    </div>
  </div>
)};

export default Sidebar;