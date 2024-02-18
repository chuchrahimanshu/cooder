import React, { useEffect, useState } from "react";
import { Banner } from "../../components";
import { BANNER_TEXT_SIGN_UP, BUTTON_TEXT_SIGN_UP } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyUsername } from "../../redux/auth/auth.slice";
import { toast } from "react-toastify";
import GoogleLogo from "../../assets/images/logo/Google.png";
import GithubLogo from "../../assets/images/logo/Github.png";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

const SignUp = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, uniqueUsername } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // State Handling Section
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [formSection, setFormSection] = useState("default");

  // Form Handling Section
  const handleInputChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, email, username, password, confirmPassword } =
      formData;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !username?.trim() ||
      !password?.trim() ||
      !confirmPassword?.trim()
    ) {
      return toast.error("All fields are mandatory");
    }
  };

  // JSX Component Return Section
  return (
    <div>
      <Banner message={BANNER_TEXT_SIGN_UP} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">Sign Up</h1>

          {formSection === "default" && (
            <>
              <p className="form__text-primary mb-1 text-red">
                **Choose Authentication Method
              </p>
              <button
                className="form__button form__button-primary"
                onClick={() => {
                  setFormSection("local");
                }}>
                🏠 Local Authentication 🛡️
              </button>
              <button
                className="form__button form__button-primary"
                onClick={() => {
                  setFormSection("social");
                }}>
                🌏 Social Authentication 🌟
              </button>
            </>
          )}

          {formSection === "social" && (
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
          )}

          {formSection === "local" && (
            <form onSubmit={handleFormSubmit} className="form__tag">
              <section className="form__input-container">
                <section className="form__input-subcontainer">
                  <label htmlFor="signup__firstName" className="form__label">
                    First Name <span className="form__label-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="signup__firstName"
                    className="form__input form__input-secondary"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Personal Identifier"
                    required
                  />
                </section>
                <section className="form__input-subcontainer">
                  <label htmlFor="signup__lastName" className="form__label">
                    Last Name <span className="form__label-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="signup__lastName"
                    className="form__input form__input-secondary"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Family Identifier"
                    required
                  />
                </section>
              </section>
              <label htmlFor="signup__email" className="form__label">
                Email Address <span className="form__label-required">*</span>
              </label>
              <input
                type="text"
                id="signup__email"
                className="form__input form__input-primary"
                name="email"
                value={formData.email?.toLowerCase()}
                onChange={handleInputChange}
                placeholder="🧙‍♂️ wizards ensure your email privacy 🛡️"
                required
              />
              <label htmlFor="signup__username" className="form__label">
                Username <span className="form__label-required">*</span>
              </label>
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
              <section className="form__input-container">
                <section className="form__input-subcontainer">
                  <label htmlFor="signup__password" className="form__label">
                    Password <span className="form__label-required">*</span>
                  </label>
                  <input
                    type="password"
                    id="signup__password"
                    className="form__input form__input-secondary"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Developer's Key"
                    required
                  />
                </section>
                <section className="form__input-subcontainer">
                  <label
                    htmlFor="signup__confirmPassword"
                    className="form__label">
                    Confirm Password{" "}
                    <span className="form__label-required">*</span>
                  </label>
                  <input
                    type="password"
                    id="signup__confirmPassword"
                    className="form__input form__input-secondary"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Key Confirmation"
                    required
                  />
                </section>
              </section>
              <button
                className="form__button form__button-primary"
                type="submit">
                {BUTTON_TEXT_SIGN_UP}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export { SignUp };
