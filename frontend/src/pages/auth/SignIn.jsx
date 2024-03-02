// Import Section
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  RESET,
  generateChangePasswordToken,
  generateTFAToken,
  userSignIn,
} from "../../redux/auth/auth.slice";

// Import Components
import { Banner } from "../../components";
import { GoogleAuth } from "../../components";

// Import Utilities
import GithubLogo from "../../assets/images/logo/Github.png";
import { BANNER_TEXT_SIGN_IN, BUTTON_TEXT_SIGN_IN } from "../../constants";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";

const SignIn = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    dispatch(RESET());
  }, [dispatch, navigate, user]);

  // State Handling Section
  const initialState = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [formSection, setFormSection] = useState("default");

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
  const handleOTPFormSubmit = async (event) => {
    event.preventDefault();

    const { username } = formData;
    if (!username?.trim()) {
      return toast.error("Please enter required fields");
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
    <>
      <Banner message={BANNER_TEXT_SIGN_IN} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">Sign In</h1>

          {formSection === "default" && (
            <>
              <p className="form__text-primary mb-2 text-red">
                **Choose Authentication Method
              </p>
              <button
                className="form__button form__button-primary mb-2"
                onClick={() => setFormSection("local")}>
                🏠 Local Authentication 🛡️
              </button>
              <button
                className="form__button form__button-primary mb-2"
                onClick={() => setFormSection("otp")}>
                🔐 OTP Authentication 🪄
              </button>
              <button
                className="form__button form__button-primary mb-2"
                onClick={() => setFormSection("social")}>
                🌏 Social Authentication 🌟
              </button>
              <p className="form__text-primary">
                New to Codeial?{" "}
                <Link to="/auth/sign-up" className="form__button-text">
                  Sign Up
                </Link>
              </p>
            </>
          )}

          {/* Local Authentication */}
          {formSection === "local" && (
            <form onSubmit={handleLocalFormSubmit} className="form__tag">
              <p
                className="form__text-primary mb-2 text-red cursor-pointer"
                onClick={() => setFormSection("default")}>
                **Click to Change Authentication
              </p>
              <label htmlFor="signin__username" className="form__label">
                Username <span className="form__label-required">*</span>
              </label>
              <input
                type="text"
                id="signin__username"
                className="form__input form__input-primary"
                name="username"
                value={formData.username?.toLowerCase()}
                onChange={handleInputChange}
                placeholder="🎭 Alias, please? ️‍🔍"
                required
              />
              <label htmlFor="signin__password" className="form__label">
                Password <span className="form__label-required">*</span>
              </label>
              <div className="form__input form__input-container">
                <input
                  type={showPassword === true ? "text" : "password"}
                  id="signin__password"
                  className="form__input-password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="🗝️ Enter the Key to the Kingdom 🏰"
                  required
                />
                <button
                  className="form__button-password"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button">
                  {showPassword === true ? (
                    <BsFillEyeFill />
                  ) : (
                    <BsFillEyeSlashFill />
                  )}
                </button>
              </div>
              <section className="form__input-container mb-2 mt--1">
                <button
                  onClick={handleForgetPassword}
                  type="button"
                  className="form__button-text">
                  Forget Password
                </button>
                <p className="form__text-primary">
                  New to Codeial?{" "}
                  <Link to="/auth/sign-up" className="form__button-text">
                    Sign Up
                  </Link>
                </p>
              </section>
              <button
                className="form__button form__button-primary"
                type="submit">
                {BUTTON_TEXT_SIGN_IN}
              </button>
            </form>
          )}

          {/* OTP Authentication */}
          {formSection === "otp" && (
            <form onSubmit={handleOTPFormSubmit} className="form__tag">
              <p
                className="form__text-primary mb-2 text-red cursor-pointer"
                onClick={() => setFormSection("default")}>
                **Click to Change Authentication
              </p>
              <label htmlFor="signin__username" className="form__label">
                Username <span className="form__label-required">*</span>
              </label>
              <input
                type="text"
                id="signin__username"
                className="form__input form__input"
                name="username"
                value={formData.username?.toLowerCase()}
                onChange={handleInputChange}
                placeholder="🎭 Alias, please? ️‍🔍"
                required
              />
              <p className="form__text-primary mb-2">
                New to Codeial?{" "}
                <Link to="/auth/sign-up" className="form__button-text">
                  Sign Up
                </Link>
              </p>
              <button
                className="form__button form__button-primary"
                type="submit">
                🔑 Generate OTP to Sign In 🚀
              </button>
            </form>
          )}

          {/* Social Authentication */}
          {formSection === "social" && (
            <div className="form__social" id="social-auth">
              <p
                className="form__text-primary mb-2 text-red cursor-pointer"
                onClick={() => setFormSection("default")}>
                **Click to Change Authentication
              </p>
              <GoogleAuth />
              <img
                src={GithubLogo}
                alt="Github Logo"
                className="form__social-image"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Export Section
export { SignIn };
