import {
  applyRules, hasError, matches, notEmpty, emailFormat,
} from '@dprovodnikov/validation';

const onlyDigits = message => (value) => {
  if (!value) {
    return '';
  }

  if (!Number(value)) {
    return message;
  }

  return Number.isNaN(Number(value)) ? message : '';
};

export const adminAccountFormRules = {
  email: [
    notEmpty('Email should not be empty'),
    emailFormat('Email format is invalid'),
  ],
  password: [
    notEmpty('Password should not be empty'),
  ],
  confirmPassword: [
    notEmpty('You should confirm password'),
    matches('password', 'Passwords do not match'),
  ],
};

export const sessionStorageFormRules = {
  sessionDuration: [
    notEmpty('You have to specify session duration (in seconds)'),
    onlyDigits('Duration should be specified in seconds'),
  ],
  address: [
    notEmpty('You have to specify address'),
  ],
  password: [
    notEmpty('You have to specify password'),
  ],
  db: [
    notEmpty('You have to specify db of type int'),
    onlyDigits('Db should be of type int'),
  ],
  region: [
    notEmpty('You have to specify region'),
  ],
};

const validate = applyRules(adminAccountFormRules);

export const validateAccountForm = (values) => {
  const omitPasswords = !values.password && !values.confirmPassword;
  const errors = validate('all', values, {
    omit: omitPasswords ? ['password', 'confirmPassword'] : [],
  });

  return hasError(errors) ? errors : {};
};
