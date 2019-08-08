import { notEmpty, urlFormat } from '@dprovodnikov/validation';

const redirectUrlRule = message => (value) => {
  if (!value) {
    return '';
  }

  return urlFormat(message)(value);
};

const onlyDigits = message => (value) => {
  if (!value) {
    return '';
  }

  if (!Number(value)) {
    return message;
  }

  return Number.isNaN(Number(value)) ? message : '';
};

const rules = {
  name: [notEmpty('Application name should not be empty')],
  type: [notEmpty('Application type should be selected')],
  redirectUrl: [
    redirectUrlRule('Url format is invalid. Make sure you include protocol.'),
  ],
  tokenLifespan: [
    onlyDigits('Token lifespan can only contain digits'),
  ],
};

export default rules;
