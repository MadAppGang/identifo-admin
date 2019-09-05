import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { Select, Option } from '~/components/shared/Select';

const types = {
  LOCAL: 'local',
  S3: 's3',
};

const StaticFilesGeneralForm = (props) => {
  const { loading, error, settings, onSubmit } = props;

  const [type, setType] = useState(settings.type || '');
  const [serverConfigPath, setServerConfigPath] = useState(settings.serverConfigPath || '');
  const [staticFilesLocation, setStaticFilesLocation] = useState(settings.staticFilesLocation || '');
  const [region, setRegion] = useState(settings.region || '');

  useEffect(() => {
    if (!settings) return;

    setServerConfigPath(settings.serverConfigPath);
    setStaticFilesLocation(settings.staticFilesLocation);
    setType(settings.type);
    setRegion(settings.region);
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(settings, {
      serverConfigPath,
      staticFilesLocation,
      type,
      region,
    }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="Storage Type">
        <Select
          value={type}
          onChange={setType}
          placeholder="Select storage type"
        >
          <Option value={types.LOCAL} title="Local" />
          <Option value={types.S3} title="S3" />
        </Select>
      </Field>

      <Field label="Server Config Path">
        <Input
          value={serverConfigPath}
          autoComplete="off"
          placeholder="Specify path to server config"
          onValue={setServerConfigPath}
          disabled={loading}
        />
      </Field>

      <Field label="Static Files Location">
        <Input
          value={staticFilesLocation}
          autoComplete="off"
          placeholder="Specify path to static folder"
          onValue={setStaticFilesLocation}
          disabled={loading}
        />
      </Field>

      {type === types.S3 && (
        <Field label="Region">
          <Input
            value={region}
            autoComplete="off"
            placeholder="Specify s3 region"
            onValue={setRegion}
            disabled={loading}
          />
        </Field>
      )}

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
