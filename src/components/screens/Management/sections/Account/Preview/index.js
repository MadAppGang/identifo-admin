import React from 'react';
import PropTypes from 'prop-types';
import PreviewField from '~/components/shared/PreviewField';
import PreviewPreloader from './PreviewPreloader';

const AdminAccountPreview = ({ fetching, settings }) => {
  if (fetching || !settings) {
    return <PreviewPreloader />;
  }

  return (
    <div className="iap-section__info">
      <PreviewField label="Email" value={settings.email} />
    </div>
  );
};

AdminAccountPreview.propTypes = {
  fetching: PropTypes.bool,
  settings: PropTypes.shape({
    email: PropTypes.string,
  }),
};

AdminAccountPreview.defaultProps = {
  settings: null,
  fetching: false,
};

export default AdminAccountPreview;
