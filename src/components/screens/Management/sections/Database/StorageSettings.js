import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Preview from './ConnectionSettings/Preview';
import Form from './ConnectionSettings/Form';
import Button from '~/components/shared/Button';
import EditIcon from '~/components/icons/EditIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { resetError } from '~/modules/database/actions';
import { createNotification } from '~/modules/notifications/actions';
import SectionHeader from '~/components/shared/SectionHeader';

import './ConnectionSettings/index.css';

function useDidMount() {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => setDidMount(true), []);

  return didMount;
}

const AppStorageSettings = (props) => {
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

export default AppStorageSettings;
