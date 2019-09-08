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
    html: {
      filename: 'invite-template.html',
      code: '<div>invitation email markup</div>',
    },
    css: {
      filename: 'invite-template.css',
      code: '.invite { display: flex; }',
    },
    js: {
      filename: 'invite-template.js',
      code: 'function (a, b) { return a + b; }',
    },
  },
  [templateNames.WELCOME]: {
    html: {
      filename: 'welcome-template.html',
      code: '<div>invitation email markup</div>',
    },
    css: {
      filename: 'welcome-template.css',
      code: '.invite { display: flex; }',
    },
    js: {
      filename: 'welcome-template.js',
      code: 'function (a, b) { return a + b; }',
    },
  },
  [templateNames.RESET]: {
    html: {
      filename: 'reset-password-template.html',
      code: '<div>reset password markup</div>',
    },
    css: {
      filename: 'reset-password-template.css',
      code: '.invite { display: flex; }',
    },
    js: {
      filename: 'reset-password-template.js',
      code: 'function (a, b) { return a + b; }',
    },
  },
  [templateNames.VERIFY]: {
    html: {
      filename: 'verify-template.html',
      code: '<div>verify email markup</div>',
    },
    css: {
      filename: 'verify-password-template.css',
      code: '.invite { display: flex; }',
    },
    js: {
      filename: 'verify-password-template.js',
      code: 'function (a, b) { return a + b; }',
    },
  },
  [templateNames.TFA]: {
    html: {
      filename: 'tfa-template.html',
      code: '<div>2fa email markup</div>',
    },
    css: {
      filename: 'tfa-password-template.css',
      code: '.invite { display: flex; }',
    },
    js: {
      filename: 'tfa-password-template.js',
      code: 'function (a, b) { return a + b; }',
    },
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
