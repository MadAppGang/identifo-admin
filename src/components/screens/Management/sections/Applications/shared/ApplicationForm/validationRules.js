import { notEmpty } from '@dprovodnikov/validation';

const rules = {
  name: [notEmpty('Application name should not be empty')],
  type: [notEmpty('Application type should be selected')],
};

export default rules;
