import React from 'react';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import useForm from '~/hooks/useForm';

const TokenSettingsForm = ({ application, loading, onCancel, onSubmit }) => {
  const initialValues = {
    tokenLifespan: application.token_lifespan || '',
    refreshTokenLifespan: application.refresh_token_lifespan || '',
    inviteTokenLifespan: application.invite_token_lifespan || '',
  };

  const handleSubmit = (values) => {
    onSubmit(update(application, {
      token_lifespan: Number(values.tokenLifespan) || undefined,
      refresh_token_lifespan: Number(values.refreshTokenLifespan) || undefined,
      invite_token_lifespan: Number(values.inviteTokenLifespan) || undefined,
    }));
  };

  const form = useForm(initialValues, null, handleSubmit);

  React.useEffect(() => {
    if (!application) return;

    form.setValues({
      tokenLifespan: application.token_lifespan,
      refreshTokenLifespan: application.refresh_token_lifespan,
      inviteTokenLifespan: application.invite_token_lifespan,
    });
  }, [application]);

  return (
    <form className="iap-apps-form" onSubmit={form.handleSubmit}>
      <Field label="Access Token Lifespan">
        <Input
          name="tokenLifespan"
          value={form.values.tokenLifespan}
          autoComplete="off"
          placeholder="Lifespan in seconds"
          onChange={form.handleChange}
          disabled={loading}
        />
      </Field>

      <Field label="Refresh Token Lifespan">
        <Input
          name="refreshTokenLifespan"
          value={form.values.refreshTokenLifespan}
          autoComplete="off"
          placeholder="Lifespan in seconds"
          onChange={form.handleChange}
          disabled={loading}
        />
      </Field>

      <Field label="Invite Token Lifespan">
        <Input
          name="inviteTokenLifespan"
          value={form.values.inviteTokenLifespan}
          autoComplete="off"
          placeholder="Lifespan in seconds"
          onChange={form.handleChange}
          disabled={loading}
        />
      </Field>

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          disabled={loading}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save Changes
        </Button>
        <Button transparent disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
      </footer>
    </form>
  );
};

export default TokenSettingsForm;
