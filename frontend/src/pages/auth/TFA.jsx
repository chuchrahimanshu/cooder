import React, { useEffect, useState } from "react";
import { Banner } from "../../components";
import { BANNER_TEXT_TFA, BUTTON_TEXT_TFA } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RESET, verifyTFAToken } from "../../redux/auth/auth.slice";
import { toast } from "react-toastify";

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
    <>
      <Banner message={BANNER_TEXT_TFA} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">🚀</h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="auth__username" className="form__label">
              Username <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="auth__username"
              className="form__input form__input-text"
              name="username"
              value={formData.username?.toLowerCase()}
              onChange={handleInputChange}
              placeholder="Enter Username"
              required
              disabled
            />
            <label htmlFor="auth__otp" className="form__label">
              OTP <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="auth__otp"
              className="form__input form__input-text"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              placeholder="Enter 6 Digit OTP"
              required
            />
            <button className="form__button">{BUTTON_TEXT_TFA}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export { TFA };
