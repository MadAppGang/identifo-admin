import React from 'react';
import './PreviewPreloader.css';

const PreviewPreloader = () => (
  <div className="iap-section__info">
    <div className="iap-section__field">
      <span>
        Database Type
      </span>
      <div className="iap-section__value--fake" />
    </div>

    <div className="iap-section__field">
      <span>
        Database name
      </span>
      <div className="iap-section__value--fake" />
    </div>

    <div className="iap-section__field">
      <span>
        Endpoint
      </span>
      <div className="iap-section__value--fake" />
    </div>
  </div>
);

export default PreviewPreloader;
