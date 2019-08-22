import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGeneralSettings, updateGeneralSettings,
} from '~/modules/settings/actions';
import { createNotification } from '~/modules/notifications/actions';
import ServerGeneralForm from './ServerGeneralForm';

const ServerGeneralTab = () => {
  const dispatch = useDispatch();
  const settings = useSelector(s => s.settings.general);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      await dispatch(fetchGeneralSettings());
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (nextSettings) => {
    setLoading(true);
    await dispatch(updateGeneralSettings(nextSettings));
    setLoading(false);

    dispatch(createNotification({
      type: 'success',
      title: 'Updated',
      text: 'Server settings have been updated successfully',
    }));
  };

  return (
    <ServerGeneralForm
      loading={loading}
      settings={settings}
      onSubmit={handleSubmit}
    />
  );
};

export default ServerGeneralTab;
