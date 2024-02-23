export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateUsername = (username) => {
  return username.match(/^[a-z0-9_]{3,20}$/);
};

export const validatePassword = (password) => {
  if (password.search(/[a-z]/) < 0) {
    return false;
  }
  if (password.search(/[A-Z]/) < 0) {
    return false;
  }
  if (password.search(/[0-9]/) < 0) {
    return false;
  }
  return password.match(/^[A-Za-z0-9._!@#$%Z&*?]{8,30}$/);
};
