import React from 'react';
import PropTypes from 'prop-types';
import PreviewPreloader from './PreviewPreloader';
import PreviewField from './PreviewField';

const displayDatabaseType = type => ({
  mongodb: 'MongoDB',
  dynamodb: 'DynamoDB',
}[type]);

const Preview = ({ fetching, settings }) => {
  if (fetching || !settings) {
    return <PreviewPreloader />;
  }

  return (
    <div className="iap-section__info">
      <PreviewField
        label="Database Type"
        value={displayDatabaseType(settings.type)}
      />

      <PreviewField
        label="Database Name"
        value={settings.name}
      />

      <PreviewField
        label="Region"
        value={settings.region}
      />

      <PreviewField
        label="Endpoint"
        value={settings.endpoint}
      />
    </div>
  );
};

Preview.propTypes = {
  fetching: PropTypes.bool,
  settings: PropTypes.shape({
    endpoint: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
};

Preview.defaultProps = {
  fetching: false,
  settings: null,
};

export default Preview;
