import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from '~/components/shared/SectionHeader';
import SessionStorageForm from './SessionStorageForm';
import {
  fetchSessionStorageSettings, updateSessionStorageSettings,
} from '~/modules/settings/actions';
import { createNotification } from '~/modules/notifications/actions';

const SessionStorageSettings = (props) => {
  const { error } = props;

  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings.sessionStorage);
  const [fetching, setFetching] = useState(false);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setFetching(true);
      await dispatch(fetchSessionStorageSettings());
      setFetching(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (data) => {
    setPosting(true);
    await dispatch(updateSessionStorageSettings(data));
    setPosting(false);

    dispatch(createNotification({
      type: 'success',
      title: 'Updated',
      text: 'Settings have been updated successfully',
    }));
  };

  return (
    <div className="iap-settings-section">
      <SectionHeader
        title="Session Storage"
        description="These settings determine the way admin session is stored on the server"
      />

      <main>
        <SessionStorageForm
          error={error}
          loading={fetching || posting}
          settings={settings}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default SessionStorageSettings;
