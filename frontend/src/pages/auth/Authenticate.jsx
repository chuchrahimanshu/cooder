// Import Section
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RESET, verifyNewUser } from "../../redux/auth/auth.slice";

// Import Components
import { Banner } from "../../components";
import { GoogleAuth } from "../../components";

// Import Utilities
import { validateEmail } from "../../utils/helper.utils";
import {
  BANNER_TEXT_AUTHENTICATE,
  BUTTON_TEXT_AUTHENTICATE,
} from "../../constants";

const Authenticate = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { existingUser, user, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [dispatch, navigate, user, existingUser]);

  // State Handling Section
  const initialState = {
    email: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [toggleDisabled, setToggleDisabled] = useState(true);

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "email" && event.target.value?.length > 0) {
      setToggleDisabled(false);
    }
    if (event.target.name === "email" && event.target.value?.length <= 0) {
      setToggleDisabled(true);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { email } = formData;
    if (!email?.trim() || !validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }

    const apiData = {
      email: email?.toLowerCase(),
    };

    const result = await dispatch(verifyNewUser(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      if (!existingUser && isSuccess) {
        navigate("/auth/sign-up", { state: { email: email } });
      } else {
        navigate("/auth/sign-in");
      }
      setFormData(initialState);
      await dispatch(RESET());
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
              placeholder="Validate, are you NOOB 🌱 or OG 🏆"
              required
            />
            <button
              className={`form__button form__button-primary mb-1 ${
                toggleDisabled === true ? "btn-disable" : "btn-enable"
              }`}
              type="submit"
              disabled={toggleDisabled}>
              {BUTTON_TEXT_AUTHENTICATE}
            </button>
          </form>

          {/* Social Authentication */}
          <div className="form__social">
            <GoogleAuth />
          </div>
        </div>
      </div>
    </>
  );
};

// Export Section
export { Authenticate };
