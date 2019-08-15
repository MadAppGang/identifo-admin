import React, { useState, useEffect } from 'react';
import path from 'path';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';

const EmailTemplatesForm = (props) => {
  const { loading, settings, error, onSubmit } = props;

  const [emailTemplatesPath, setEmailTemplatesPath] = useState(
    settings ? settings.emailTemplatesPath : '',
  );
  const [welcomeFilename, setWelcomeFilename] = useState(
    settings ? settings.emailTemplateNames.welcome : '',
  );
  const [passwordFilename, setPasswordFilename] = useState(
    settings ? settings.emailTemplateNames.resetPassword : '',
  );
  const [inviteFilename, setInviteFilename] = useState(
    settings ? settings.emailTemplateNames.invite : '',
  );
  const [verifyFilename, setVerifyFilename] = useState(
    settings ? settings.emailTemplateNames.verify : '',
  );
  const [tfaFilename, setTfaFilename] = useState(
    settings ? settings.emailTemplateNames.tfa : '',
  );

  useEffect(() => {
    if (!settings) return;

    setEmailTemplatesPath(settings.emailTemplatesPath);
    setWelcomeFilename(settings.emailTemplateNames.welcome);
    setPasswordFilename(settings.emailTemplateNames.resetPassword);
    setInviteFilename(settings.emailTemplateNames.invite);
    setVerifyFilename(settings.emailTemplateNames.verify);
    setTfaFilename(settings.emailTemplateNames.tfa);
  }, [settings]);

  const computePathPreview = (value) => {
    if (!value) return '';

    return path.join(emailTemplatesPath, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(settings, {
      emailTemplatesPath,
      emailTemplateNames: {
        welcome: welcomeFilename,
        resetPassword: passwordFilename,
        invite: inviteFilename,
        verify: verifyFilename,
        tfa: tfaFilename,
      },
    }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="Email Templates Folder">
        <Input
          value={emailTemplatesPath}
          autoComplete="off"
          placeholder="Specify path to email templates folder"
          onChange={e => setEmailTemplatesPath(e.target.value)}
          disabled={loading}
        />
      </Field>

      <Field
        label="Welcome Tempalte"
        subtext={computePathPreview(welcomeFilename)}
      >
        <Input
          value={welcomeFilename}
          autoComplete="off"
          placeholder="Enter filename"
          onChange={e => setWelcomeFilename(e.target.value)}
          disabled={loading}
        />
      </Field>

      <Field
        label="Reset Password Template"
        subtext={computePathPreview(passwordFilename)}
      >
        <Input
          value={passwordFilename}
          autoComplete="off"
          placeholder="Enter filename"
          onChange={e => setPasswordFilename(e.target.value)}
          disabled={loading}
        />
      </Field>

      <Field
        label="Verify Template"
        subtext={computePathPreview(verifyFilename)}
      >
        <Input
          value={verifyFilename}
          autoComplete="off"
          placeholder="Enter filename"
          onChange={e => setVerifyFilename(e.target.value)}
          disabled={loading}
        />
      </Field>

      <Field
        label="Invite Template"
        subtext={computePathPreview(inviteFilename)}
      >
        <Input
          value={inviteFilename}
          autoComplete="off"
          placeholder="Enter filename"
          onChange={e => setInviteFilename(e.target.value)}
          disabled={loading}
        />
      </Field>

      <Field
        label="2FA Template"
        subtext={computePathPreview(tfaFilename)}
      >
        <Input
          value={tfaFilename}
          autoComplete="off"
          placeholder="Enter filename"
          onChange={e => setTfaFilename(e.target.value)}
          disabled={loading}
        />
      </Field>

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          Icon={loading ? LoadingIcon : SaveIcon}
          disabled={loading}
          error={!loading && !!error}
        >
          Save changes
        </Button>
      </footer>
    </form>
  );
};

export default EmailTemplatesForm;
