import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ThreeDots } from "svg-loaders-react";
import { useCustomToast } from "../components/toast/useCustomToast";
import whitecircle from "../assets/images/whitecircle.svg"
import greencircle from "../assets/images/greencircle.svg"
import mobilephone from "../assets/images/mobilephone.svg"
import NavHome from "../components/layout/HomeNavBar";
import { startLoginUser } from "../actions/auth";
import { BsEyeSlashFill } from 'react-icons/bs';
import styles from "./Landing.module.scss";

export const Landing = ({ dispatch, message, loading, startLoginUser }) => {
  const [formState, setFormState] = useState({
    phone: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const showToast = useCustomToast();

  useEffect(() => {
    if (loading === false && message) {
      showToast(message, "error");

      dispatch({
        type: "SET_LOADING",
        payload: {
          loading: false,
          message: '',
        },
      });
    }
  }, [message]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { phone, password } = formState;
    const payload = {
      user: {
        phone,
        password,
      },
      type: "agent",
    };

    //Dispatching loading state to the error reducer to indicate loading while the
    //auth action in actions folder dispatches { loading: false, message: error }
    dispatch({
      type: "SET_LOADING",
      payload: {
        loading: true,
        message: '',
      },
    });

    startLoginUser(payload);
  };

  const handleOnChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className={styles.wrapper}>
      <NavHome theme="white" />
      <header className={styles.header}>
        <div className={styles.heading}>
          <p className={styles.headingPrimary}>
            Simplifying Payments in Africa.
          </p>
          {/* images */}
          <div>
            <img className={styles.whitecircle} src ={whitecircle} alt="whitecircle"/>
            <img className={styles.greencircle} src ={greencircle} alt="greencircle"/>
            <img className={styles.mobilephone} src ={mobilephone} alt="mobilephone"/>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleOnSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Phone number
                </label>
                <input
                  name="phone"
                  type="text"
                  value={formState.phone.trim()}
                  onChange={handleOnChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  name="password"
                  value={formState.password}
                  onChange={handleOnChange}
                  className={styles.input}
                  type={passwordShown ? "text" : "password"}
                />
                 <BsEyeSlashFill className={styles.eye} onClick={togglePassword} size={20} />
              </div>
           
              <div className={styles.formGroups}>
              <p className={styles.forgotPassword}>
                  <Link
                    to="/forgot-transaction-pin"
                    className={styles.forgotPasswordLink}
                  >
                    Forgot transaction pin?
                  </Link>
                </p>
                <p className={styles.forgotPassword}>
                  <Link
                    to="/forgot-password"
                    className={styles.forgotPasswordLink}
                  >
                    Forgot password?
                  </Link>
                </p>
              </div>
              <button className={styles.button}>
                {loading ? <ThreeDots /> : "Login"}
              </button>
              <p className={styles.register}>
                Don't have an account?
                <Link to="/register" className={styles.registerLink}>
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

Landing.propTypes = {
  startLoginUser: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.any,
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoginUser: (payload) => dispatch(startLoginUser(payload)),
    dispatch: (payload) => dispatch(payload),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.error.loading,
    message: state.error.message,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
