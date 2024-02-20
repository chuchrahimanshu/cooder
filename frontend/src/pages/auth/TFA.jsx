// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (!location.state?.username) {
      navigate("/auth/sign-in");
    }

    dispatch(RESET());
  }, [dispatch, navigate, user, location.state?.username]);

  // State Handling Section
  const initialState = {
    otp: "",
    username: location.state?.username,
  };
  const [formData, setFormData] = useState(initialState);
  const [showOTP, setShowOTP] = useState(false);

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
  const handleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  // JSX Component Return Section
  return (
    <>
      <Banner message={BANNER_TEXT_TFA} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">2FA</h1>
          <form onSubmit={handleFormSubmit} className="form__tag">
            <label htmlFor="tfa__username" className="form__label">
              Username <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="tfa__username"
              className="form__input form__input-primary"
              name="username"
              value={formData.username?.toLowerCase()}
              onChange={handleInputChange}
              placeholder="🎭 Alias, please? ️‍🔍"
              required
              disabled
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
            <p className="form__text-primary mb-2 text-red mt--1-2">
              **Check OTP on Registered Email Address
            </p>
            <p className="form__text-primary mb-2">
              Back to{" "}
              <Link to="/auth/sign-in" className="form__button-text">
                Sign In
              </Link>
            </p>
            <button className="form__button form__button-primary" type="submit">
              {BUTTON_TEXT_TFA}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { TFA };
