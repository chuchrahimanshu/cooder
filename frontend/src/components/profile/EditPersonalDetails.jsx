// Import Section
import React, { useState } from "react";
import { useSelector } from "react-redux";

const EditPersonalDetails = () => {
  // Hooks Configuration
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const initialState = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    avatar: user?.avatar,
    cover: user?.cover,
    spokenLanguages: user?.spokenLanguages,
  };
  const [formData, setFormData] = useState(initialState);
  const [toggleDisabled, setToggleDisabled] = useState(initialState);

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = (event) => {};
  return (
    <div className="profile-form__container">
      <h2 className={`profile-form__heading ${theme}`}>Personal Details</h2>
      <form className="profile-form" onSubmit={handleFormSubmit}>
        <section className="profile-form__section">
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__firstName">
              First Name{" "}
              <span className="profile-form__label--required">*</span>
            </label>
            <input
              type="text"
              id="profile-form__firstName"
              className={`profile-form__input ${theme}`}
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              placeholder="Enter your First Name"
              required
            />
          </section>
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__lastName">
              Last Name <span className="profile-form__label--required">*</span>
            </label>
            <input
              type="text"
              id="profile-form__lastName"
              className={`profile-form__input ${theme}`}
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              placeholder="Enter your Last Name"
              required
            />
          </section>
        </section>
        <section className="profile-form__section">
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__email">
              Email Address{" "}
              <span className="profile-form__label--required">*</span>
            </label>
            <input
              type="text"
              id="profile-form__email"
              className={`profile-form__input ${theme}`}
              name="email"
              disabled
              value={formData?.email}
              onChange={handleInputChange}
              placeholder="Enter your Email Address"
              required
              style={{ cursor: "not-allowed" }}
            />
          </section>
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__mobileNumber">
              Mobile Number{" "}
              <span className="profile-form__label--required">*</span>
            </label>
            <input
              type="number"
              id="profile-form__mobileNumber"
              className={`profile-form__input ${theme}`}
              name="mobileNumber"
              maxLength={10}
              minLength={10}
              value={formData?.mobileNumber}
              onChange={handleInputChange}
              placeholder="Enter your Mobile Number"
              required
            />
          </section>
        </section>
        <section className="profile-form__section">
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__avatar">
              Avatar <span className="profile-form__label--required">*</span>
            </label>
            <input
              type="file"
              id="profile-form__avatar"
              className={`profile-form__input ${theme}`}
              name="avatar"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
          </section>
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__cover">
              Cover Image{" "}
              <span className="profile-form__label--required">*</span>
            </label>
            <input
              type="file"
              id="profile-form__cover"
              className={`profile-form__input ${theme}`}
              name="cover"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
          </section>
        </section>
        <section className="profile-form__section">
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__spokenLanguages">
              Spoken Languages{" "}
              <span className="profile-form__label--required">*</span>
            </label>
            <input
              type="text"
              id="profile-form__spokenLanguages"
              className={`profile-form__input ${theme}`}
              name="spokenLanguages"
              value={formData.spokenLanguages}
              onChange={handleInputChange}
              required
            />
          </section>
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__dateOfBirth">
              Date of Birth{" "}
              <span className="profile-form__label--required">*</span>
            </label>
            <input
              type="text"
              id="profile-form__dateOfBirth"
              className={`profile-form__input ${theme}`}
              name="dateOfBirth"
              accept="image/*"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="Enter your Date of Birth"
              required
            />
          </section>
        </section>
        <button
          className={`profile-form__button ${theme}`}
          type="submit"
          disabled={toggleDisabled}>
          Update ✨
        </button>
      </form>
    </div>
  );
};

// Export Section
export { EditPersonalDetails };
