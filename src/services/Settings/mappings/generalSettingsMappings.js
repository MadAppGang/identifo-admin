export const serializeGeneralSettings = settings => ({
  host: settings.host,
  issuer: settings.issuer,
  algorithm: settings.algorithm,
  private_key_path: settings.privateKeyPath,
  public_key_path: settings.publicKeyPath,
});

export const deserializeGeneralSettings = settings => ({
  host: settings.host,
  issuer: settings.issuer,
  algorithm: settings.algorithm,
  privateKeyPath: settings.private_key_path,
  publicKeyPath: settings.public_key_path,
});
