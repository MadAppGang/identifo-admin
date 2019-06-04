import { matches, notEmpty, emailFormat } from '@dprovodnikov/validation';

const rules = {
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

export default rules;
