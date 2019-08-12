export const serializeLoginSettings = settings => ({
  login_with: settings.loginWith,
  tfa_type: settings.tfaType,
});

export const deserializeLoginSettings = settings => ({
  loginWith: {
    username: !!settings.login_with.username,
    phone: !!settings.login_with.phone,
    federated: !!settings.login_with.federated,
  },
  tfaType: settings.tfa_type || '',
});
