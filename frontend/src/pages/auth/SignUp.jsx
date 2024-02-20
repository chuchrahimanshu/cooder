import React, { useEffect, useState } from "react";
import { Banner } from "../../components";
import { BANNER_TEXT_SIGN_UP, BUTTON_TEXT_SIGN_UP } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyUsername } from "../../redux/auth/auth.slice";
import { toast } from "react-toastify";
import GoogleLogo from "../../assets/images/logo/Google.png";
import GithubLogo from "../../assets/images/logo/Github.png";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

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
  const [usernameAlphabet, setUsernameAlphabet] = useState(false);
  const [usernameNumber, setUsernameNumber] = useState(false);
  const [usernameSpecialChar, setUsernameSpecialChar] = useState(false);
  const [usernameSpace, setUsernameSpace] = useState(false);
  const [usernameLength, setUsernameLength] = useState(false);
  const [usernameColorScheme, setUsernameColorScheme] = useState(
    "form__validation-black"
  );
  const [passwordAlphabetUpper, setPasswordAlphabetUpper] = useState(false);
  const [passwordAlphabetLower, setPasswordAlphabetLower] = useState(false);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [passwordSpecialChar, setPasswordSpecialChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordColorScheme, setPasswordColorScheme] = useState(
    "form__validation-black"
  );
  const [passwordStrongStatus, setPasswordStrongStatus] = useState(0);

  // Form Handling Section
  const handleInputChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = (event) => {
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
                  <label htmlFor="signup__username" className="form__label">
                    Choose Username{" "}
                    <span className="form__label-required">*</span>
                  </label>
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
                    className={`form__validation mb-2 ${usernameColorScheme}`}>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {usernameAlphabet === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Alphabets allowed
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {usernameNumber === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Numbers not allowed
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {usernameSpace === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Space not allowed
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {usernameSpecialChar === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Only Underscore _ allowed in Special
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {usernameLength === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Length 3 - 20
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
                    className={`form__validation mb-1-5 ${passwordColorScheme}`}>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {passwordAlphabetUpper === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Atleast 1 Uppercase Required
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {passwordAlphabetLower === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Atleast 1 Lowercase Required
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {passwordNumber === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Atlease 1 Number Required
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {passwordSpecialChar === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Allease 1 Special Character Required
                      </span>
                    </section>
                    <section className="form__validation-section">
                      <span className="form__validation-icon">
                        {passwordLength === true ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCheckCircle />
                        )}
                      </span>{" "}
                      <span className="form__validation-text">
                        Atlease Length 8 - 50
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
