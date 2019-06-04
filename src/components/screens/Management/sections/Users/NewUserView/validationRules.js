import { matchesRule, notEmptyRule, emailFormatRule } from '~/utils/validation';


const rules = {
  email: [
    notEmptyRule('Email should not be empty'),
    emailFormatRule('Email format is invalid'),
  ],
  username: [notEmptyRule('Username should not be empty')],
  password: [notEmptyRule('Password should not be empty')],
  confirmPassword: [
    notEmptyRule('You should confirm password'),
    matchesRule('password', 'Passwords do not match'),
  ],
};

export default rules;
