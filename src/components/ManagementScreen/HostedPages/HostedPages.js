import React, { useState, useEffect } from 'react';
import { Select, Option } from '~/components/shared/Select';
import useServices from '~/hooks/useServices';
import useProgressBar from '~/hooks/useProgressBar';
import TemplateEditor from './TemplateEditor';

const templateNames = {
  INVITE: 'invite-email',
  WELCOME: 'welcome-email',
  RESET: 'reset-email',
  VERIFY: 'verify-email',
  TFA: 'tfa-email',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  FORGOT_PASSWORD: 'forgon-password',
  RESET_TFA: 'reset-tfa',
  RESET_TFA_SUCCESS: 'reset-tfa-success',
  TOKEN_ERROR: 'token-error',
  WEB_MESSAGE: 'web-message',
  RESET_PASSWORD_SUCCESS: 'reset-password-success',
  RESET_PASSWORD: 'reset-password',
  MISCONFIGURATION: 'misconfiguration',
};

const HostedPagesSection = () => {
  const services = useServices();
  const { progress, setProgress } = useProgressBar();

  const [templateName, setTemplateName] = useState(templateNames.INVITE);
  const [templateExt, setTemplateExt] = useState('html');
  const [templateSource, setTemplateSource] = useState('');

  const fetchTemplateSource = async () => {
    setProgress(80);

    try {
      const source = await services.static
        .fetchStaticFile(templateName, templateExt);

      setTemplateSource(source);
    } catch (_) {
      // TODO: handle error
    } finally {
      setProgress(100);
    }
  };

  useEffect(() => {
    fetchTemplateSource();
  }, [templateName, templateExt]);

  return (
    <section className="iap-management-section">
      <h1 className="iap-management-section__title">
        Hosted Pages

        <Select value={templateName} onChange={setTemplateName}>
          <Option value={templateNames.INVITE} title="Invitation Email" />
          <Option value={templateNames.WELCOME} title="Welcome Email" />
          <Option value={templateNames.RESET} title="Reset Password Email" />
          <Option value={templateNames.VERIFY} title="Verify Email" />
          <Option value={templateNames.TFA} title="2FA Email" />
          <Option value={templateNames.LOGIN} title="Login page" />
          <Option value={templateNames.REGISTRATION} title="Registration page" />
          <Option value={templateNames.FORGOT_PASSWORD} title="Forgot password page" />
          <Option value={templateNames.RESET_TFA} title="Reset TFA" />
          <Option value={templateNames.RESET_TFA_SUCCESS} title="Reset TFA success" />
          <Option value={templateNames.TOKEN_ERROR} title="Token Error" />
          <Option value={templateNames.WEB_MESSAGE} title="Web message" />
          <Option value={templateNames.MISCONFIGURATION} title="Misconfiguration" />
          <Option value={templateNames.RESET_PASSWORD} title="Reset pasword" />
          <Option value={templateNames.RESET_PASSWORD_SUCCESS} title="Rest password success" />
        </Select>
      </h1>

      <p className="iap-management-section__description">
        Customize hosted pages by editing the source code via web editor.
      </p>

      <main className="hosted-pages-main">
        <TemplateEditor
          name={templateName}
          extension={templateExt}
          source={templateSource}
          progress={!!progress}
          onExtensionChange={setTemplateExt}
        />
      </main>
    </section>
  );
};

export default HostedPagesSection;
