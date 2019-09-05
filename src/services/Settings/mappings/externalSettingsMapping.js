export const serializeExternalServicesSettings = settings => ({
  email_service: {
    type: settings.emailService.type,
    domain: settings.emailService.domain, 
    private_key: settings.emailService.privateKey,
    public_key: settings.emailService.publicKey,
    sender: settings.emailService.sender,
    region: settings.emailService.region,
  },
  sms_service: {
    type: settings.smsService.type,
    account_sid: settings.smsService.accountSid,
    auth_token: settings.smsService.authToken,
    service_sid: settings.smsService.serviceSid,
  },
});

export const deserializeExternalServicesSettings = settings => ({
  emailService: {
    type: settings.email_service.type,
    domain: settings.email_service.domain,
    privateKey: settings.email_service.private_key,
    publicKey: settings.email_service.public_key,
    sender: settings.email_service.sender,
    region: settings.email_service.region,
  },
  smsService: {
    type: settings.sms_service.type,
    accountSid: settings.sms_service.account_sid,
    authToken: settings.sms_service.auth_token,
    serviceSid: settings.sms_service.service_sid,
  },
});
