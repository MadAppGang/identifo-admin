import { emailFormatRule, notEmptyRule } from '~/utils/validation';

function passwordsMatchRule(value, fields) {
  if (value !== fields.password) {
    return 'Passwords do not match';
  }

  return '';
}

const rules = {
  email: [
    notEmptyRule('Email should not be empty'),
    emailFormatRule('Email format is invalid'),
  ],
  password: [
    notEmptyRule('Password should not be empty'),
  ],
  confirmPassword: [
    notEmptyRule('You should confirm password'),
    passwordsMatchRule,
  ],
};

export default rules;
