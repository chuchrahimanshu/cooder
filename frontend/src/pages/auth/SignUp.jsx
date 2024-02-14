import React, { useEffect, useState } from "react";
import { Banner } from "../../components";
import { BANNER_TEXT_SIGN_UP, BUTTON_TEXT_SIGN_UP } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/images/logo/Google.png";
import GithubLogo from "../../assets/images/logo/Github.png";
import { verifyUsername } from "../../redux/auth/auth.slice";

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

  // Form Handling Section
  const handleInputChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "username") {
      await dispatch(verifyUsername(event.target.value));
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  // JSX Component Return Section
  return (
    <div>
      <Banner message={BANNER_TEXT_SIGN_UP} />
      <div className="form__container">
        <div className="form">
          <h1 className="form__heading">Sign Up</h1>

          {/* Local Authentication */}
          <form onSubmit={handleFormSubmit} className="form__tag">
            <section className="form__parallel">
              <section className="form__parallel-style">
                <label htmlFor="signup__firstName" className="form__label">
                  First Name <span className="form__label-required">*</span>
                </label>
                <input
                  type="text"
                  id="signup__firstName"
                  className="form__input form__input-text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter First Name"
                  required
                />
              </section>
              <section className="form__parallel-style">
                <label htmlFor="signup__lastName" className="form__label">
                  Last Name <span className="form__label-required">*</span>
                </label>
                <input
                  type="text"
                  id="signup__lastName"
                  className="form__input form__input-text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter Last Name"
                  required
                />
              </section>
            </section>
            <section className="form__parallel">
              <section className="form__parallel-style">
                <label htmlFor="signup__email" className="form__label">
                  Email Address <span className="form__label-required">*</span>
                </label>
                <input
                  type="text"
                  id="signup__email"
                  className="form__input form__input-text"
                  name="email"
                  value={formData.email?.toLowerCase()}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address"
                  required
                />
              </section>
              <section className="form__parallel-style">
                <section className="form__label-flex">
                  <label htmlFor="signup__username" className="form__label">
                    Username <span className="form__label-required">*</span>
                  </label>
                  {uniqueUsername === false && formData.username && (
                    <p className="form__label">Already Taken ❌</p>
                  )}
                  {uniqueUsername === true && (
                    <p className="form__label">Unique ✅</p>
                  )}
                  {uniqueUsername == null && formData.username && (
                    <p className="form__label">Invalid Username ❌</p>
                  )}
                </section>
                <input
                  type="text"
                  id="signup__username"
                  className="form__input form__input-text"
                  name="username"
                  value={formData.username?.toLowerCase()}
                  onChange={handleInputChange}
                  placeholder="Enter Username"
                  required
                />
              </section>
            </section>
            <section className="form__parallel">
              <section className="form__parallel-style">
                <label htmlFor="signup__password" className="form__label">
                  Password <span className="form__label-required">*</span>
                </label>
                <input
                  type="password"
                  id="signup__password"
                  className="form__input form__input-text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  required
                />
              </section>
              <section className="form__parallel-style">
                <section className="form__label-flex">
                  <label
                    htmlFor="signup__confirmPassword"
                    className="form__label">
                    Confirm Password{" "}
                    <span className="form__label-required">*</span>
                  </label>
                  {formData.password.length > 0 &&
                    (formData.password === formData.confirmPassword ? (
                      <p className="form__label">✅</p>
                    ) : (
                      <p className="form__label">❌</p>
                    ))}
                </section>
                <input
                  type="password"
                  id="signup__confirmPassword"
                  className="form__input form__input-text"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Enter Confirm Password"
                  required
                />
              </section>
            </section>

            <button className="form__button" type="submit">
              {BUTTON_TEXT_SIGN_UP}
            </button>
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
    </div>
  );
};

export { SignUp };
