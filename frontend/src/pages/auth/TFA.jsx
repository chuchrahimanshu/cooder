// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RESET, verifyTFAToken } from "../../redux/auth/auth.slice";
import { toast } from "react-toastify";

// Import Components
import { Banner } from "../../components";

// Import Utilities
import { BANNER_TEXT_TFA, BUTTON_TEXT_TFA } from "../../constants";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const TFA = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const initialState = {
    otp: "",
    username: location.state?.username,
  };
  const [formData, setFormData] = useState(initialState);
  const [showOTP, setShowOTP] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (!location.state?.username) {
      navigate("/auth/sign-in");
    }
    if (formData.username?.length > 0 && formData.otp?.length > 0) {
      setToggleDisabled(false);
    } else {
      setToggleDisabled(true);
    }

    dispatch(RESET());
  }, [dispatch, navigate, user, location.state?.username, formData]);

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { otp, username } = formData;
    if (!otp?.trim() || otp.length !== 6) {
      return toast.error("Please enter a valid otp");
    }

    const apiData = {
      apiData: {
        otp,
      },
      paramData: username,
    };

    const result = await dispatch(verifyTFAToken(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      setFormData(initialState);
      await dispatch(RESET());
      navigate("/");
    }
  };

  // JSX Component Return Section
  return (
    <section className="auth__component">
      <Banner message={BANNER_TEXT_TFA} />
      <div className="auth-form__container">
        <div className={`auth-form ${theme}`}>
          <h1 className={`auth-form__heading ${theme}`}>2FA</h1>
          <form onSubmit={handleFormSubmit} className="auth-form__tag">
            <label
              htmlFor="tfa__username"
              className={`auth-form__label ${theme}`}>
              Username <span className="auth-form__label--required">*</span>
            </label>
            <input
              type="text"
              id="tfa__username"
              className={`auth-form__input ${theme}`}
              autoComplete="off"
              name="username"
              value={formData.username?.toLowerCase()}
              onChange={handleInputChange}
              placeholder="🎭 Alias, please? ️‍🔍"
              required
              disabled
            />
            <label htmlFor="tfa__otp" className={`auth-form__label ${theme}`}>
              OTP <span className="auth-form__label--required">*</span>
            </label>
            <div
              className={`auth-form__input auth-form__input--container ${theme}`}>
              <input
                type={showOTP === true ? "text" : "password"}
                id="tfa__otp"
                className={`auth-form__input--password ${theme}`}
                autoComplete="off"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="🔒 Cipher code to unlock vault 🏦"
                required
              />
              <button
                className={`auth-form__icon--container ${theme}`}
                type="button"
                onClick={() => setShowOTP(!showOTP)}>
                {showOTP === true ? (
                  <BsFillEyeFill className="auth-form__icon" />
                ) : (
                  <BsFillEyeSlashFill className="auth-form__icon" />
                )}
              </button>
            </div>
            <p className="auth-form__text--info">
              **Check OTP on registered Email Address
            </p>
            <button
              className={`auth-form__button ${theme}`}
              type="submit"
              disabled={toggleDisabled}>
              {BUTTON_TEXT_TFA}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Export Section
export { TFA };
