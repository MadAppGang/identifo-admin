import { MONGO_DB, DYNAMO_DB } from './DatabaseDropdown';

function validateType(value) {
  if (!value) {
    return 'Type should not be empty';
  }

  return '';
}

function validateRegion(value) {
  if (!value) {
    return 'Region should not be empty';
  }

  return '';
}

function validateName(value) {
  if (!value) {
    return 'Name should not be empty';
  }

  return '';
}

function validateEndpoint(value) {
  if (!value) {
    return 'Endpoint should not be empty';
  }

  return '';
}

function validateForm(fields = {}) {
  const { type, region, name, endpoint } = fields;

  return {
    type: validateType(type),
    endpoint: validateEndpoint(endpoint),
    region: type === DYNAMO_DB ? validateRegion(region) : '',
    name: type === MONGO_DB ? validateName(name) : '',
  };
}

const rules = {
  type: validateType,
  region: validateRegion,
  name: validateName,
  endpoint: validateEndpoint,
  all: validateForm,
};

export default rules;
