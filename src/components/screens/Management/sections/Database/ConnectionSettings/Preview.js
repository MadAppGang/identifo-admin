import React from 'react';

const Preview = () => {
  return (
    <div className="iap-section__info">
      <div className="iap-section__field">
        <span>
          Database Type
        </span>
        <p className="iap-section__value">
          MongoDB
        </p>
      </div>

      <div className="iap-section__field">
        <span>
          Database name
        </span>
        <p className="iap-section__value">
          identifo
        </p>
      </div>

      <div className="iap-section__field">
        <span>
          Endpoint
        </span>
        <p className="iap-section__value">
          localhost:27017
        </p>
      </div>
    </div>
  );
};

export default Preview;
