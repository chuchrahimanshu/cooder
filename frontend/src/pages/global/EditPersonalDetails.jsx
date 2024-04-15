// Import Section
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/user/user.slice";
import { getUserDetails } from "../../redux/auth/auth.slice";
import { MutatingDots } from "react-loader-spinner";

const EditPersonalDetails = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.username !== params?.id) {
      navigate("/");
    }
  }, [user, params, navigate]);

  // State Handling Section
  const initialState = {
    firstName: user?.firstName,
    username: user?.username,
    lastName: user?.lastName,
    email: user?.email,
    avatar: null,
    cover: null,
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileUpload = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { avatar, cover, email, firstName, lastName, username } = formData;

    if (
      (!firstName?.trim(), !lastName?.trim(), !email?.trim(), !username?.trim())
    ) {
      return toast.error("Please fill all fields");
    }

    const maxFileSize = 10 * 1024 * 1024;
    let data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);

    if (avatar !== null) {
      if (avatar.size > maxFileSize) {
        return toast.error("File size exceeds the limit of 10MB");
      }
      data.append("avatar", avatar);
    }

    if (cover !== null) {
      if (cover.size > maxFileSize) {
        return toast.error("File size exceeds the limit of 10MB");
      }
      data.append("cover", cover);
    }

    const apiData = {
      paramsData: user?._id,
      bodyData: data,
    };

    const result = await dispatch(updateUser(apiData));

    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(getUserDetails(user._id));
    }
    setLoading(false);
  };
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
              htmlFor="profile-form__username">
              Username <span className="profile-form__label--required">*</span>
            </label>
            <input
              type="text"
              id="profile-form__username"
              className={`profile-form__input ${theme}`}
              name="username"
              value={formData?.username}
              onChange={handleInputChange}
              placeholder="Enter your Username"
              disabled
              required
              style={{ cursor: "not-allowed" }}
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
              onChange={handleFileUpload}
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
              onChange={handleFileUpload}
              required
            />
          </section>
        </section>
        <section className="profile-form__button--loading mtop-1">
          <button
            className={`profile-form__button ${theme} mtop-2`}
            type="submit">
            {loading === true ? "Updating ✨" : "Update ✨"}
          </button>
          {loading === true && (
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color={theme === "light" ? "#111111" : "#ffffff"}
              secondaryColor={theme === "light" ? "#111111" : "#ffffff"}
              radius="12"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </section>
      </form>
    </div>
  );
};

// Export Section
export { EditPersonalDetails };
