import {
  matches, notEmpty, emailFormat, longerThan, hasUpperLetter,
} from '@dprovodnikov/validation';

const rules = {
  username: [notEmpty('Username should not be empty')],
  email: [
    notEmpty('Email should not be empty'),
    emailFormat('Email format is invalid'),
  ],
  password: [
    notEmpty('Password should not be empty'),
    longerThan(6, 'Password should have length of at least six characters'),
    hasUpperLetter('Password should contain at least one uppercase letter'),
  ],
  confirmPassword: [
    notEmpty('You should confirm password'),
    matches('password', 'Passwords do not match'),
  ],
};

export default rules;
