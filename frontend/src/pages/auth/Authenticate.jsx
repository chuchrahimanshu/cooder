// Import Section
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RESET, verifyNewUser } from "../../redux/auth/auth.slice";

// Import Components
import { Banner } from "../../components";

// Import Utilities
import GoogleLogo from "../../assets/images/logo/Google.png";
import GithubLogo from "../../assets/images/logo/Github.png";
import { validateEmail } from "../../utils/helper.utils";
import {
  BANNER_TEXT_AUTHENTICATE,
  BUTTON_TEXT_AUTHENTICATE,
} from "../../constants";

const Authenticate = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { existingUser, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (existingUser) {
      navigate("/auth/sign-in");
    }

    dispatch(RESET());
  }, [dispatch, navigate, user, existingUser]);

  // State Handling Section
  const initialState = {
    email: "",
  };
  const [formData, setFormData] = useState(initialState);

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { email } = formData;
    if (!email?.trim() || !validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }

    const apiData = {
      email: email.toLowerCase(),
    };

    const result = await dispatch(verifyNewUser(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      setFormData(initialState);
      await dispatch(RESET());
      if (existingUser) {
        navigate("/auth/sign-in");
      } else {
        navigate("/auth/sign-up", { state: { email: email } });
      }
    }
  };

  // JSX Component Return Section
  return (
    <>
      <Banner message={BANNER_TEXT_AUTHENTICATE} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">🚀</h1>

          {/* Local Authentication */}
          <form onSubmit={handleFormSubmit}>
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
              placeholder="Enter Email Address"
              required
            />
            <button className="form__button">{BUTTON_TEXT_AUTHENTICATE}</button>
          </form>

          {/* Social Authentication */}
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
        </div>
      </div>
    </>
  );
};

// Export Section
export { Authenticate };
