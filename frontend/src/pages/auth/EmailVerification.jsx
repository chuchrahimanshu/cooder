// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  RESET,
  getUserDetails,
  verifyEmail,
} from "../../redux/auth/auth.slice";

// Import Components
import { Banner } from "../../components";

// Import Utilities
import {
  BANNER_TEXT_VERIFY_EMAIL,
  BUTTON_TEXT_VERIFY_EMAIL,
} from "../../constants";
import { validateEmail } from "../../utils/helper.utils";

const EmailVerification = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const initialState = {
    email: location?.state?.email ? location.state.email : "",
    otp: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [toggleDisabled, setToggleDisabled] = useState(true);

  useEffect(() => {
    if (!location?.state?.email && !user) {
      navigate("/auth/sign-in");
    }
    if (!location?.state?.email && user) {
      navigate("/");
    }

    if (formData.email?.length > 0 && formData.otp?.length > 0) {
      setToggleDisabled(false);
    } else {
      setToggleDisabled(true);
    }
  }, [navigate, location?.state?.email, user, formData]);

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
      await dispatch(getUserDetails(user._id));
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
      <div className="auth-form__container">
        <div className={`auth-form ${theme}`}>
          <h1 className={`auth-form__heading ${theme}`}>Verify 📧</h1>
          <form onSubmit={handleFormSubmit} className="auth-form__tag">
            <label
              htmlFor="auth__email"
              className={`auth-form__label ${theme}`}>
              Email Address{" "}
              <span className="auth-form__label--required">*</span>
            </label>
            <input
              type="text"
              id="auth__email"
              className={`auth-form__input ${theme}`}
              autoComplete="off"
              name="email"
              value={formData.email.toLowerCase()}
              onChange={handleInputChange}
              placeholder="🧙‍♂️ Wizards ensure's email privacy 🛡️"
              required
            />
            <label htmlFor="tfa__otp" className={`auth-form__label ${theme}`}>
              OTP <span className="auth-form__label--required">*</span>
            </label>
            <input
              type="number"
              id="tfa__otp"
              className={`auth-form__input ${theme}`}
              autoComplete="off"
              name="otp"
              maxLength={6}
              value={formData.otp}
              onChange={handleInputChange}
              placeholder="🔒 Cipher code to secure email ✉️"
              required
            />
            <p className="auth-form__text--info">
              **Check OTP on registered Email Address
            </p>
            <button
              className={`auth-form__button ${theme}`}
              disabled={toggleDisabled}
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
