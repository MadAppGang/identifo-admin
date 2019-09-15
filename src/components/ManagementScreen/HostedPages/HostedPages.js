import React, { useState, useEffect } from 'react';
import { Select, Option } from '~/components/shared/Select';
import useServices from '~/hooks/useServices';
import useProgressBar from '~/hooks/useProgressBar';
import TemplateEditor from './TemplateEditor';

const templateNames = {
  INVITE: 'invite',
  WELCOME: 'welcome',
  RESET: 'reset',
  VERIFY: 'verify',
  TFA: 'tfa',
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
