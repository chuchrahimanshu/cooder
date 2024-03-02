// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  chooseUsername,
  getSingleUser,
  verifyUsername,
} from "../../redux/auth/auth.slice";

// Import Components
import { Banner } from "./Banner";

// Import Utilities
import { validateUsername } from "../../utils/helper.utils";
import { LuCircleDashed } from "react-icons/lu";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { BANNER_TEXT_SIGN_UP } from "../../constants";

const ChooseUsername = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, uniqueUsername } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!location?.state?.googleAuth) {
      navigate("/");
    }
  }, [location?.state?.googleAuth, navigate]);

  // State Handling Section
  const initialState = {
    username: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [usernameAlphabet, setUsernameAlphabet] = useState("default");
  const [usernameSpecialChar, setUsernameSpecialChar] = useState("default");
  const [usernameSpace, setUsernameSpace] = useState("default");
  const [usernameLength, setUsernameLength] = useState("default");

  // Form Handling Section
  const handleInputChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    // Username Validations
    if (event.target.name === "username") {
      const username = event.target.value.toString();
      if (username.trim().length > 0) {
        if (/[a-zA-Z0-9]/.test(username)) {
          setUsernameAlphabet("checked");
        } else {
          setUsernameAlphabet("error");
        }
        if (username.includes(" ")) {
          setUsernameSpace("error");
        } else {
          setUsernameSpace("checked");
        }
        if (username.length >= 3 && username.length <= 20) {
          setUsernameLength("checked");
        } else {
          setUsernameLength("error");
        }
        if (/^[a-zA-Z0-9_]*$/.test(username)) {
          setUsernameSpecialChar("checked");
        } else {
          setUsernameSpecialChar("error");
        }

        dispatch(verifyUsername(username));
      } else {
        setUsernameAlphabet("default");
        setUsernameSpace("default");
        setUsernameLength("default");
        setUsernameSpecialChar("default");
      }
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { username } = formData;

    if (!username?.trim()) {
      return toast.error("Username cannot be empty");
    }

    if (!validateUsername(username)) {
      return toast.error("Please enter a valid username");
    }

    const apiData = {
      username,
    };
    const result = await dispatch(chooseUsername(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
      await dispatch(getSingleUser(user._id));
      setFormData(initialState);
    }
  };

  // JSX Componenet Return Section
  return (
    <div>
      <Banner message={BANNER_TEXT_SIGN_UP} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">Set Username</h1>
          <form onSubmit={handleFormSubmit} className="form__tag">
            <section className="form__label-container">
              <label htmlFor="signup__username" className="form__label">
                Choose Username <span className="form__label-required">*</span>
              </label>
              {formData.username.length >= 3 &&
                usernameAlphabet === "checked" &&
                usernameSpace === "checked" &&
                usernameLength === "checked" &&
                usernameSpecialChar === "checked" && (
                  <p className="form__label">
                    {uniqueUsername ? "✅ Unique" : "❌ Already Taken"}
                  </p>
                )}
            </section>
            <input
              type="text"
              id="signup__username"
              className="form__input form__input-primary"
              name="username"
              value={formData.username?.toLowerCase()}
              onChange={handleInputChange}
              placeholder="🌟 craft a unique digital identity 🎭"
              required
            />
            <div
              className={`form__validation mb-2 form__validation-${
                usernameAlphabet === "checked" &&
                usernameSpace === "checked" &&
                usernameLength === "checked" &&
                usernameSpecialChar === "checked"
                  ? "green"
                  : "red"
              }`}>
              <section className="form__validation-section">
                <span className="form__validation-icon">
                  {usernameAlphabet === "default" && <LuCircleDashed />}
                  {usernameAlphabet === "checked" && <FaCheckCircle />}
                  {usernameAlphabet === "error" && <FaExclamationCircle />}
                </span>{" "}
                <span className="form__validation-text">
                  Stick to using of alphabets and numbers.
                </span>
              </section>
              <section className="form__validation-section">
                <span className="form__validation-icon">
                  {usernameSpace === "default" && <LuCircleDashed />}
                  {usernameSpace === "checked" && <FaCheckCircle />}
                  {usernameSpace === "error" && <FaExclamationCircle />}
                </span>{" "}
                <span className="form__validation-text">
                  Omit spaces between your characters.
                </span>
              </section>
              <section className="form__validation-section">
                <span className="form__validation-icon">
                  {usernameSpecialChar === "default" && <LuCircleDashed />}
                  {usernameSpecialChar === "checked" && <FaCheckCircle />}
                  {usernameSpecialChar === "error" && <FaExclamationCircle />}
                </span>{" "}
                <span className="form__validation-text">
                  Utilize only underscores (_) as specials.
                </span>
              </section>
              <section className="form__validation-section">
                <span className="form__validation-icon">
                  {usernameLength === "default" && <LuCircleDashed />}
                  {usernameLength === "checked" && <FaCheckCircle />}
                  {usernameLength === "error" && <FaExclamationCircle />}
                </span>{" "}
                <span className="form__validation-text">
                  Ensure length from 3 - 20 characters.
                </span>
              </section>
            </div>
            <button className="form__button form__button-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export Section
export { ChooseUsername };
