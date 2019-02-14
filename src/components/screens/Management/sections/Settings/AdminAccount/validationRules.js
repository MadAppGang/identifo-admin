const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(value) {
  if (!value) {
    return 'Email should not be empty';
  }

  if (!emailRegExp.test(value)) {
    return 'Email format is invalid';
  }

  return '';
}

function validatePassword(value) {
  if (!value) {
    return 'Password should not be empty';
  }

  return '';
}

function validateConfirmPassword(value, password) {
  if (value !== password) {
    return 'Passwords do not match';
  }

  return '';
}

function validateForm(form = {}) {
  const { email, password, confirmPassword, editPassword } = form;

  return {
    email: validateEmail(email),
    password: editPassword ? validatePassword(password) : '',
    confirmPassword: editPassword
      ? validateConfirmPassword(confirmPassword, password)
      : '',
  };
}

const rules = {
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  all: validateForm,
};

export default rules;
