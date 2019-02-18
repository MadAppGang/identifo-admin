import { notEmptyRule } from '~/utils/validation';

const rules = {
  type: [notEmptyRule('Type should not be empty')],
  region: [notEmptyRule('Region should not be empty')],
  name: [notEmptyRule('Name should not be empty')],
  endpoint: [notEmptyRule('Endpoint should not be empty')],
};

export default rules;
