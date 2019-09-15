import React from 'react';
import { useSelector } from 'react-redux';

const ReloadServerPopup = () => {
  const settingsChanged = useSelector(s => s.settings.changed);

  if (!settingsChanged) {
    return null;
  }

  return (
    <div className="popup">
      <p className="popup-text">
        In order for the changes to take effect, please restart the server.
      </p>

      <button className="popup-btn">
        Restart
      </button>
    </div>
  );
};

export default ReloadServerPopup;
