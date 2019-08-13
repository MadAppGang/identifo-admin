export const serializeSessionStorageSettings = settings => ({
  type: settings.type,
  session_duration: settings.sessionDuration,
  address: settings.address,
  password: settings.password,
  db: settings.db,
  region: settings.region,
  endpoint: settings.endpoint,
});

export const deserializeSessionStorageSettings = settings => ({
  type: settings.type,
  sessionDuration: settings.session_duration,
  address: settings.address,
  password: settings.password,
  db: settings.db,
  region: settings.region,
  endpoint: settings.endpoint,
});
