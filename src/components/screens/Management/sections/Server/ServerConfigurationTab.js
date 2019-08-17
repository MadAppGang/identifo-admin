import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServerConfigurationForm from './ServerConfigurationForm';

const ServerConfigurationTab = () => {
  const [loading, setLoading] = useState(false);
  const settings = useSelector(s => s.settings.configurationStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      // dispatch();
      setLoading(false);
    };

    fetchSettings();
  });

  const handleSubmit = async (nextSettings) => {
    setLoading(true);
    // dispatch();
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
