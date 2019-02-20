import { notEmptyRule } from '~/utils/validation';

const rules = {
  name: [notEmptyRule('Application name should not be empty')],
};

export default rules;
