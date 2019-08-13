import React, { useState } from 'react';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { Select, Option } from '~/components/shared/Select';

const MEMORY_STORAGE = 'memory';
const REDIS_STORAGE = 'redis';
const DYNAMONDB_STORAGE = 'dynamodb';

const SessionStorageForm = (props) => {
  const { loading, error } = props;

  const [storageType, setStorageType] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [db, setDb] = useState('');
  const [region, setRegion] = useState('');
  const [endpoint, setEndpoint] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
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
        >
          <Option value={MEMORY_STORAGE} title="Memory" />
          <Option value={REDIS_STORAGE} title="Redis" />
          <Option value={DYNAMONDB_STORAGE} title="DynamoDB" />
        </Select>
      </Field>

      <Field label="Session Duration">
        <Input
          value={sessionDuration}
          placeholder="Specify session duration in seconds"
          onChange={e => setSessionDuration(e.target.value)}
        />
      </Field>

      {storageType === REDIS_STORAGE && (
        <Field label="Address">
          <Input
            value={address}
            placeholder="Specify address"
            onChange={e => setAddress(e.target.value)}
          />
        </Field>
      )}

      {storageType === REDIS_STORAGE && (
        <Field label="Password">
          <Input
            value={password}
            placeholder="Specify password"
            onChange={e => setPassword(e.target.value)}
          />
        </Field>
      )}

      {storageType === REDIS_STORAGE && (
        <Field label="DB">
          <Input
            value={db}
            placeholder="Specify DB"
            onChange={e => setDb(e.target.value)}
          />
        </Field>
      )}

      {storageType === DYNAMONDB_STORAGE && (
        <Field label="Region">
          <Input
            value={region}
            placeholder="Specify region"
            onChange={e => setRegion(e.target.value)}
          />
        </Field>
      )}

      {storageType === DYNAMONDB_STORAGE && (
        <Field label="Endpoint">
          <Input
            value={endpoint}
            placeholder="Specify endpoint"
            onChange={e => setEndpoint(e.target.value)}
          />
        </Field>
      )}

      <footer className="iap-settings-form__footer">
        <Button
          type="submit"
          error={!loading && error}
          disabled={loading}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save changes
        </Button>
      </footer>
    </form>
  );
};

export default SessionStorageForm;
