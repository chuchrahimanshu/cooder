// Import Section
import React, { useState } from "react";
import { Banner } from "../../components";
import GoogleLogo from "../../assets/images/logo/Google.png";
import GithubLogo from "../../assets/images/logo/Github.png";
import {
  BANNER_TEXT_AUTHENTICATE,
  BUTTON_TEXT_AUTHENTICATE,
} from "../../constants";
import { validateEmail } from "../../utils/helper.utils";
import { toast } from "react-toastify";

const Authenticate = () => {
  // State Handling Section
  const initialState = {
    email: "",
  };
  const [formData, setFormData] = useState(initialState);

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { email } = formData;
    if (!email?.trim() || !validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }

    const apiData = {
      email: email.toLowerCase(),
    };
  };

  // JSX Component Return Section
  return (
    <>
      <Banner message={BANNER_TEXT_AUTHENTICATE} />
      <div className="form__container">
        <h1 className="form__heading">🚀</h1>

        {/* Local Authentication */}
        <form className="form" onSubmit={handleFormSubmit}>
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
    </>
  );
};

// Export Section
export { Authenticate };
