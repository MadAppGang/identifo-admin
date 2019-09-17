import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StaticFilesGeneralForm from './StaticFilesGeneralForm';
import {
  fetchStaticFilesSettings, updateStaticFilesSettings,
} from '~/modules/settings/actions';
import { createNotification } from '~/modules/notifications/actions';
import useProgressBar from '~/hooks/useProgressBar';

const StaticFilesSection = () => {
  const { progress, setProgress } = useProgressBar();
  const dispatch = useDispatch();

  const settings = useSelector(s => s.settings.staticFiles);

  React.useEffect(() => {
    const fetchSettings = async () => {
      setProgress(70);
      await dispatch(fetchStaticFilesSettings());
      setProgress(100);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (nextSettings) => {
    setProgress(70);
    await dispatch(updateStaticFilesSettings(nextSettings));
    setProgress(100);

    dispatch(createNotification({
      type: 'success',
      title: 'Updated',
      text: 'Settings have been updated successfully',
    }));
  };

  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Static Files
      </p>

      <p className="iap-management-section__description">
        These settings allow to specify paths to various static files directories.
      </p>

      <StaticFilesGeneralForm
        settings={settings || {}}
        loading={!!progress}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default StaticFilesSection;
