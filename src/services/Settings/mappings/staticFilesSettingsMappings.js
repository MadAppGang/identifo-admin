export const serializeStaticFilesSettings = settings => ({
  server_config_path: settings.serverConfigPath,
  static_folder_path: settings.staticFolderPath,
  email_templates_path: settings.emailTempatesPath,
  email_template_names: {
    welcome: settings.emailTemplateNames.welcome,
    reset_password: settings.emailTemplateNames.resetPassword,
    invite: settings.emailTemplateNames.invite,
    verify: settings.emailTemplateNames.verify,
    tfa: settings.emailTemplateNames.tfa,
  },
  admin_panel_build_path: settings.adminPanelBuildPath,
});

export const deserializeStaticFilesSettings = settings => ({
  serverConfigPath: settings.server_config_path,
  staticFolderPath: settings.static_folder_path,
  emailTemplatesPath: settings.email_templates_path,
  emailTemplateNames: {
    welcome: settings.email_template_names.welcome,
    resetPassword: settings.email_template_names.reset_password,
    invite: settings.email_template_names.invite,
    verify: settings.email_template_names.verify,
    tfa: settings.email_template_names.tfa,
  },
  adminPanelBuildPath: settings.admin_panel_build_path,
});
