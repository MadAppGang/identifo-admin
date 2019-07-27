import { notEmpty } from '@dprovodnikov/validation';

const urlFormat = message => (value) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  if (!regex.test(value)) {
    return message;
  }

  return '';
};

const redirectUrlRule = message => (value) => {
  if (!value) {
    return '';
  }

  return urlFormat(message)(value);
};

const rules = {
  name: [notEmpty('Application name should not be empty')],
  type: [notEmpty('Application type should be selected')],
  redirectUrl: [
    redirectUrlRule('Url format is invalid. Make sure you include protocol.'),
  ],
};

export default rules;
