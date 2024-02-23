// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET, changePassword } from "../../redux/auth/auth.slice";

// Import Components
import { Banner } from "../../components";

// Import Utilities
import {
  BANNER_TEXT_CHANGE_PASSWORD,
  BUTTON_TEXT_CHANGE_PASSWORD,
} from "../../constants";
import { validatePassword } from "../../utils/helper.utils";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { LuCircleDashed } from "react-icons/lu";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const ChangePassword = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.username) {
      navigate("/auth/sign-in");
    }
  }, [navigate, location.state?.username]);

  // State Handling
  const initialState = {
    username: location?.state?.username,
    otp: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [passwordAlphabetUpper, setPasswordAlphabetUpper] = useState("default");
  const [passwordAlphabetLower, setPasswordAlphabetLower] = useState("default");
  const [passwordNumber, setPasswordNumber] = useState("default");
  const [passwordSpecialChar, setPasswordSpecialChar] = useState("default");
  const [passwordLength, setPasswordLength] = useState("default");

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "password") {
      const password = event.target.value.toString();
      if (password.trim().length > 0) {
        if (/[A-Z]/.test(password)) {
          setPasswordAlphabetUpper("checked");
        } else {
          setPasswordAlphabetUpper("error");
        }
        if (/[a-z]/.test(password)) {
          setPasswordAlphabetLower("checked");
        } else {
          setPasswordAlphabetLower("error");
        }
        if (/[0-9]/.test(password)) {
          setPasswordNumber("checked");
        } else {
          setPasswordNumber("error");
        }
        if (password.length >= 8 && password.length <= 50) {
          setPasswordLength("checked");
        } else {
          setPasswordLength("error");
        }
        if (/[_!@#$%&*?]/.test(password)) {
          setPasswordSpecialChar("checked");
        } else {
          setPasswordSpecialChar("error");
        }
      } else {
        setPasswordAlphabetLower("default");
        setPasswordAlphabetUpper("default");
        setPasswordLength("default");
        setPasswordNumber("default");
        setPasswordSpecialChar("default");
      }
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { username, otp, password, confirmPassword } = formData;
    if (
      !username?.trim() ||
      !otp?.trim() ||
      !password?.trim() ||
      !confirmPassword?.trim()
    ) {
      return toast.error("Please enter all required details");
    }

    if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password do not match");
    }

    if (!validatePassword(password)) {
      return toast.error("Password Validation Failed");
    }

    const apiData = {
      apiData: {
        otp,
        password,
      },
      paramData: username,
    };

    const result = await dispatch(changePassword(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      setFormData(initialState);
      await dispatch(RESET());
      navigate("/auth/sign-in");
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  // JSX Component Return Section
  return (
    <div>
      <Banner message={BANNER_TEXT_CHANGE_PASSWORD} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">🔐</h1>

          {/* Local Authentication */}
          <form onSubmit={handleFormSubmit} className="form__tag">
            <label htmlFor="changepassword__otp" className="form__label">
              OTP <span className="form__label-required">*</span>
            </label>
            <div className="form__input form__input-container">
              <input
                type={showOTP === true ? "text" : "password"}
                id="changepassword__otp"
                className="form__input-password"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="🔒 Cipher Code to Unlock Vault 🏦"
                required
              />
              <button
                className="form__button-password"
                type="button"
                onClick={handleShowOTP}>
                {showOTP === true ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </button>
            </div>
            <p className="form__text-primary mb-2 mt--1-2 text-red">
              **Check OTP on Registered Email Address
            </p>
            <label htmlFor="changepassword__password" className="form__label">
              Set Password <span className="form__label-required">*</span>
            </label>
            <div className="form__input form__input-container">
              <input
                type={showPassword === true ? "text" : "password"}
                id="changepassword__password"
                className="form__input-password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="✨ Craft the Secured Key 🔑"
                required
              />
              <button
                className="form__button-password"
                onClick={handleShowPassword}
                type="button">
                {showPassword === true ? (
                  <BsFillEyeFill />
                ) : (
                  <BsFillEyeSlashFill />
                )}
              </button>
            </div>
            <div
              className={`form__validation mb-1-5 form__validation-${
                passwordAlphabetUpper === "checked" &&
                passwordAlphabetLower === "checked" &&
                passwordLength === "checked" &&
                passwordNumber === "checked" &&
                passwordSpecialChar === "checked"
                  ? "green"
                  : "red"
              }`}>
              <section className="form__validation-section">
                <span className="form__validation-icon">
                  {passwordAlphabetUpper === "default" && <LuCircleDashed />}
                  {passwordAlphabetUpper === "checked" && <FaCheckCircle />}
                  {passwordAlphabetUpper === "error" && <FaExclamationCircle />}
                </span>{" "}
                <span className="form__validation-text">
                  Add an UPPERCASE letter! [A-Z]
                </span>
              </section>
              <section className="form__validation-section">
                <span className="form__validation-icon">
                  {passwordAlphabetLower === "default" && <LuCircleDashed />}
                  {passwordAlphabetLower === "checked" && <FaCheckCircle />}
                  {passwordAlphabetLower === "error" && <FaExclamationCircle />}
                </span>{" "}
                <span className="form__validation-text">
                  Ensure a lowercase letter! [a-z]
                </span>
              </section>
              <section className="form__validation-section">
                <span className="form__validation-icon">
                  {passwordNumber === "default" && <LuCircleDashed />}
                  {passwordNumber === "checked" && <FaCheckCircle />}
                  {passwordNumber === "error" && <FaExclamationCircle />}
                </span>{" "}
                <span className="form__validation-text">
                  Don't miss a number! [0-9]
                </span>
              </section>
              <section className="form__validation-section">
                <span className="form__validation-icon">
                  {passwordSpecialChar === "default" && <LuCircleDashed />}
                  {passwordSpecialChar === "checked" && <FaCheckCircle />}
                  {passwordSpecialChar === "error" && <FaExclamationCircle />}
                </span>{" "}
                <span className="form__validation-text">
                  Insert specials from _!@#$%&*?
                </span>
              </section>
              <section className="form__validation-section">
                <span className="form__validation-icon">
                  {passwordLength === "default" && <LuCircleDashed />}
                  {passwordLength === "checked" && <FaCheckCircle />}
                  {passwordLength === "error" && <FaExclamationCircle />}
                </span>{" "}
                <span className="form__validation-text">
                  Ensure length from 8 - 50 characters.
                </span>
              </section>
            </div>
            <label
              htmlFor="changepassword__confirmPassword"
              className="form__label">
              Confirm Password <span className="form__label-required">*</span>
            </label>
            <input
              type="password"
              id="changepassword__confirmPassword"
              className="form__input form__input-primary"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="✅ Confirm the Crafted Key 🔑"
              required
            />
            <button className="form__button form__button-primary" type="submit">
              {BUTTON_TEXT_CHANGE_PASSWORD}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { ChangePassword };
