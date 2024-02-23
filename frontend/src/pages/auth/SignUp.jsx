import React, { useEffect, useState } from "react";
import { Banner } from "../../components";
import { BANNER_TEXT_SIGN_UP, BUTTON_TEXT_SIGN_UP } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RESET, userSignUp, verifyUsername } from "../../redux/auth/auth.slice";
import { toast } from "react-toastify";
import GoogleLogo from "../../assets/images/logo/Google.png";
import GithubLogo from "../../assets/images/logo/Github.png";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { LuCircleDashed } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { validatePassword, validateUsername } from "../../utils/helper.utils";

const SignUp = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, uniqueUsername } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
  const [formSection, setFormSection] = useState("default");
  const [authType, setAuthType] = useState(null);
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

  // Form Handling Section
  const handleInputChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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

  // JSX Component Return Section
  return (
    <div>
      <Banner message={BANNER_TEXT_SIGN_UP} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">Sign Up</h1>

          {formSection === "default" && (
            <>
              <p className="form__text-primary mb-2 text-red">
                **Choose Authentication Method
              </p>
              <button
                className="form__button form__button-primary mb-2"
                onClick={() => {
                  setFormSection("name");
                  setAuthType("local");
                }}>
                🏠 Local Authentication 🛡️
              </button>
              <button
                className="form__button form__button-primary mb-2"
                onClick={() => {
                  setFormSection("social");
                  setAuthType("social");
                }}>
                🌏 Social Authentication 🌟
              </button>
              <p className="form__text-primary">
                Already a Codealite?{" "}
                <Link to="/auth/sign-in" className="form__button-text">
                  Sign In
                </Link>
              </p>
            </>
          )}

          {formSection === "social" && (
            <div className="form__social">
              <img
                src={GoogleLogo}
                alt="Google Logo"
                className="form__social-image"
              />
              <img
                src={GithubLogo}
                alt="Github Logo"
                className="form__social-image"
              />
            </div>
          )}

          {authType === "local" && (
            <form onSubmit={handleFormSubmit} className="form__tag">
              {formSection === "name" && (
                <>
                  <label htmlFor="signup__email" className="form__label">
                    Email Address{" "}
                    <span className="form__label-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="signup__email"
                    className="form__input form__input-primary"
                    name="email"
                    value={formData.email?.toLowerCase()}
                    onChange={handleInputChange}
                    placeholder="🧙‍♂️ wizards ensure your email privacy 🛡️"
                    required
                  />
                  <label htmlFor="signup__firstName" className="form__label">
                    First Name <span className="form__label-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="signup__firstName"
                    className="form__input form__input-secondary"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="🚫 Not 'Admin' please! 🙅‍♂️"
                    required
                  />
                  <label htmlFor="signup__lastName" className="form__label">
                    Last Name <span className="form__label-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="signup__lastName"
                    className="form__input form__input-secondary"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="🚫 Not 'Rockstar' unless you truly are! 🎸"
                    required
                  />
                  <section className="form__input-container">
                    <button
                      className="form__button form__button-state"
                      onClick={() => setFormSection("default")}>
                      <FcPrevious className="form__button-emoji" />
                    </button>
                    <button
                      className="form__button form__button-state"
                      onClick={() => setFormSection("username")}>
                      <FcNext className="form__button-emoji" />
                    </button>
                  </section>
                </>
              )}
              {formSection === "username" && (
                <>
                  <section className="form__label-container">
                    <label htmlFor="signup__username" className="form__label">
                      Choose Username{" "}
                      <span className="form__label-required">*</span>
                    </label>
                    {formData.username.length >= 3 &&
                      usernameAlphabet === "checked" &&
                      usernameSpace === "checked" &&
                      usernameLength === "checked" &&
                      usernameSpecialChar === "checked" && (
                        <p className="form__label">
                          {uniqueUsername ? "✅ Unique" : "❌ Already Taken"}
                        </p>
                      )}
                  </section>
                  <input
                    type="text"
                    id="signup__username"
                    className="form__input form__input-primary"
                    name="username"
                    value={formData.username?.toLowerCase()}
                    onChange={handleInputChange}
                    placeholder="🌟 craft a unique digital identity 🎭"
                    required
                  />

                  <div
                    className={`form__validation mb-2 form__validation-${
                      usernameAlphabet === "checked" &&
                      usernameSpace === "checked" &&
                      usernameLength === "checked" &&
                      usernameSpecialChar === "checked"
                        ? "green"
                        : "red"
                    }`}>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {usernameAlphabet === "default" && <LuCircleDashed />}
                        {usernameAlphabet === "checked" && <FaCheckCircle />}
                        {usernameAlphabet === "error" && (
                          <FaExclamationCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Stick to using of alphabets and numbers.
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {usernameSpace === "default" && <LuCircleDashed />}
                        {usernameSpace === "checked" && <FaCheckCircle />}
                        {usernameSpace === "error" && <FaExclamationCircle />}
                      </span>{" "}
                      <span className="form__validation-text">
                        Omit spaces between your characters.
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {usernameSpecialChar === "default" && (
                          <LuCircleDashed />
                        )}
                        {usernameSpecialChar === "checked" && <FaCheckCircle />}
                        {usernameSpecialChar === "error" && (
                          <FaExclamationCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Utilize only underscores (_) as specials.
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {usernameLength === "default" && <LuCircleDashed />}
                        {usernameLength === "checked" && <FaCheckCircle />}
                        {usernameLength === "error" && <FaExclamationCircle />}
                      </span>{" "}
                      <span className="form__validation-text">
                        Ensure length from 3 - 20 characters.
                      </span>
                    </section>
                  </div>
                  <section className="form__input-container">
                    <button
                      className="form__button form__button-state"
                      onClick={() => setFormSection("name")}>
                      <FcPrevious className="form__button-emoji" />
                    </button>
                    <button
                      className="form__button form__button-state"
                      onClick={() => setFormSection("password")}>
                      <FcNext className="form__button-emoji" />
                    </button>
                  </section>
                </>
              )}
              {formSection === "password" && (
                <>
                  <label htmlFor="signup__password" className="form__label">
                    Set Password <span className="form__label-required">*</span>
                  </label>
                  <div className="form__input form__input-container">
                    <input
                      type={showPassword === true ? "text" : "password"}
                      id="signup__password"
                      className="form__input-password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="✨ Craft the Secured Key 🔑"
                      required
                    />
                    <button
                      className="form__button-password"
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
                        {passwordAlphabetUpper === "default" && (
                          <LuCircleDashed />
                        )}
                        {passwordAlphabetUpper === "checked" && (
                          <FaCheckCircle />
                        )}
                        {passwordAlphabetUpper === "error" && (
                          <FaExclamationCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Add an UPPERCASE letter! [A-Z]
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {passwordAlphabetLower === "default" && (
                          <LuCircleDashed />
                        )}
                        {passwordAlphabetLower === "checked" && (
                          <FaCheckCircle />
                        )}
                        {passwordAlphabetLower === "error" && (
                          <FaExclamationCircle />
                        )}
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
                        {passwordSpecialChar === "default" && (
                          <LuCircleDashed />
                        )}
                        {passwordSpecialChar === "checked" && <FaCheckCircle />}
                        {passwordSpecialChar === "error" && (
                          <FaExclamationCircle />
                        )}
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
                    htmlFor="signup__confirmPassword"
                    className="form__label">
                    Confirm Password{" "}
                    <span className="form__label-required">*</span>
                  </label>
                  <input
                    type="password"
                    id="signup__confirmPassword"
                    className="form__input form__input-secondary"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="✅ Confirm the Crafted Key 🔑"
                    required
                  />
                  <section className="form__input-container">
                    <button
                      className="form__button form__button-state"
                      onClick={() => setFormSection("username")}>
                      <FcPrevious className="form__button-emoji" />
                    </button>
                    <button
                      className="form__button form__button-secondary"
                      type="submit">
                      {BUTTON_TEXT_SIGN_UP}
                    </button>
                  </section>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export { SignUp };
