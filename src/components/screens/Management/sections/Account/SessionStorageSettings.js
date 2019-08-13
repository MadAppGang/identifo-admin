import React, { useState } from 'react';
import SectionHeader from '~/components/shared/SectionHeader';
import SessionStorageForm from './SessionStorageForm';

const SessionStorageSettings = (props) => {
  const { error } = props;

  const [fetching, setFetching] = useState(false);
  const [posting, setPosting] = useState(false);

  const settings = {};

  const handleSubmit = (settings) => {
    
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
