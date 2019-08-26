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
      template={template}
      onChange={handleSubmit}
    />
  );
};

export default InvitationTemplate;
