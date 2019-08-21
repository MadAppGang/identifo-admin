import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from '~/components/shared/SectionHeader';
import CredentialsEnvForm from './CredentialsEnvForm';
import {
  fetchCredentialsSettings, updateCredentialsSettings,
} from '~/modules/settings/actions';

const CredentialsEnvSettings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const settings = useSelector(s => s.settings.adminAccount);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      await dispatch(fetchCredentialsSettings());
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    await dispatch(updateCredentialsSettings(data));
    setLoading(false);
  };

  return (
    <div className="iap-settings-section">
      <SectionHeader
        title="Credentials Env"
        description="Names of environment variables that store admin credentials."
      />

      <main>
        <CredentialsEnvForm
          loading={loading}
          settings={settings}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default CredentialsEnvSettings;
