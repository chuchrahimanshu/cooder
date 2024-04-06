// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

// JSX Component Function
const ChangePassword = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useSelector((state) => state.global);

  // State Handling Section
  const initialState = {
    username: location?.state?.username,
    otp: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordAlphabetUpper, setPasswordAlphabetUpper] = useState("default");
  const [passwordAlphabetLower, setPasswordAlphabetLower] = useState("default");
  const [passwordNumber, setPasswordNumber] = useState("default");
  const [passwordSpecialChar, setPasswordSpecialChar] = useState("default");
  const [passwordLength, setPasswordLength] = useState("default");
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [toggleRules, setToggleRules] = useState(false);

  useEffect(() => {
    if (!location?.state?.username) {
      navigate("/auth/sign-in");
    }

    if (
      formData.username?.length > 0 &&
      formData.otp?.length > 0 &&
      formData.password?.length > 0 &&
      formData.confirmPassword?.length > 0 &&
      passwordAlphabetUpper === "checked" &&
      passwordAlphabetLower === "checked" &&
      passwordNumber === "checked" &&
      passwordSpecialChar === "checked" &&
      passwordLength === "checked"
    ) {
      setToggleDisabled(false);
    } else {
      setToggleDisabled(true);
    }
  }, [
    navigate,
    location.state?.username,
    formData,
    passwordAlphabetUpper,
    passwordAlphabetLower,
    passwordNumber,
    passwordSpecialChar,
    passwordLength,
  ]);

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    // Password Validations
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

  // JSX Component Return Section
  return (
    <section className="auth__component">
      <Banner message={BANNER_TEXT_CHANGE_PASSWORD} />
      <div className="auth-form__container">
        <div className={`auth-form ${theme}`}>
          <h1 className={`auth-form__heading ${theme}`}>Update 🔏</h1>
          <form onSubmit={handleFormSubmit} className="auth-form__tag">
            <label
              htmlFor="changepassword__otp"
              className={`auth-form__label ${theme}`}>
              OTP <span className="auth-form__label--required">*</span>
            </label>
            <input
              type="number"
              id="changepassword__otp"
              className={`auth-form__input ${theme}`}
              autoComplete="off"
              name="otp"
              maxLength={6}
              value={formData.otp}
              onChange={handleInputChange}
              placeholder="🔒 Cipher code to unlock vault 🏦"
              required
            />
            <p className="auth-form__text--info">
              **Check OTP on registered Email Address
            </p>
            <label
              htmlFor="changepassword__password"
              className={`auth-form__label ${theme}`}>
              Set Password <span className="auth-form__label--required">*</span>
            </label>
            <div
              className={`auth-form__input auth-form__input--container ${theme}`}>
              <input
                type={showPassword === true ? "text" : "password"}
                id="changepassword__password"
                className={`auth-form__input--password ${theme}`}
                autoComplete="off"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="✨ Craft the secured key 🔑"
                onFocus={() => setToggleRules(true)}
                onBlur={() => setToggleRules(false)}
                required
              />
              <button
                className={`auth-form__icon--container ${theme}`}
                onClick={() => setShowPassword(!showPassword)}
                type="button">
                {showPassword === true ? (
                  <BsFillEyeFill className="auth-form__icon" />
                ) : (
                  <BsFillEyeSlashFill className="auth-form__icon" />
                )}
              </button>
            </div>
            {toggleRules === true && (
              <div
                className={`auth-form__validation mb-1-5 auth-form__validation-${
                  passwordAlphabetUpper === "checked" &&
                  passwordAlphabetLower === "checked" &&
                  passwordLength === "checked" &&
                  passwordNumber === "checked" &&
                  passwordSpecialChar === "checked"
                    ? "green"
                    : "red"
                }`}>
                <section className="auth-form__validation-section">
                  <span className="auth-form__validation-icon">
                    {passwordAlphabetUpper === "default" && <LuCircleDashed />}
                    {passwordAlphabetUpper === "checked" && <FaCheckCircle />}
                    {passwordAlphabetUpper === "error" && (
                      <FaExclamationCircle />
                    )}
                  </span>{" "}
                  <span className="auth-form__validation-text">
                    Add an UPPERCASE letter! [A-Z]
                  </span>
                </section>
                <section className="auth-form__validation-section">
                  <span className="auth-form__validation-icon">
                    {passwordAlphabetLower === "default" && <LuCircleDashed />}
                    {passwordAlphabetLower === "checked" && <FaCheckCircle />}
                    {passwordAlphabetLower === "error" && (
                      <FaExclamationCircle />
                    )}
                  </span>{" "}
                  <span className="auth-form__validation-text">
                    Ensure a lowercase letter! [a-z]
                  </span>
                </section>
                <section className="auth-form__validation-section">
                  <span className="auth-form__validation-icon">
                    {passwordNumber === "default" && <LuCircleDashed />}
                    {passwordNumber === "checked" && <FaCheckCircle />}
                    {passwordNumber === "error" && <FaExclamationCircle />}
                  </span>{" "}
                  <span className="auth-form__validation-text">
                    Don't miss a number! [0-9]
                  </span>
                </section>
                <section className="auth-form__validation-section">
                  <span className="auth-form__validation-icon">
                    {passwordSpecialChar === "default" && <LuCircleDashed />}
                    {passwordSpecialChar === "checked" && <FaCheckCircle />}
                    {passwordSpecialChar === "error" && <FaExclamationCircle />}
                  </span>{" "}
                  <span className="auth-form__validation-text">
                    Insert specials from _!@#$%&*?
                  </span>
                </section>
                <section className="auth-form__validation-section">
                  <span className="auth-form__validation-icon">
                    {passwordLength === "default" && <LuCircleDashed />}
                    {passwordLength === "checked" && <FaCheckCircle />}
                    {passwordLength === "error" && <FaExclamationCircle />}
                  </span>{" "}
                  <span className="auth-form__validation-text">
                    Ensure length from 8 - 50 characters.
                  </span>
                </section>
              </div>
            )}
            <label
              htmlFor="changepassword__confirmPassword"
              className={`auth-form__label ${theme}`}>
              Confirm Password{" "}
              <span className="auth-form__label--required">*</span>
            </label>
            <input
              type="password"
              id="changepassword__confirmPassword"
              className={`auth-form__input ${theme}`}
              autoComplete="off"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="✅ Confirm the crafted key 🔑"
              required
            />
            <button
              className={`auth-form__button ${theme} mtop-0-5`}
              type="submit"
              disabled={toggleDisabled}>
              {BUTTON_TEXT_CHANGE_PASSWORD}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Export Section
export { ChangePassword };
