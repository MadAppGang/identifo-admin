import React, { useState, useEffect } from 'react';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import Input from '~/components/shared/Input';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import { Select, Option } from '~/components/shared/Select';

const types = {
  MOCK: 'mock',
  AWS_SES: 'aws_ses',
  MAILGUN: 'mailgun',
};

const MailServiceSettings = (props) => {
  const { loading, onSubmit } = props;
  const [type, setType] = useState(props.type || '');
  const [domain, setDomain] = useState(props.domain || '');
  const [privateKey, setPrivateKey] = useState(props.privateKey || '');
  const [publicKey, setPublicKey] = useState(props.publicKey || '');
  const [sender, setSender] = useState(props.sender || '');
  const [region, setRegion] = useState(props.region || '');

  useEffect(() => {
    setType(props.type || '');
    setDomain(props.domain || '');
    setPrivateKey(props.privateKey || '');
    setPublicKey(props.publicKey || '');
    setSender(props.sender || '');
    setRegion(props.region || '');
  }, [props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ type, domain, privateKey, publicKey, sender, region });
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="Mail Service">
        <Select
          value={type}
          disabled={loading}
          onChange={setType}
          placeholder="Select Supported Service"
        >
          <Option value={types.MAILGUN} title="Mailgun" />
          <Option value={types.AWS_SES} title="Amazon SES" />
          <Option value={types.MOCK} title="Mock" />
        </Select>
      </Field>

      <Field label="Sender" subtext={'If can be overriden by "MAILGUN_SENDER" or "AWS_SES_SENDER" env vars.'}>
        <Input
          value={sender}
          autoComplete="off"
          placeholder="Specify Sender"
          onValue={setSender}
          disabled={loading}
        />
      </Field>

      {type === types.MAILGUN && (
        <Field label="Domain" subtext="Can be overriden by MAILGUN_DOMAIN env var">
          <Input
            value={domain}
            autoComplete="off"
            placeholder="Specify Mailgun domain"
            onValue={setDomain}
            disabled={loading}
          />
        </Field>
      )}

      {type === types.MAILGUN && (
        <Field label="Public Key" subtext="Can be overriden by MAILGUN_PUBLIC_KEY env var">
          <Input
            value={publicKey}
            autoComplete="off"
            placeholder="Specify Mailgun public key"
            onValue={setPublicKey}
            disabled={loading}
          />
        </Field>
      )}

      {type === types.MAILGUN && (
        <Field label="Private Key" subtext="Can be overriden by MAILGUN_PRIVATE_KEY env var">
          <Input
            value={privateKey}
            autoComplete="off"
            placeholder="Specify Mailgun private key"
            onValue={setPrivateKey}
            disabled={loading}
          />
        </Field>
      )}

      {type === types.AWS_SES && (
        <Field label="Region" subtext="Can be overriden by AWS_SES_REGION env var">
          <Input
            value={region}
            autoComplete="off"
            placeholder="Specify Region"
            onValue={setRegion}
            disabled={loading}
          />
        </Field>
      )}

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          disabled={loading}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save Changes
        </Button>
      </footer>
    </form>
  );
};

export default MailServiceSettings;
