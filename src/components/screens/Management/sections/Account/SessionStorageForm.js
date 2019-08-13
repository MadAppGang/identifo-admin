import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import * as Validation from '@dprovodnikov/validation';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { Select, Option } from '~/components/shared/Select';
import { sessionStorageFormRules } from './validationRules';

const MEMORY_STORAGE = 'memory';
const REDIS_STORAGE = 'redis';
const DYNAMODB_STORAGE = 'dynamodb';
const DEFAULT_SESSION_DURATION = 300;

const validate = Validation.applyRules(sessionStorageFormRules);

const foreignFieldsByStorageType = {
  [MEMORY_STORAGE]: ['address', 'password', 'db', 'region', 'endpoint'],
  [REDIS_STORAGE]: ['region', 'endpoint'],
  [DYNAMODB_STORAGE]: ['address', 'password', 'db'],
};

const SessionStorageForm = (props) => {
  const { loading, settings, error, onSubmit } = props;

  const [storageType, setStorageType] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [db, setDb] = useState('');
  const [region, setRegion] = useState('');
  const [endpoint, setEndpoint] = useState('');

  const [validation, setValidation] = useState({
    sessionDuration: '',
    address: '',
    password: '',
    db: '',
    region: '',
    endpoint: '',
  });

  useEffect(() => {
    if (!settings) return;
    if (settings.type) setStorageType(settings.type);
    if (settings.sessionDuration) setSessionDuration(settings.sessionDuration.toString());
    if (settings.address) setAddress(settings.address);
    if (settings.password) setPassword(settings.password);
    if (settings.db) setDb(settings.db);
    if (settings.region) setRegion(settings.region);
    if (settings.endpoint) setEndpoint(settings.endpoint);
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const report = validate('all', {
      sessionDuration, address, password, db, region, endpoint,
    }, {
      omit: foreignFieldsByStorageType[storageType],
    });

    if (Validation.hasError(report)) {
      setValidation(report);
      return;
    }

    onSubmit({
      type: storageType,
      sessionDuration: Number(sessionDuration) || DEFAULT_SESSION_DURATION,
      address,
      db: Number(db) || undefined,
      region,
      endpoint,
    });
  };

  const handleInput = ({ target }, setValue) => {
    const { name: field, value } = target;

    if (field in validation) {
      setValidation(update(validation, { [field]: '' }));
    }
    setValue(value);
  };

  const handleBlur = ({ target }) => {
    const { name: field, value } = target;
    setValidation(update(validation, {
      [field]: validate(field, { [field]: value }),
    }));
  };

  return (
    <form className="iap-settings-form" onSubmit={handleSubmit}>
      {!!error && (
        <FormErrorMessage error={error} />
      )}

      <Field label="Storage Type">
        <Select
          value={storageType}
          disabled={loading}
          onChange={setStorageType}
          placeholder="Select Storage Type"
          errorMessage={validation.storageType}
        >
          <Option value={MEMORY_STORAGE} title="Memory" />
          <Option value={REDIS_STORAGE} title="Redis" />
          <Option value={DYNAMODB_STORAGE} title="DynamoDB" />
        </Select>
      </Field>

      <Field label="Session Duration">
        <Input
          name="sessionDuration"
          value={sessionDuration}
          placeholder="Specify session duration in seconds"
          onChange={e => handleInput(e, setSessionDuration)}
          onBlur={handleBlur}
          disabled={loading}
          errorMessage={validation.sessionDuration}
        />
      </Field>

      {storageType === REDIS_STORAGE && (
        <Field label="Address">
          <Input
            name="address"
            value={address}
            placeholder="Specify address"
            onChange={e => handleInput(e, setAddress)}
            onBlur={handleBlur}
            disabled={loading}
            errorMessage={validation.address}
          />
        </Field>
      )}

      {storageType === REDIS_STORAGE && (
        <Field label="Password">
          <Input
            name="password"
            value={password}
            disabled={loading}
            placeholder="Specify password"
            onChange={e => handleInput(e, setPassword)}
            onBlur={handleBlur}
            errorMessage={validation.password}
          />
        </Field>
      )}

      {storageType === REDIS_STORAGE && (
        <Field label="DB">
          <Input
            name="db"
            value={db}
            disabled={loading}
            placeholder="Specify DB"
            onChange={e => handleInput(e, setDb)}
            onBlur={handleBlur}
            errorMessage={validation.db}
          />
        </Field>
      )}

      {storageType === DYNAMODB_STORAGE && (
        <Field label="Region">
          <Input
            name="region"
            value={region}
            placeholder="Specify region"
            disabled={loading}
            onChange={e => handleInput(e, setRegion)}
            onBlur={handleBlur}
            errorMessage={validation.region}
          />
        </Field>
      )}

      {storageType === DYNAMODB_STORAGE && (
        <Field label="Endpoint">
          <Input
            name="endpoint"
            value={endpoint}
            placeholder="Specify endpoint"
            disabled={loading}
            onChange={e => handleInput(e, setEndpoint)}
            onBlur={handleBlur}
            errorMessage={validation.endpoint}
          />
        </Field>
      )}

      <footer className="iap-settings-form__footer">
        <Button
          type="submit"
          error={!loading && error}
          disabled={loading || !storageType}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save changes
        </Button>
      </footer>
    </form>
  );
};

export default SessionStorageForm;
