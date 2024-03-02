const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validateUsername = (username) => {
  return username.match(/^[a-z0-9_]{3,20}$/);
};

const validatePassword = (password) => {
  if (password.search(/[a-z]/) < 0) {
    return false;
  }
  if (password.search(/[A-Z]/) < 0) {
    return false;
  }
  if (password.search(/[0-9]/) < 0) {
    return false;
  }
  return password.match(/^[A-Za-z0-9._!@#$%&*?]{8,30}$/);
};

const generateRandomOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateRandomPassword = () => {
  let randomPassword = "";
  const set =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_!@#$%&*?0123456789";
  const passwordLength = Math.floor(Math.random() * 42) + 8;

  for (let index = 0; index < passwordLength; index++) {
    const randomNumber = Math.floor(Math.random() * set.length);
    randomPassword += set[randomNumber];
  }

  if (
    randomPassword.trim().length >= 8 &&
    randomPassword.length <= 50 &&
    /[A-Z]/.test(randomPassword) &&
    /[a-z]/.test(randomPassword) &&
    /[0-9]/.test(randomPassword) &&
    /[_!@#$%&*?]/.test(randomPassword)
  ) {
    return randomPassword;
  } else {
    generateRandomPassword();
  }
};

export {
  validateEmail,
  validateUsername,
  validatePassword,
  generateRandomOTP,
  generateRandomPassword,
};
