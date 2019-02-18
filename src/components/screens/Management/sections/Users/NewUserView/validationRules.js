import { notEmptyRule, emailFormatRule } from '~/utils/validation';

const matchesRule = (comparisonField, message) => (value, fields) => {
  if (value !== fields[comparisonField]) {
    return message;
  }

  return '';
};

const rules = {
  email: [
    notEmptyRule('Email should not be empty'),
    emailFormatRule('Email format is invalid'),
  ],
  password: [notEmptyRule('Password should not be empty')],
  confirmPassword: [
    notEmptyRule('You should confirm password'),
    matchesRule('password', 'Passwords do not match'),
  ],
};

export default rules;
