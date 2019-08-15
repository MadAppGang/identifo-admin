import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs } from '~/components/shared/Tabs';
import StaticFilesGeneralForm from './StaticFilesGeneralForm';
import EmailTemplatesForm from './EmailTemplatesForm';
import {
  fetchStaticFilesSettings, updateStaticFilesSettings,
} from '~/modules/settings/actions';
import { createNotification } from '~/modules/notifications/actions';

const StaticFilesSection = () => {
  const [tabIndex, setTabIndex] = useState(0);
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

      <Tabs
        activeTabIndex={tabIndex}
        onChange={setTabIndex}
      >
        <Tab title="General Settings" />
        <Tab title="Email Templates" />

        <>
          {tabIndex === 0 && (
            <StaticFilesGeneralForm
              settings={settings || {}}
              loading={loading}
              onSubmit={handleSubmit}
            />
          )}

          {tabIndex === 1 && (
            <EmailTemplatesForm
              settings={settings}
              loading={loading}
              onSubmit={handleSubmit}
            />
          )}
        </>
      </Tabs>
    </section>
  );
};

export default StaticFilesSection;
