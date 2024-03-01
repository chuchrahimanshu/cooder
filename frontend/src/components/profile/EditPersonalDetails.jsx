// Import Section
import React, { useState } from "react";
import { useSelector } from "react-redux";

const EditPersonalDetails = () => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const initialState = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    avatar: user?.avatar,
    cover: user?.cover,
  };
  const [formData, setFormData] = useState(initialState);
  return (
    <div className="edit-profile-form__container">
      <h2 className="edit-profile-form__heading">Personal Details</h2>
      <form className="form__tag edit-profile-form">
        <section className="form__section">
          <section className="form__section-col">
            <label htmlFor="edit-profile__firstName" className="form__label">
              First Name <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="edit-profile__firstName"
              className="form__input form__input-text"
              name="firstName"
              required
            />
          </section>
          <section className="form__section-col">
            <label htmlFor="edit-profile__lastName" className="form__label">
              Last Name <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="edit-profile__lastName"
              className="form__input form__input-text"
              name="lastName"
              required
            />
          </section>
        </section>
        <section className="form__section">
          <section className="form__section-col">
            <label htmlFor="edit-profile__email" className="form__label">
              Email Address <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="edit-profile__email"
              className="form__input form__input-text"
              name="email"
              required
            />
          </section>
          <section className="form__section-col">
            <label htmlFor="edit-profile__mobile" className="form__label">
              Mobile Number <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="edit-profile__mobile"
              className="form__input form__input-text"
              name="mobile"
              required
            />
          </section>
        </section>
        <section className="form__section">
          <section className="form__section-col">
            <label htmlFor="edit-profile__avatar" className="form__label">
              Set Avatar <span className="form__label-required">*</span>
            </label>
            <input
              type="file"
              id="edit-profile__avatar"
              className="form__input form__input-text"
              name="avatar"
              required
            />
          </section>
          <section className="form__section-col">
            <label htmlFor="edit-profile__cover" className="form__label">
              Cover Image <span className="form__label-required">*</span>
            </label>
            <input
              type="file"
              id="edit-profile__cover"
              className="form__input form__input-text"
              name="cover"
              required
            />
          </section>
        </section>
        <section className="form__section">
          <section className="form__section-col">
            <label
              htmlFor="edit-profile__spokenLanguages"
              className="form__label">
              Spoken Languages <span className="form__label-required">*</span>
            </label>
            <input
              type="text"
              id="edit-profile__spokenLanguages"
              className="form__input form__input-text"
              name="spokenLanguages"
              required
            />
          </section>
          <section className="form__section-col">
            <label htmlFor="edit-profile__dateOfBirth" className="form__label">
              Date Of Birth <span className="form__label-required">*</span>
            </label>
            <input
              type="date"
              id="edit-profile__dateOfBirth"
              className="form__input form__input-text"
              name="dateOfBirth"
              required
            />
          </section>
        </section>
        <button
          className="form__button form__button-secondary mt-1"
          type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export { EditPersonalDetails };
