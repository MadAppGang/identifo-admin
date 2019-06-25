import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Preview from './ConnectionSettings/Preview';
import Form from './ConnectionSettings/Form';
import Button from '~/components/shared/Button';
import SectionHeader from '~/components/shared/SectionHeader';
import EditIcon from '~/components/icons/EditIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { fetchSettings, postSettings, resetError } from '~/modules/database/actions';
import { createNotification } from '~/modules/notifications/actions';
import DatabasePlaceholder from './ConnectionSettings/Placeholder';

const sectionDescription = {
  editing: 'You should select from supported database types and provide a connection for it.',
  preview: 'These values are used to create a connection to the database all of your applications are stored at.',
};

const AppStorageSettings = (props) => {
  const posting = useSelector(state => state.database.settings.posting);
  const settings = useSelector(state => state.database.settings.config);
  const error = useSelector(state => state.database.settings.error);

  const [editing, setEditing] = useState(false);
  const [fetching, setFetching] = useState(false);

  const handleEditCancel = () => {
    props.resetError();
    setEditing(false);
  };

  useEffect(() => {
    setFetching(true);
    props.fetchSettings();
  }, []);

  useEffect(() => {
    if (settings || error) {
      setFetching(false);
    }
  }, [settings, error]);

  useEffect(() => {
    if (posting) {
      return;
    }

    if (!error) {
      handleEditCancel();
      props.createNotification({
        type: 'success',
        title: 'Saved',
        text: 'Database settings have been successfully saved',
      });
    } else {
      props.createNotification({
        type: 'failure',
        title: 'Error',
        text: 'Database settings could not be saved',
      });
    }
  }, [posting]);

  if (error && !editing) {
    return (
      <DatabasePlaceholder
        fetching={fetching}
        onTryAgainClick={props.fetchSettings}
      />
    );
  }

  return (
    <div className="iap-settings-section">
      <SectionHeader
        title="Application Storage Settings"
        description={sectionDescription[editing ? 'editing' : 'preview']}
      />
      <main>
        {editing && (
          <Form
            error={error}
            posting={posting}
            settings={settings}
            onSubmit={props.postSettings}
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
              Edit database settings
            </Button>
          </>
        )}
      </main>
    </div>
  );
};

AppStorageSettings.propTypes = {
  fetchSettings: PropTypes.func.isRequired,
  postSettings: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
};

const actions = {
  fetchSettings,
  postSettings,
  resetError,
  createNotification,
};

export { AppStorageSettings as ConnectionSettings };

export default connect(null, actions)(AppStorageSettings);
