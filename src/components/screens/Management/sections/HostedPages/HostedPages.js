import React from 'react';
import TemplateEditor from './TemplateEditor';
import { Select, Option } from '~/components/shared/Select';
import FileIcon from '~/components/icons/FileIcon.svg';
import UploadIcon from '~/components/icons/UploadIcon.svg';

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
        <div className="template-editor-header">
          <p className="template-editor__filename">
            <FileIcon className="template-editor__file-icon" />
            invitation.html
          </p>

          <button type="button" className="template-editor__upload-code">
            <UploadIcon className="template-editor__upload-icon" />
            Upload source code
          </button>
        </div>
        <TemplateEditor />
      </main>
    </section>
  );
};

export default HostedPagesSection;
