import React from 'react';
import TemplateEditor from './TemplateEditor';

const HostedPagesSection = () => {
  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Hosted Pages
      </p>

      <TemplateEditor />
    </section>
  );
};

export default HostedPagesSection;
