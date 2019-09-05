import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StaticFilesGeneralForm from './StaticFilesGeneralForm';
import {
  fetchStaticFilesSettings, updateStaticFilesSettings,
} from '~/modules/settings/actions';
import { createNotification } from '~/modules/notifications/actions';

const StaticFilesSection = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const settings = useSelector(s => s.settings.staticFiles);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      await dispatch(fetchStaticFilesSettings());
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (nextSettings) => {
    setLoading(true);
    await dispatch(updateStaticFilesSettings(nextSettings));
    setLoading(false);

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
        loading={loading}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default StaticFilesSection;
