import { notEmpty } from '@dprovodnikov/validation';

export const smsServiceValidationRules = {
  type: [notEmpty('You should select sms service')],
  accountSid: [notEmpty('Account SID cannot be empty')],
  authToken: [notEmpty('Token cannot be empty')],
  serviceSid: [notEmpty('Service SID cannot be empty')],
};
