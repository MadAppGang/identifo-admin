export const serializeConfigurationStorageSettings = settings => ({
  type: settings.type,
  settings_key: settings.settingsKey,
  endpoints: settings.endpoints,
  region: settings.region,
});

export const deserializeConfigurationStorageSettings = settings => ({
  type: settings.type,
  settingsKey: settings.settings_key,
  endpoints: settings.endpoints,
  region: settings.region,
});
