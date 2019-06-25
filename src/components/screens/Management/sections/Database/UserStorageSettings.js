import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Preview from './ConnectionSettings/Preview';
import Form from './ConnectionSettings/Form';
import Button from '~/components/shared/Button';
import EditIcon from '~/components/icons/EditIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { fetchSettings, postSettings, resetError } from '~/modules/database/actions';
import { createNotification } from '~/modules/notifications/actions';
import DatabasePlaceholder from './ConnectionSettings/Placeholder';
import SectionHeader from '~/components/shared/SectionHeader';

import './ConnectionSettings/index.css';

function useDidMount() {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => setDidMount(true), []);

  return didMount;
}

const AppStorageSettings = () => {
  const settings = useSelector(state => state.database.settings.config);
  const error = useSelector(state => state.database.settings.error);

  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [posting, setPosting] = useState(false);

  const didMount = useDidMount();

  const handleEditCancel = () => {
    dispatch(resetError());
    setEditing(false);
  };

  useEffect(() => {
    setFetching(true);
    dispatch(fetchSettings());
  }, []);

  useEffect(() => {
    if (settings || error) {
      setFetching(false);
      setPosting(false);
    }
  }, [settings, error]);

  useEffect(() => {
    if (posting) {
      return;
    }

    if (!error) {
      handleEditCancel();
      if (didMount) {
        dispatch(createNotification({
          type: 'success',
          title: 'Saved',
          text: 'Database settings have been successfully saved',
        }));
      }
    } else {
      dispatch(createNotification({
        type: 'failure',
        title: 'Error',
        text: 'Database settings could not be saved',
      }));
    }
  }, [posting]);

  const handlePostClick = (data) => {
    setPosting(true);
    dispatch(postSettings(data));
  };

  if (error && !editing) {
    return (
      <DatabasePlaceholder
        fetching={fetching}
        onTryAgainClick={() => dispatch(fetchSettings)}
      />
    );
  }

  return (
    <div className="iap-settings-section">
      <SectionHeader
        title="User Storage"
        description="These values are used to create a connection to the database all your users are stored at."
      />
      <main>
        {editing && (
          <Form
            error={error}
            posting={posting}
            settings={settings}
            onSubmit={handlePostClick}
            onCancel={handleEditCancel}
          />
        )}
        {!editing && (
          <>
            <Preview fetching={fetching} settings={settings} />
            <Button
              disabled={fetching}
              Icon={fetching ? LoadingIcon : EditIcon}
              onClick={() => setEditing(true)}
            >
              Edit Storage
            </Button>
          </>
        )}
      </main>
    </div>
  );
};

export default AppStorageSettings;
