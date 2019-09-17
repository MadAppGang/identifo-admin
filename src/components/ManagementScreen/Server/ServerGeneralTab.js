import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGeneralSettings, updateGeneralSettings,
} from '~/modules/settings/actions';
import { createNotification } from '~/modules/notifications/actions';
import ServerGeneralForm from './ServerGeneralForm';
import useProgressBar from '~/hooks/useProgressBar';

const ServerGeneralTab = () => {
  const dispatch = useDispatch();
  const settings = useSelector(s => s.settings.general);
  const { progress, setProgress } = useProgressBar();

  useEffect(() => {
    const fetchSettings = async () => {
      setProgress(70);
      await dispatch(fetchGeneralSettings());
      setProgress(100);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (nextSettings) => {
    setProgress(70);
    await dispatch(updateGeneralSettings(nextSettings));
    setProgress(100);

    dispatch(createNotification({
      type: 'success',
      title: 'Updated',
      text: 'Server settings have been updated successfully',
    }));
  };

  return (
    <ServerGeneralForm
      loading={!!progress}
      settings={settings}
      onSubmit={handleSubmit}
    />
  );
};

export default ServerGeneralTab;
