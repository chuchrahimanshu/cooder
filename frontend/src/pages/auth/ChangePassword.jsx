// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
            <section className="form__section">
              <section className="form__section-col mr-2">
                <label
                  htmlFor="changepassword__username"
                  className="form__label">
                  Username <span className="form__label-required">*</span>
                </label>
                <input
                  type="text"
                  id="changepassword__username"
                  className="form__input form__input-primary"
                  name="username"
                  value={formData.username?.toLowerCase()}
                  onChange={handleInputChange}
                  placeholder="🎭 Alias, please? ️‍🔍"
                  disabled
                  required
                />
              </section>
              <section className="form__section-col">
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
                    {showOTP === true ? (
                      <BsFillEyeFill />
                    ) : (
                      <BsFillEyeSlashFill />
                    )}
                  </button>
                </div>
              </section>
            </section>
            <section className="form__section">
              <section className="form__section-col mr-2">
                <label
                  htmlFor="changepassword__password"
                  className="form__label">
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
              </section>
              <section className="form__section-col">
                <label
                  htmlFor="changepassword__confirmPassword"
                  className="form__label">
                  Confirm Password{" "}
                  <span className="form__label-required">*</span>
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
              </section>
            </section>
            <section className="form__section">
              <p className="form__text-primary mb-2 text-red">
                **Check OTP on Registered Email Address
              </p>
              <p className="form__text-primary mb-2">
                Back to{" "}
                <Link to="/auth/sign-in" className="form__button-text">
                  Sign In
                </Link>
              </p>
            </section>
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
