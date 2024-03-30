// Import Section
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RESET,
  generateChangePasswordToken,
  generateTFAToken,
  userSignIn,
} from "../../redux/auth/auth.slice";

// Import Components
import { Banner, GoogleAuth } from "../../components";

// Import Utilities
import { BANNER_TEXT_SIGN_IN, BUTTON_TEXT_SIGN_IN } from "../../constants";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";

const SignIn = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const initialState = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (formData.username?.length > 0 && formData.password?.length > 0) {
      setToggleDisabled(false);
    } else {
      setToggleDisabled(true);
    }

    dispatch(RESET());
  }, [dispatch, navigate, user, formData]);

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleLocalFormSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = formData;
    if (!username?.trim() || !password?.trim()) {
      return toast.error("Please enter all required details");
    }

    const apiData = {
      username: username?.toLowerCase(),
      password: password,
    };

    const result = await dispatch(userSignIn(apiData));
    if (result.meta.requestStatus === "fulfilled") {
      if (result.payload.data.tfaVerification) {
        navigate("/auth/tfa", { state: { username: username } });
        setFormData(initialState);
        await dispatch(RESET());
      } else {
        navigate("/");
      }
    }
  };
  const handleForgetPassword = async (event) => {
    event.preventDefault();
    const { username } = formData;
    if (!username?.trim()) {
      return toast.error("Username is required");
    }
    const result = await dispatch(generateChangePasswordToken(username));
    if (result.meta.requestStatus === "fulfilled") {
      setFormData(initialState);
      await dispatch(RESET());
      navigate("/auth/change-password", { state: { username: username } });
    }
  };
  const handleOTPSubmit = async (event) => {
    const { username } = formData;
    if (!username?.trim()) {
      return toast.error("Please enter username");
    }

    const result = await dispatch(generateTFAToken(username));
    if (result.meta.requestStatus === "fulfilled") {
      setFormData(initialState);
      await dispatch(RESET());
      navigate("/auth/tfa", { state: { username: username } });
    }
  };

  // JSX Component Return Section
  return (
    <section className="auth__component">
      <Banner message={BANNER_TEXT_SIGN_IN} />
      <div className="auth-form__container">
        <div className={`auth-form ${theme}`}>
          <h1 className={`auth-form__heading ${theme}`}>Sign In</h1>

          {/* Local Authentication */}
          <form onSubmit={handleLocalFormSubmit} className="auth-form__tag">
            <label
              htmlFor="signin__username"
              className={`auth-form__label ${theme}`}>
              Username <span className="auth-form__label--required">*</span>
            </label>
            <input
              type="text"
              id="signin__username"
              className={`auth-form__input ${theme}`}
              autoComplete="off"
              name="username"
              value={formData.username?.toLowerCase()}
              onChange={handleInputChange}
              placeholder="🎭 Alias, please? ️‍🔍"
              required
            />
            <label
              htmlFor="signin__password"
              className={`auth-form__label ${theme}`}>
              Password <span className="auth-form__label--required">*</span>
            </label>
            <div
              className={`auth-form__input auth-form__input--container ${theme}`}>
              <input
                type={showPassword === true ? "text" : "password"}
                id="signin__password"
                className={`auth-form__input--password ${theme}`}
                autoComplete="off"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="🗝️ Enter the key to the Kingdom 🏰"
                required
              />
              <button
                className={`auth-form__icon--container ${theme}`}
                onClick={() => setShowPassword(!showPassword)}
                type="button">
                {showPassword === true ? (
                  <BsFillEyeFill className="auth-form__icon" />
                ) : (
                  <BsFillEyeSlashFill className="auth-form__icon" />
                )}
              </button>
            </div>
            <section className="auth-form__input--container mbottom-0-5">
              <button
                onClick={handleForgetPassword}
                type="button"
                className={`auth-form__button--text ${theme}`}>
                Forget Password
              </button>
              <button
                onClick={handleOTPSubmit}
                type="button"
                className={`auth-form__button--text ${theme}`}>
                Login using OTP
              </button>
            </section>
            <button
              className={`auth-form__button ${theme} mtop-1-5`}
              disabled={toggleDisabled}
              type="submit">
              {BUTTON_TEXT_SIGN_IN}
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
export { SignIn };
