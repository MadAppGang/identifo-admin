import React from 'react';
import loadingIcon from './loading.svg';
import './LoadingIcon.css';

const LoadingIcon = () => (
  <img
    src={loadingIcon}
    alt="spinner"
    className="iap-loading-indicator-icon"
  />
);

export default LoadingIcon;
