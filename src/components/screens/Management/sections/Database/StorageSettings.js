import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '~/components/shared/Button';
import EditIcon from '~/components/icons/EditIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SectionHeader from '~/components/shared/SectionHeader';
import { resetError } from '~/modules/database/actions';
import { createNotification } from '~/modules/notifications/actions';
import Preview from './Preview';
import Form from './Form';

import './index.css';

function useDidMount() {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => setDidMount(true), []);

  return didMount;
}

const StorageSettings = (props) => {
  const { title, description, settings, fetching, postSettings } = props;
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [posting, setPosting] = useState(false);

  const didMount = useDidMount();

  const handleEditCancel = () => {
    dispatch(resetError());
    setEditing(false);
  };

  useEffect(() => {
    if (settings) {
      setPosting(false);
    }
  }, [settings]);

  useEffect(() => {
    if (posting || !didMount) {
      return;
    }

    handleEditCancel();

    dispatch(createNotification({
      type: 'success',
      title: 'Saved',
      text: 'Storage settings have been successfully saved',
    }));
  }, [posting]);

  const handlePostClick = (data) => {
    setPosting(true);
    postSettings(data);
  };

  return (
    <div className="iap-settings-section">
      <SectionHeader
        title={title}
        description={description}
      />
      <main>
        {editing && (
          <Form
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
              {`Edit ${title}`}
            </Button>
          </>
        )}
      </main>
    </div>
  );
};

StorageSettings.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  postSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    type: PropTypes.string,
    endpoint: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
    region: PropTypes.string,
  }),
};

StorageSettings.defaultProps = {
  settings: null,
};

export default StorageSettings;
