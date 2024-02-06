// Import Section
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RESET,
  generateTFAToken,
  userSignIn,
} from "../../redux/auth/auth.slice";

// Import Components
import { Banner } from "../../components";

// Import Utilities
import GoogleLogo from "../../assets/images/logo/Google.png";
import GithubLogo from "../../assets/images/logo/Github.png";
import { BANNER_TEXT_SIGN_IN, BUTTON_TEXT_SIGN_IN } from "../../constants";

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
      username: username.toLowerCase(),
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
          {/* Form Headings */}
          <h1 className="form__heading">Sign In</h1>
          {showForm === null ? (
            <p className="form__text">Choose the Authentication Method</p>
          ) : (
            <p className="form__text text-ul" onClick={() => setShowForm(null)}>
              Click here to change Authentication Method
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
            <form onSubmit={handleLocalFormSubmit} id="local-auth">
              <label htmlFor="auth__username" className="form__label">
                Username <span className="form__label-required">*</span>
              </label>
              <input
                type="text"
                id="auth__username"
                className="form__input form__input-text"
                name="username"
                value={formData.username.toLowerCase()}
                onChange={handleInputChange}
                placeholder="Enter Username"
                required
              />
              <label htmlFor="auth__password" className="form__label">
                Password <span className="form__label-required">*</span>
              </label>
              <input
                type="password"
                id="auth__password"
                className="form__input form__input-text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                required
              />
              <button className="form__button bg-navy-blue">
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
            <form onSubmit={handleOTPFormSubmit} id="otp-auth">
              <label htmlFor="auth__username" className="form__label">
                Username <span className="form__label-required">*</span>
              </label>
              <input
                type="text"
                id="auth__username"
                className="form__input form__input-text"
                name="username"
                value={formData.username.toLowerCase()}
                onChange={handleInputChange}
                placeholder="Enter Username"
                required
              />
              <button className="form__button bg-navy-blue">
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
