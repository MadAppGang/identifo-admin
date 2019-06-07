import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import RevealIcon from '~/components/icons/RevealIcon';
import HideIcon from '~/components/icons/HideIcon';

const SecretField = ({ value }) => {
  const [reveal, setReveal] = useState(false);

  const iconProps = {
    className: 'iap-apps-form__reveal-secret-btn',
    style: { cursor: 'pointer' },
    onClick: () => setReveal(!reveal),
  };

  const Icon = reveal ? RevealIcon : HideIcon;

  return (
    <Field
      label="Client Secret"
      Icon={<Icon {...iconProps} />}
    >
      <div className="iap-apps-form__secret-field">
        <span className="iap-apps-form__secret-value">
          {reveal ? value : '•'.repeat(value.length * 2)}
        </span>

        <Button>
          Generate
        </Button>
      </div>
    </Field>
  );
};

SecretField.propTypes = {
  value: PropTypes.string.isRequired,
};

export default SecretField;
