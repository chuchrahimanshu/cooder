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
  const { existingUser, user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.global);

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
      if (result.payload.data.existingUser) {
        navigate("/auth/sign-in");
      } else {
        navigate("/auth/sign-up", { state: { email: email } });
      }
      setFormData(initialState);
      await dispatch(RESET());
    }
  };

  // JSX Component Return Section
  return (
    <section className="auth__component">
      <Banner message={BANNER_TEXT_AUTHENTICATE} />
      <div className="auth-form__container">
        <div className={`auth-form ${theme}`}>
          <h1 className="auth-form__heading">🚀</h1>

          {/* Local Authentication */}
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
              name="email"
              value={formData.email.toLowerCase()}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="Validate, are you NOOB 🌱 or OG 🏆"
              required
            />
            <button
              className={`auth-form__button ${theme}`}
              type="submit"
              disabled={toggleDisabled}>
              {BUTTON_TEXT_AUTHENTICATE}
            </button>
          </form>

          {/* Social Authentication */}
          <div className="auth-form__social mtop-1-5">
            <GoogleAuth />
          </div>
        </div>
      </div>
    </section>
  );
};

// Export Section
export { Authenticate };
