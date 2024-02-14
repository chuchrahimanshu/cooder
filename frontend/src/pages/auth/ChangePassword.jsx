// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

  // JSX Component Return Section
  return (
    <div>
      <Banner message={BANNER_TEXT_CHANGE_PASSWORD} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">🔐</h1>

          {/* Local Authentication */}
          <form onSubmit={handleFormSubmit} className="form__tag">
            <label htmlFor="changepassword__username" className="form__label">
              Username <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="changepassword__username"
              className="form__input form__input-text"
              name="username"
              value={formData.username?.toLowerCase()}
              onChange={handleInputChange}
              placeholder="Enter Username"
              disabled
              required
            />
            <label htmlFor="changepassword__otp" className="form__label">
              OTP <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="changepassword__otp"
              className="form__input form__input-text"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              placeholder="Enter OTP"
              required
            />
            <label htmlFor="changepassword__password" className="form__label">
              Set Password <span className="form__label-required">*</span>
            </label>
            <input
              type="password"
              id="changepassword__password"
              className="form__input form__input-text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter New Password"
              required
            />
            <label
              htmlFor="changepassword__confirmPassword"
              className="form__label">
              Confirm Password <span className="form__label-required">*</span>
            </label>
            <input
              type="password"
              id="changepassword__confirmPassword"
              className="form__input form__input-text"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Enter Confirm Password"
              required
            />
            <button className="form__button" type="submit">
              {BUTTON_TEXT_CHANGE_PASSWORD}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { ChangePassword };
