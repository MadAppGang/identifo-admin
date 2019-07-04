import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import * as Validation from '@dprovodnikov/validation';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import validationRules from './validationRules';
import { Select, Option } from '~/components/shared/Select';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
import Toggle from '~/components/shared/Toggle';
import SecretField from './SecretField';
import './ApplicationForm.css';

class ApplicationForm extends Component {
  constructor() {
    super();

    this.validate = Validation.applyRules(validationRules);

    this.state = {
      fields: {
        type: '',
        name: '',
        redirectUrl: '',
        offline: false,
        secret: '',
        allowRegistration: '',
      },
      validation: {
        type: '',
        name: '',
        redirectUrl: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.toggleAllowOffline = this.toggleAllowOffline.bind(this);
    this.toggleAllowRegistration = this.toggleAllowRegistration.bind(this);
    this.handleSecretChange = this.handleSecretChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { application } = this.props;

    if (application && application !== prevProps.application) {
      this.setState(state => ({
        fields: update(state.fields, {
          redirectUrl: application.redirect_url || '',
          offline: application.offline || false,
          type: application.type || 'web',
          name: application.name || '',
          secret: application.secret || '',
          allowRegistration: !application.registration_forbidden,
        }),
      }));
    }
  }

  handleInput({ target }) {
    const { name, value } = target;
    let { validation } = this.state;

    if (validation[target.name]) {
      validation = update(validation, { [target.name]: '' });
    }

    this.setState(state => ({
      fields: update(state.fields, {
        [name]: value,
      }),
      validation,
    }));
  }

  handleTypeChange(value) {
    this.handleInput({ target: { name: 'type', value } });
  }

  handleBlur({ target }) {
    const { name, value } = target;
    const validationMessage = this.validate(name, {
      ...this.state.fields,
      [name]: value,
    });

    this.setState(state => ({
      validation: update(state.validation, {
        [name]: validationMessage,
      }),
    }));
  }

  toggleAllowOffline(offline) {
    this.setState(state => ({
      fields: update(state.fields, { offline }),
    }));
  }

  toggleAllowRegistration(allow) {
    this.setState(state => ({
      fields: update(state.fields, { allowRegistration: allow }),
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { fields } = this.state;
    const validation = this.validate('all', fields);

    if (Validation.hasError(validation)) {
      this.setState({ validation });
      return;
    }

    this.props.onSubmit(update(fields, {
      redirect_url: fields.redirectUrl,
      redirectUrl: undefined,
      registration_forbidden: !fields.allowRegistration,
      allowRegistration: undefined,
    }));
  }

  handleSecretChange(secret) {
    this.setState(state => ({
      fields: update(state.fields, { secret }),
    }));
  }

  render() {
    const { fields, validation } = this.state;
    const { loading, error } = this.props;

    return (
      <form className="iap-apps-form" onSubmit={this.handleSubmit}>
        {!!error && (
          <FormErrorMessage error={error} />
        )}

        <Field label="Name">
          <Input
            name="name"
            value={fields.name}
            autoComplete="off"
            placeholder="Enter name"
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            errorMessage={validation.name}
            disabled={loading}
          />
        </Field>

        <Field label="Type">
          <Select
            name="type"
            value={fields.type}
            disabled={loading}
            onChange={this.handleTypeChange}
            placeholder="Select Application Type"
            errorMessage={validation.type}
          >
            <Option value="web" title="Single Page Application (Web)" />
            <Option value="android" title="Android Client (Mobile)" />
            <Option value="ios" title="iOS Client (Mobile)" />
          </Select>
        </Field>

        <SecretField value={fields.secret} onChange={this.handleSecretChange} />

        <Field label="Redirect URL">
          <Input
            name="redirectUrl"
            value={fields.redirectUrl}
            autoComplete="off"
            placeholder="Enter redirect url"
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            errorMessage={validation.redirectUrl}
            disabled={loading}
          />
        </Field>

        <Toggle
          label="Allow Registration"
          value={fields.allowRegistration}
          onChange={this.toggleAllowRegistration}
        />

        <Toggle
          label="Allow Offline"
          value={fields.offline}
          onChange={this.toggleAllowOffline}
        />

        <footer className="iap-apps-form__footer">
          <Button
            type="submit"
            Icon={loading ? LoadingIcon : SaveIcon}
            disabled={loading || Validation.hasError(validation)}
            error={!loading && !!error}
          >
            Save changes
          </Button>
          <Button
            transparent
            disabled={loading}
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        </footer>
      </form>
    );
  }
}

ApplicationForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  application: PropTypes.shape({
    name: PropTypes.string,
  }),
  error: PropTypes.instanceOf(Error),
};

ApplicationForm.defaultProps = {
  loading: false,
  application: null,
  error: null,
};

export default ApplicationForm;
