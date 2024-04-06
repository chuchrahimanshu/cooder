// This "Banner" component is used only for Auth Module.

// JSX Component Function
const Banner = ({ message }) => {
  return (
    <div className="auth-banner__container">
      <section className="auth-banner">
        <p className="auth-banner__text">{message}</p>
      </section>
    </div>
  );
};

// Export Section
export { Banner };
