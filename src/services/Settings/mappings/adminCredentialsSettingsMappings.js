export const serializeCredentialsSettings = settings => ({
  login_env_name: settings.loginEnvName,
  password_env_name: settings.passwordEnvName,
});

export const deserializeCredentialsSettings = settings => ({
  loginEnvName: settings.login_env_name,
  passwordEnvName: settings.password_env_name,
});
