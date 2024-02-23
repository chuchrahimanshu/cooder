// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET, verifyEmail } from "../../redux/auth/auth.slice";

// Import Components
import { Banner } from "../../components";

// Import Utilities
import {
  BANNER_TEXT_VERIFY_EMAIL,
  BUTTON_TEXT_VERIFY_EMAIL,
} from "../../constants";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { validateEmail } from "../../utils/helper.utils";

const EmailVerification = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!location?.state?.email && !user) {
      navigate("/auth/sign-in");
    }
    if (!location?.state?.email && user) {
      navigate("/");
    }
  }, [navigate, location?.state?.email, user]);

  // State Handling Section
  const initialState = {
    email: location?.state?.email ? location.state.email : "",
    otp: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showOTP, setShowOTP] = useState(false);

  // Form Validation Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { email, otp } = formData;
    if (!email?.trim() || !validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }

    if (!otp?.trim()) {
      return toast.error("Please enter a valid OTP");
    }

    const apiData = {
      otp: otp,
    };

    const result = await dispatch(verifyEmail(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      setFormData(initialState);
      await dispatch(RESET());
      if (user) {
        navigate("/");
      } else {
        navigate("/auth/sign-in");
      }
    }
  };

  // JSX Component Return Section
  return (
    <>
      <Banner message={BANNER_TEXT_VERIFY_EMAIL} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">📨</h1>
          <form onSubmit={handleFormSubmit} className="form__tag">
            <label htmlFor="auth__email" className="form__label">
              Email Address <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="auth__email"
              className="form__input form__input-text"
              name="email"
              value={formData.email.toLowerCase()}
              onChange={handleInputChange}
              placeholder="🧙‍♂️ wizards ensure your email privacy 🛡️"
              required
            />
            <label htmlFor="tfa__otp" className="form__label">
              OTP <span className="form__label-required">*</span>
            </label>
            <div className="form__input form__input-container">
              <input
                type={showOTP === true ? "text" : "password"}
                id="tfa__otp"
                className="form__input-password"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="🔒 Cipher Code to Secure Email ✉️"
                required
              />
              <button
                className="form__button-password"
                type="button"
                onClick={() => setShowOTP(!showOTP)}>
                {showOTP === true ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </button>
            </div>
            <p className="form__text-primary mb-2 text-red mt--1-2">
              **Check OTP on Registered Email Address
            </p>
            <button
              className="form__button form__button-primary mb-1"
              type="submit">
              {BUTTON_TEXT_VERIFY_EMAIL}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

// Export Section
export { EmailVerification };
