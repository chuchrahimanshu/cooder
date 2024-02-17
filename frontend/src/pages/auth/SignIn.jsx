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
import { Banner } from "../../components";

// Import Utilities
import GoogleLogo from "../../assets/images/logo/Google.png";
import GithubLogo from "../../assets/images/logo/Github.png";
import { BANNER_TEXT_SIGN_IN, BUTTON_TEXT_SIGN_IN } from "../../constants";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";

const SignIn = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, tfaVerification } = useSelector((state) => state.auth);

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
  const [showForm, setShowForm] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
      setFormData(initialState);
      await dispatch(RESET());
      if (tfaVerification) {
        navigate("/auth/tfa", { state: { username: username } });
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
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // JSX Component Return Section
  return (
    <>
      <Banner message={BANNER_TEXT_SIGN_IN} />
      <div className="form__container">
        <div className="form">
          {/* Form Headings */}
          <h1 className="form__heading">Sign In</h1>

          {/* Change Auth Method */}
          {showForm === null ? (
            <p className="form__text mb-1 text-red">
              **Choose Authentication Method
            </p>
          ) : (
            <p
              className="form__text mb-2 text-red cursor-pointer"
              onClick={() => setShowForm(null)}>
              **Click to Change Authentication
            </p>
          )}

          {/* Local Authentication */}
          {showForm === null ? (
            <button
              className="form__button bg-black"
              onClick={() => setShowForm("local")}>
              🏠 Local Authentication 🛡️
            </button>
          ) : null}
          {showForm === "local" ? (
            <form onSubmit={handleLocalFormSubmit} className="form__tag">
              <label htmlFor="signin__username" className="form__label">
                Username <span className="form__label-required">*</span>
              </label>
              <input
                type="text"
                id="signin__username"
                className="form__input form__input-text"
                name="username"
                value={formData.username?.toLowerCase()}
                onChange={handleInputChange}
                placeholder="Enter Username"
                required
              />
              <label htmlFor="signin__password" className="form__label">
                Password <span className="form__label-required">*</span>
              </label>
              <div className="form__input-container">
                <input
                  type={showPassword === true ? "text" : "password"}
                  id="signin__password"
                  className="form__input-password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  required
                />
                <button
                  className="form__button-password"
                  onClick={handleShowPassword}>
                  {showPassword === true ? (
                    <BsFillEyeFill />
                  ) : (
                    <BsFillEyeSlashFill />
                  )}
                </button>
              </div>

              <button
                onClick={handleForgetPassword}
                className="form__button-blue">
                Forget Password
              </button>
              <button className="form__button" type="submit">
                {BUTTON_TEXT_SIGN_IN}
              </button>
            </form>
          ) : null}

          {/* OTP Authentication */}
          {showForm === null ? (
            <button
              className="form__button bg-black"
              onClick={() => setShowForm("otp")}>
              🔐 OTP Authentication 🪄
            </button>
          ) : null}
          {showForm === "otp" ? (
            <form onSubmit={handleOTPFormSubmit} className="form__tag">
              <label htmlFor="signin__username" className="form__label">
                Username <span className="form__label-required">*</span>
              </label>
              <input
                type="text"
                id="signin__username"
                className="form__input form__input-text"
                name="username"
                value={formData.username?.toLowerCase()}
                onChange={handleInputChange}
                placeholder="Enter Username"
                required
              />
              <button className="form__button" type="submit">
                🔑 Generate OTP to Sign In 🚀
              </button>
            </form>
          ) : null}

          {/* Social Authentication */}
          {showForm === null ? (
            <button
              className="form__button bg-black"
              onClick={() => setShowForm("social")}>
              🌏 Social Authentication 🌟
            </button>
          ) : null}
          {showForm === "social" ? (
            <div className="form__social" id="social-auth">
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
          ) : null}
        </div>
      </div>
    </>
  );
};

export { SignIn };
