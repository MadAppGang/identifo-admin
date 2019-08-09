import React, { useEffect } from 'react';
import update from '@madappgang/update-by-path';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginSettings, updateLoginSettings } from '~/modules/settings/actions';
import LoginTypesTable from './LoginTypesTable';

const LoginTypesSection = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings.login);

  useEffect(() => {
    dispatch(fetchLoginSettings());
  }, []);

  const handleChange = (type, enabled) => {
    const nextSettings = update(settings, `loginWith.${type}`, enabled);
    dispatch(updateLoginSettings(nextSettings));
  };

  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Login Types
      </p>

      <p className="iap-management-section__description">
        These settings allow to turn off undesirable login endpoints.
      </p>

      <div className="iap-settings-section">
        <LoginTypesTable types={settings.loginWith} onChange={handleChange} />
      </div>

    </section>
  );
};

export default LoginTypesSection;
