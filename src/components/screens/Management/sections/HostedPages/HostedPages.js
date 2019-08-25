import React from 'react';
import TemplateEditor from './TemplateEditor';
import { Select, Option } from '~/components/shared/Select';

const HostedPagesSection = () => {
  return (
    <section className="iap-management-section">
      <h1 className="iap-management-section__title">
        Hosted Pages

        <Select value="invite" onChange={() => {}}>
          <Option value="invite" title="Invitation Email" />
        </Select>
      </h1>

      <p className="iap-management-section__description">
        Customize hosted pages by editing the source code via web editor.
      </p>

      <main className="hosted-pages-main">
        <TemplateEditor filename="invite-template.html" />
      </main>
    </section>
  );
};

export default HostedPagesSection;
