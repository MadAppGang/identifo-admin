const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validate = (field, ...args) => {
  const rules = {
    email(value) {
      if (!value) {
        return 'Email should not be empty';
      }

      if (!emailRegExp.test(value)) {
        return 'Email format is invalid';
      }

      return '';
    },

    password(value) {
      if (!value) {
        return 'Password should not be empty';
      }

      return '';
    },

    confirmPassword(value, password) {
      if (value !== password) {
        return 'Passwords do not match';
      }

      return '';
    },
  };

  return rules[field](...args);
};

export default validate;
