import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import * as Validation from '@dprovodnikov/validation';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Toggle from '~/components/shared/Toggle';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import editUserFormValidationRules from './validationRules';
import FormErrorMessage from '~/components/shared/FormErrorMessage';

const sanitize = (fields) => {
  const { tfaEnabled, role, ...sanitized } = fields;
  return sanitized;
};

class EditUserForm extends Component {
  constructor() {
    super();

    this.validate = Validation.applyRules(editUserFormValidationRules);

    this.state = {
      fields: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        tfaEnabled: false,
        role: '',
        phone: '',
        active: false,
      },
      validation: {
        email: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      editPassword: false,
    };

    this.toggleEditPassword = this.toggleEditPassword.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleTFA = this.toggleTFA.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;

    if (user && user !== prevProps.user) {
      this.setState(state => ({
        fields: update(state.fields, {
          email: user.email,
          username: user.username,
          tfaEnabled: user.tfa_info ? user.tfa_info.is_enabled : false,
          role: user.access_role || '',
          active: user.active || false,
          phone: user.phone || '',
        }),
      }));
    }
  }

  toggleEditPassword() {
    this.setState(state => ({
      editPassword: !state.editPassword,
      validation: update(state.validation, {
        password: '',
        confirmPassword: '',
      }),
    }));
  }

  handleFieldChange({ target }) {
    const { name, value } = target;
    let { validation } = this.state;

    if (validation[name]) {
      validation = update(validation, { [name]: '' });
    }

    this.setState(state => ({
      fields: update(state.fields, {
        [name]: value,
      }),
      validation,
    }));
  }

  toggleTFA(value) {
    this.handleFieldChange({ target: { name: 'tfaEnabled', value } });
  }

  toggleActive(value) {
    this.handleFieldChange({ target: { name: 'active', value } });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { fields, editPassword } = this.state;

    const validation = this.validate('all', fields, {
      omit: editPassword ? [] : ['password', 'confirmPassword'],
    });

    if (Validation.hasError(validation)) {
      this.setState({ validation });
      return;
    }

    this.props.onSubmit(update(sanitize(fields), {
      password: password => editPassword ? password : '',
      confirmPassword: '',
      tfa_info: {
        is_enabled: fields.tfaEnabled,
      },
      access_role: fields.role,
    }));
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

  render() {
    const { fields, editPassword, validation } = this.state;
    const { loading, error } = this.props;

    return (
      <form className="iap-users-form" onSubmit={this.handleSubmit}>
        {!!error && (
          <FormErrorMessage error={error} />
        )}

        <Field label="Username">
          <Input
            name="username"
            value={fields.username}
            placeholder="Enter username"
            onChange={this.handleFieldChange}
            onBlur={this.handleBlur}
            errorMessage={validation.username}
            disabled={loading}
          />
        </Field>

        <Field label="Access Role">
          <Input
            name="role"
            value={fields.role}
            placeholder="Enter access role"
            onChange={this.handleFieldChange}
            onBlur={this.handleBlur}
            disabled={loading}
          />
        </Field>

        <Field label="Email">
          <Input
            name="email"
            value={fields.email}
            placeholder="Enter email"
            onChange={this.handleFieldChange}
            onBlur={this.handleBlur}
            errorMessage={validation.email}
            disabled={loading}
          />
        </Field>

        <Field label="Pnone Number">
          <Input
            name="phone"
            value={fields.phone}
            placeholder="Enter phone number"
            onChange={this.handleFieldChange}
            onBlur={this.handleBlur}
            errorMessage={validation.phone}
            disabled={loading}
          />
        </Field>

        <div>
          <Toggle
            label="Enable 2FA"
            value={fields.tfaEnabled}
            onChange={this.toggleTFA}
          />

          <Toggle
            label="Active"
            value={fields.active}
            onChange={this.toggleActive}
          />

          <Toggle
            label="Edit Password"
            value={editPassword}
            onChange={this.toggleEditPassword}
          />
        </div>

        {editPassword && (
          <>
            <Field label="Password">
              <Input
                name="password"
                type="password"
                placeholder="Enter new password"
                value={fields.password}
                onChange={this.handleFieldChange}
                onBlur={this.handleBlur}
                errorMessage={validation.password}
                disabled={loading}
              />
            </Field>

            <Field label="Confirm Password">
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Enter new password"
                value={fields.confirmPassword}
                onChange={this.handleFieldChange}
                onBlur={this.handleBlur}
                errorMessage={validation.confirmPassword}
                disabled={loading}
              />
            </Field>
          </>
        )}

        <footer className="iap-users-form__footer">
          <Button
            type="submit"
            Icon={loading ? LoadingIcon : SaveIcon}
            disabled={loading || Validation.hasError(validation)}
            error={!loading && !!error}
          >
            Save Changes
          </Button>
          <Button transparent onClick={this.props.onCancel} disabled={loading}>
            Cancel
          </Button>
        </footer>
      </form>
    );
  }
}

EditUserForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  error: PropTypes.instanceOf(Error),
};

EditUserForm.defaultProps = {
  loading: false,
  user: {
    email: '',
    name: '',
  },
  onCancel: () => {},
  error: null,
};

export default EditUserForm;
