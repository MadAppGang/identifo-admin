import React from 'react';
import TemplateEditor from './TemplateEditor';

const InvitationTemplate = (props) => {
  const { template } = props;

  const handleSubmit = (code) => {
    // TODO
  };

  if (!template) {
    return null;
  }

  return (
    <TemplateEditor
      filename={template.filename}
      code={template.code}
      onChange={handleSubmit}
    />
  );
};

export default InvitationTemplate;
