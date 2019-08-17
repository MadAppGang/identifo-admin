import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';

const StaticFilesGeneralForm = (props) => {
  const { loading, error, settings, onSubmit } = props;

  const [serverConfigPath, setServerConfigPath] = useState(settings.serverConfigPath || '');
  const [staticFolderPath, setStaticFolderPath] = useState(settings.staticFolderPath || '');
  const [adminPanelBuildPath, setAdminPanelBuildPath] = useState(settings.adminPanelBuildPath || '');

  useEffect(() => {
    if (!settings) return;

    setServerConfigPath(settings.serverConfigPath);
    setStaticFolderPath(settings.staticFolderPath);
    setAdminPanelBuildPath(settings.adminPanelBuildPath);
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(settings, {
      serverConfigPath,
      staticFolderPath,
      adminPanelBuildPath,
    }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="Server Config Path">
        <Input
          value={serverConfigPath}
          autoComplete="off"
          placeholder="Specify path to server config"
          onChange={e => setServerConfigPath(e.target.value)}
          disabled={loading}
        />
      </Field>

      <Field label="Static Folder Path">
        <Input
          value={staticFolderPath}
          autoComplete="off"
          placeholder="Specify path to static folder"
          onChange={e => setStaticFolderPath(e.target.value)}
          disabled={loading}
        />
      </Field>

      <Field label="Admin Panel Build Path">
        <Input
          value={adminPanelBuildPath}
          autoComplete="off"
          placeholder="Specify path to admin panel build folder"
          onChange={e => setAdminPanelBuildPath(e.target.value)}
          disabled={loading}
        />
      </Field>

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          Icon={loading ? LoadingIcon : SaveIcon}
          disabled={loading}
          error={!loading && !!error}
        >
          Save Changes
        </Button>
      </footer>
    </form>
  );
};

export default StaticFilesGeneralForm;
