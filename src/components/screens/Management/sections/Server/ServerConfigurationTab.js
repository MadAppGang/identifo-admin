import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServerConfigurationForm from './ServerConfigurationForm';
import {
  fetchConfigurationStorageSettings, updateConfigurationStorageSettings,
} from '~/modules/settings/actions'; 

const ServerConfigurationTab = () => {
  const [loading, setLoading] = useState(false);
  const settings = useSelector(s => s.settings.configurationStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      await dispatch(fetchConfigurationStorageSettings());
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (nextSettings) => {
    setLoading(true);
    await dispatch(updateConfigurationStorageSettings(nextSettings));
    setLoading(false);
  };

  return (
    <ServerConfigurationForm
      loading={loading}
      settings={settings}
      onSubmit={handleSubmit}
    />
  );
};

export default ServerConfigurationTab;
