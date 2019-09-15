import React from 'react';

const ReloadServerPopup = () => {

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
