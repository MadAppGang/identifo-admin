import React, { useState } from 'react';
import Toggle from '~/components/shared/Toggle';

const LoginTypesForm = () => {
  const [username, setUsername] = useState(false);
  const [phone, setPhone] = useState(false);
  const [federated, setFederated] = useState(false);

  return (
    <div className="login-types-form">
      <Toggle
        label="Enable login with username and password"
        value={username}
        onChange={setUsername}
      />
      <Toggle
        label="Enable login with phone number"
        value={phone}
        onChange={setPhone}
      />
      <Toggle
        label="Enable federated login"
        value={federated}
        onChange={setFederated}
      />
    </div>
  );
};

export default LoginTypesForm;
