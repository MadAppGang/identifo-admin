export const serializeExternalServicesSettings = settings => ({
  mail_service: settings.mailService,
  sms_service: {
    type: settings.smsService.type,
    account_sid: settings.smsService.accountSid,
    auth_token: settings.smsService.authToken,
    service_sid: settings.smsService.serviceSid,
  },
});

export const deserializeExternalServicesSettings = settings => ({
  mailService: settings.mail_service,
  smsService: {
    type: settings.sms_service.type,
    accountSid: settings.sms_service.account_sid,
    authToken: settings.sms_service.auth_token,
    serviceSid: settings.sms_service.service_sid,
  },
});
