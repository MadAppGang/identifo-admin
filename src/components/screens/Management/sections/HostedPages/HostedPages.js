import React, { useState, useEffect } from 'react';
import { Select, Option } from '~/components/shared/Select';
import InvitationTemplate from './InvitationTemplate';

const templateNames = {
  INVITE: 'invite',
  WELCOME: 'welcome',
  RESET: 'reset',
  VERIFY: 'verify',
  TFA: 'tfa',
};

const fetchTemplates = () => ({
  [templateNames.INVITE]: {
    filename: 'invite-template.html',
    code: '<div>invitation email markup</div>',
  },
  [templateNames.WELCOME]: {
    filename: 'welcome-template.html',
    code: '<div>welcome email markup</div>',
  },
  [templateNames.RESET]: {
    filename: 'reset-password-template.html',
    code: '<div>reset password email markup</div>',
  },
  [templateNames.VERIFY]: {
    filename: 'verify-template.html',
    code: '<div>verify email markup</div>',
  },
  [templateNames.TFA]: {
    filename: 'tfa-template.html',
    code: '<div>2fa email markup</div>',
  },
});

const templateComponentMap = {
  [templateNames.INVITE]: InvitationTemplate,
  [templateNames.WELCOME]: InvitationTemplate,
  [templateNames.RESET]: InvitationTemplate,
  [templateNames.VERIFY]: InvitationTemplate,
  [templateNames.TFA]: InvitationTemplate,
};

const HostedPagesSection = () => {
  const [templates, setTemplates] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState(templateNames.INVITE);

  useEffect(() => {
    setTemplates(fetchTemplates());
  }, []);

  const Template = templateComponentMap[selectedTemplate];

  return (
    <section className="iap-management-section">
      <h1 className="iap-management-section__title">
        Hosted Pages

        <Select value={selectedTemplate} onChange={setSelectedTemplate}>
          <Option value={templateNames.INVITE} title="Invitation Email" />
          <Option value={templateNames.WELCOME} title="Welcome Email" />
          <Option value={templateNames.RESET} title="Reset Password Email" />
          <Option value={templateNames.VERIFY} title="Verify Email" />
          <Option value={templateNames.TFA} title="2FA Email" />
        </Select>
      </h1>

      <p className="iap-management-section__description">
        Customize hosted pages by editing the source code via web editor.
      </p>

      <main className="hosted-pages-main">
        <Template template={templates[selectedTemplate]} />
      </main>
    </section>
  );
};

export default HostedPagesSection;
