// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RESET, userSignUp, verifyUsername } from "../../redux/auth/auth.slice";
import { toast } from "react-toastify";

// Import Components
import { Banner, GoogleAuth } from "../../components";

// Import Utilities
import { BANNER_TEXT_SIGN_UP, BUTTON_TEXT_SIGN_UP } from "../../constants";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { LuCircleDashed } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { validatePassword, validateUsername } from "../../utils/helper.utils";

// JSX Component Function
const SignUp = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useSelector((state) => state.global);
  const { user, uniqueUsername } = useSelector((state) => state.auth);

  // State Handling Section
  const initialState = {
    firstName: "",
    lastName: "",
    email: location?.state?.email ? location.state.email : "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAlphabet, setUsernameAlphabet] = useState("default");
  const [usernameSpecialChar, setUsernameSpecialChar] = useState("default");
  const [usernameSpace, setUsernameSpace] = useState("default");
  const [usernameLength, setUsernameLength] = useState("default");
  const [passwordAlphabetUpper, setPasswordAlphabetUpper] = useState("default");
  const [passwordAlphabetLower, setPasswordAlphabetLower] = useState("default");
  const [passwordNumber, setPasswordNumber] = useState("default");
  const [passwordSpecialChar, setPasswordSpecialChar] = useState("default");
  const [passwordLength, setPasswordLength] = useState("default");
  const [toggleDisabled, setToggleDisabled] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (
      formData.firstName?.length > 0 &&
      formData.lastName?.length > 0 &&
      formData.email?.length > 0 &&
      formData.username?.length > 0 &&
      formData.password?.length > 0 &&
      formData.confirmPassword?.length > 0 &&
      usernameAlphabet === "checked" &&
      usernameSpecialChar === "checked" &&
      usernameSpace === "checked" &&
      usernameLength === "checked" &&
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
    user,
    navigate,
    formData,
    usernameAlphabet,
    usernameSpecialChar,
    usernameSpace,
    usernameLength,
    passwordAlphabetUpper,
    passwordAlphabetLower,
    passwordNumber,
    passwordSpecialChar,
    passwordLength,
  ]);

  // Form Handling Section
  const handleInputChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    // Username Validations
    if (event.target.name === "username") {
      const username = event.target.value.toString();
      if (username.trim().length > 0) {
        if (/[a-zA-Z0-9]/.test(username)) {
          setUsernameAlphabet("checked");
        } else {
          setUsernameAlphabet("error");
        }
        if (username.includes(" ")) {
          setUsernameSpace("error");
        } else {
          setUsernameSpace("checked");
        }
        if (username.length >= 3 && username.length <= 20) {
          setUsernameLength("checked");
        } else {
          setUsernameLength("error");
        }
        if (/^[a-zA-Z0-9_]*$/.test(username)) {
          setUsernameSpecialChar("checked");
        } else {
          setUsernameSpecialChar("error");
        }

        dispatch(verifyUsername(username));
      } else {
        setUsernameAlphabet("default");
        setUsernameSpace("default");
        setUsernameLength("default");
        setUsernameSpecialChar("default");
      }
    }

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

    const { firstName, lastName, email, username, password, confirmPassword } =
      formData;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !username?.trim() ||
      !password?.trim() ||
      !confirmPassword?.trim()
    ) {
      return toast.error("All fields are mandatory");
    }

    if (!validateUsername(username)) {
      return toast.error("Please enter a valid username");
    }

    if (!validatePassword(password)) {
      return toast.error("Please enter a valid password");
    }

    if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password didn't match");
    }

    const apiData = {
      firstName,
      lastName,
      email,
      username,
      password,
    };
    const result = await dispatch(userSignUp(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      setFormData(initialState);
      await dispatch(RESET());
      navigate("/");
    }
  };
  const handleRandomPassword = async () => {
    let randomPassword = "";
    const set =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_!@#$%&*?0123456789";
    const passwordLength = Math.floor(Math.random() * 42) + 8;

    for (let index = 0; index < passwordLength; index++) {
      const randomNumber = Math.floor(Math.random() * set.length);
      randomPassword += set[randomNumber];
    }

    if (
      randomPassword.trim().length >= 8 &&
      randomPassword.length <= 50 &&
      /[A-Z]/.test(randomPassword) &&
      /[a-z]/.test(randomPassword) &&
      /[0-9]/.test(randomPassword) &&
      /[_!@#$%&*?]/.test(randomPassword)
    ) {
      setPasswordAlphabetUpper("checked");
      setPasswordAlphabetLower("checked");
      setPasswordNumber("checked");
      setPasswordSpecialChar("checked");
      setPasswordLength("checked");
      setFormData({
        ...formData,
        password: randomPassword,
        confirmPassword: randomPassword,
      });
    } else {
      setPasswordAlphabetUpper("error");
      setPasswordAlphabetLower("error");
      setPasswordNumber("error");
      setPasswordSpecialChar("error");
      setPasswordLength("error");
      handleRandomPassword();
    }
  };

  // JSX Component Return Section
  return (
    <div>
      <Banner message={BANNER_TEXT_SIGN_UP} />
      <div className="auth-form__container">
        <div className={`auth-form ${theme}`}>
          <h1 className={`auth-form__heading ${theme}`}>Sign Up</h1>
          <form onSubmit={handleFormSubmit} className="auth-form__tag">
            <section className="auth-form__container">
              <div className="auth-form__container-sub">
                <label
                  htmlFor="signup__firstName"
                  className={`auth-form__label ${theme}`}>
                  First Name{" "}
                  <span className="auth-form__label--required">*</span>
                </label>
                <input
                  type="text"
                  id="signup__firstName"
                  className={`auth-form__input ${theme}`}
                  autoComplete="off"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="🚫 Not 'Admin' please! 🙅‍♂️"
                  required
                />
              </div>
              <div className="auth-form__container-sub">
                <label
                  htmlFor="signup__lastName"
                  className={`auth-form__label ${theme}`}>
                  Last Name{" "}
                  <span className="auth-form__label--required">*</span>
                </label>
                <input
                  type="text"
                  id="signup__lastName"
                  className={`auth-form__input ${theme}`}
                  autoComplete="off"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="🏡 Your family's digital footprint 👣"
                  required
                />
              </div>
            </section>
            <section className="auth-form__container">
              <div className="auth-form__container-sub mtop--14-3">
                <label
                  htmlFor="signup__email"
                  className={`auth-form__label ${theme}`}>
                  Email Address{" "}
                  <span className="auth-form__label--required">*</span>
                </label>
                <input
                  type="text"
                  id="signup__email"
                  className={`auth-form__input ${theme}`}
                  autoComplete="off"
                  name="email"
                  value={formData.email?.toLowerCase()}
                  onChange={handleInputChange}
                  placeholder="🧙‍♂️ Wizards ensure's email privacy 🛡️"
                  required
                />
              </div>
              <div className="auth-form__container-sub">
                <section className="auth-form__label--container">
                  <label
                    htmlFor="signup__username"
                    className={`auth-form__label ${theme}`}>
                    Choose Username{" "}
                    <span className="auth-form__label--required">*</span>
                  </label>
                  {formData.username.length >= 3 &&
                    usernameAlphabet === "checked" &&
                    usernameSpace === "checked" &&
                    usernameLength === "checked" &&
                    usernameSpecialChar === "checked" && (
                      <p className={`auth-form__label ${theme}`}>
                        {uniqueUsername ? "✅ Unique" : "❌ Already Taken"}
                      </p>
                    )}
                </section>
                <input
                  type="text"
                  id="signup__username"
                  className={`auth-form__input ${theme}`}
                  autoComplete="off"
                  name="username"
                  value={formData.username?.toLowerCase()}
                  onChange={handleInputChange}
                  placeholder="🌟 Craft a unique digital identity 🎭"
                  required
                />
                <div
                  className={`auth-form__validation mtop-0-5 auth-form__validation-${
                    usernameAlphabet === "checked" &&
                    usernameSpace === "checked" &&
                    usernameLength === "checked" &&
                    usernameSpecialChar === "checked"
                      ? "green"
                      : "red"
                  }`}>
                  <section className="auth-form__validation-section">
                    <span className="auth-form__validation-icon">
                      {usernameAlphabet === "default" && <LuCircleDashed />}
                      {usernameAlphabet === "checked" && <FaCheckCircle />}
                      {usernameAlphabet === "error" && <FaExclamationCircle />}
                    </span>{" "}
                    <span className="auth-form__validation-text">
                      You may employ the alphabets [a - z].
                    </span>
                  </section>
                  <section className="auth-form__validation-section">
                    <span className="auth-form__validation-icon">
                      {usernameAlphabet === "default" && <LuCircleDashed />}
                      {usernameAlphabet === "checked" && <FaCheckCircle />}
                      {usernameAlphabet === "error" && <FaExclamationCircle />}
                    </span>{" "}
                    <span className="auth-form__validation-text">
                      Utilize digits ranging from 0 to 9.
                    </span>
                  </section>
                  <section className="auth-form__validation-section">
                    <span className="auth-form__validation-icon">
                      {usernameSpace === "default" && <LuCircleDashed />}
                      {usernameSpace === "checked" && <FaCheckCircle />}
                      {usernameSpace === "error" && <FaExclamationCircle />}
                    </span>{" "}
                    <span className="auth-form__validation-text">
                      Omit spaces between your characters.
                    </span>
                  </section>
                  <section className="auth-form__validation-section">
                    <span className="auth-form__validation-icon">
                      {usernameSpecialChar === "default" && <LuCircleDashed />}
                      {usernameSpecialChar === "checked" && <FaCheckCircle />}
                      {usernameSpecialChar === "error" && (
                        <FaExclamationCircle />
                      )}
                    </span>{" "}
                    <span className="auth-form__validation-text">
                      Utilize only underscores (_) as specials.
                    </span>
                  </section>
                  <section className="auth-form__validation-section">
                    <span className="auth-form__validation-icon">
                      {usernameLength === "default" && <LuCircleDashed />}
                      {usernameLength === "checked" && <FaCheckCircle />}
                      {usernameLength === "error" && <FaExclamationCircle />}
                    </span>{" "}
                    <span className="auth-form__validation-text">
                      Ensure length from 3 - 20 characters.
                    </span>
                  </section>
                </div>
              </div>
            </section>

            <section className="auth-form__container">
              <div className="auth-form__container-sub">
                <section className="auth-form__label--container mtop--16">
                  <label
                    htmlFor="signup__password"
                    className={`auth-form__label ${theme}`}>
                    Set Password{" "}
                    <span className="auth-form__label--required">*</span>
                  </label>
                  <button
                    className={`auth-form__button--text ${theme}`}
                    type="button"
                    onClick={handleRandomPassword}>
                    Generate Password
                  </button>
                </section>
                <div
                  className={`auth-form__input auth-form__input--container ${theme}`}>
                  <input
                    type={showPassword === true ? "text" : "password"}
                    id="signup__password"
                    className={`auth-form__input--password ${theme}`}
                    autoComplete="off"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="✨ Craft the secured key 🔑"
                    required
                  />
                  <button
                    className={`auth-form__icon--container ${theme}`}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    type="button">
                    {showPassword === true ? (
                      <BsFillEyeFill />
                    ) : (
                      <BsFillEyeSlashFill />
                    )}
                  </button>
                </div>
                <div
                  className={`auth-form__validation auth-form__validation-${
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
                      {passwordAlphabetUpper === "default" && (
                        <LuCircleDashed />
                      )}
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
                      {passwordAlphabetLower === "default" && (
                        <LuCircleDashed />
                      )}
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
                      {passwordSpecialChar === "error" && (
                        <FaExclamationCircle />
                      )}
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
              </div>
              <div className="auth-form__container-sub mtop-1">
                <label
                  htmlFor="signup__confirmPassword"
                  className={`auth-form__label ${theme}`}>
                  Confirm Password{" "}
                  <span className="auth-form__label--required">*</span>
                </label>
                <input
                  type="password"
                  id="signup__confirmPassword"
                  className={`auth-form__input ${theme}`}
                  autoComplete="off"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="✅ Confirm the crafted key 🔑"
                  required
                />
              </div>
            </section>

            <button
              className={`auth-form__button ${theme} mtop-0-5`}
              disabled={toggleDisabled}
              type="submit">
              {BUTTON_TEXT_SIGN_UP}
            </button>
          </form>
          <div className="auth-form__social mtop-1-5">
            <GoogleAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

// Export Section
export { SignUp };
