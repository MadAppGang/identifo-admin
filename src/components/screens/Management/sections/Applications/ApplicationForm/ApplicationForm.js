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
        tfaStatus: '',
        authWay: '',
        defaultRole: '',
        active: false,
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
    this.toggleActive = this.toggleActive.bind(this);
    this.handleSecretChange = this.handleSecretChange.bind(this);
    this.handleTFAStatusChange = this.handleTFAStatusChange.bind(this);
    this.handleAuthWayChange = this.handleAuthWayChange.bind(this);
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
          tfaStatus: application.tfa_status || 'disabled',
          authWay: application.authorization_way || 'no_authorization',
          defaultRole: application.new_user_default_role || '',
          active: application.active || false,
        }),
      }));
    }
  }

  isExcluded(field) {
    return this.props.excludeFields.includes(field);
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

  handleTFAStatusChange(value) {
    this.handleInput({ target: { name: 'tfaStatus', value } });
  }

  handleAuthWayChange(value) {
    this.handleInput({ target: { name: 'authWay', value } });
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

  toggleActive(active) {
    this.setState(state => ({
      fields: update(state.fields, { active }),
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
      tfa_status: fields.tfaStatus,
      tfaStatus: undefined,
      authorization_way: fields.authWay,
      authWay: undefined,
      new_user_default_role: fields.defaultRole,
      defaultRole: undefined,
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

        {!this.isExcluded('name') && (
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
        )}

        {!this.isExcluded('active') && (
          <Toggle
            label="Active"
            value={!!fields.active}
            onChange={this.toggleActive}
          />
        )}


        {!this.isExcluded('type') && (
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
        )}

        {!this.isExcluded('tfaStatus') && (
          <Field label="2FA Status">
            <Select
              name="tfaStatus"
              value={fields.tfaStatus}
              disabled={loading}
              onChange={this.handleTFAStatusChange}
              placeholder="Select TFA Status"
            >
              <Option value="disabled" title="Disabled" />
              <Option value="mandaroty" title="Mandatory" />
              <Option value="optional" title="Optional" />
            </Select>
          </Field>
        )}

        {!this.isExcluded('authWay') && (
          <Field label="Authorization Way">
            <Select
              name="authWay"
              value={fields.authWay}
              disabled={loading}
              onChange={this.handleAuthWayChange}
              placeholder="Select Authorization Way"
            >
              <Option value="no_authorization" title="No Authorization" />
              <Option value="internal" title="Internal" />
              <Option value="whitelist" title="Whitelist" />
              <Option value="blacklist" title="Blacklist" />
              <Option value="external" title="External" />
            </Select>
          </Field>
        )}

        {!this.isExcluded('defaultRole') && (
          <Field label="New User Default Role">
            <Input
              name="defaultRole"
              value={fields.defaultRole}
              autoComplete="off"
              placeholder="User role"
              onChange={this.handleInput}
              onBlur={this.handleBlur}
              disabled={loading}
            />
          </Field>
        )}

        {!this.isExcluded('secret') && (
          <SecretField value={fields.secret} onChange={this.handleSecretChange} />
        )}

        {!this.isExcluded('redirectUrl') && (
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
        )}

        {!this.isExcluded('allowRegistration') && (
          <Toggle
            label="Allow Registration"
            value={!!fields.allowRegistration}
            onChange={this.toggleAllowRegistration}
          />
        )}

        {!this.isExcluded('offline') && (
          <Toggle
            label="Allow Offline"
            value={!!fields.offline}
            onChange={this.toggleAllowOffline}
          />
        )}

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
  excludeFields: PropTypes.arrayOf(PropTypes.string),
};

ApplicationForm.defaultProps = {
  loading: false,
  application: null,
  error: null,
  excludeFields: [],
};

export default ApplicationForm;
