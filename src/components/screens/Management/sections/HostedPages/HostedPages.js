import React from 'react';
import { Select, Option } from '~/components/shared/Select';
import InvitationTemplate from './InvitationTemplate';

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
        <InvitationTemplate
          template={{
            filename: 'invite-template.html',
            code: '<div>Hello, world!</div>',
          }}
        />
      </main>
    </section>
  );
};

export default HostedPagesSection;
