import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';

const extractValue = fn => e => fn(e.target.value);

const TokenSettingsForm = (props) => {
  const { loading, onSubmit, onCancel } = props;
  const app = props.application || {};

  const [tokenLifespan, setTokenLifespan] = useState(app.token_lifespan || '');
  const [refreshTokenLifespan, setRefreshTokenLifespan] = useState(app.refresh_token_lifespan || '');
  const [inviteTokenLifespan, setInviteTokenLifespan] = useState(app.invite_token_lifespan || '');

  useEffect(() => {
    if (app.token_lifespan) {
      setTokenLifespan(app.token_lifespan);
    }

    if (app.refresh_token_lifespan) {
      setRefreshTokenLifespan(app.refresh_token_lifespan);
    }

    if (app.invite_token_lifespan) {
      setInviteTokenLifespan(app.invite_token_lifespan);
    }
  }, props.application);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(app, {
      token_lifespan: Number(tokenLifespan) || undefined,
      refresh_token_lifespan: Number(refreshTokenLifespan) || undefined,
      invite_token_lifespan: Number(inviteTokenLifespan) || undefined,
    }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="Access Token Lifespan">
        <Input
          value={tokenLifespan}
          autoComplete="off"
          placeholder="Lifespan in seconds"
          onChange={extractValue(setTokenLifespan)}
          disabled={loading}
        />
      </Field>

      <Field label="Refresh Token Lifespan">
        <Input
          value={refreshTokenLifespan}
          autoComplete="off"
          placeholder="Lifespan in seconds"
          onChange={extractValue(setRefreshTokenLifespan)}
          disabled={loading}
        />
      </Field>

      <Field label="Invite Token Lifespan">
        <Input
          value={inviteTokenLifespan}
          autoComplete="off"
          placeholder="Lifespan in seconds"
          onChange={extractValue(setInviteTokenLifespan)}
          disabled={loading}
        />
      </Field>

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          disabled={loading}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save changes
        </Button>
        <Button transparent disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
      </footer>
    </form>
  );
};

export default TokenSettingsForm;
