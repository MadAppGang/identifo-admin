import { notEmptyRule } from '~/utils/validation';

const rules = {
  name: [notEmptyRule('Application name should not be empty')],
  type: [notEmptyRule('Application type should be selected')],
};

export default rules;
