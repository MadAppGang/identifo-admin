import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import Toggle from '~/components/shared/Toggle';
import saveIcon from '~/assets/icons/save.svg';
import loadingIcon from '~/assets/icons/loading.svg';
import validate from './validate';

const hasError = validation => Object.values(validation).some(value => !!value);

class AdminAccountForm extends Component {
  constructor({ settings }) {
    super();

    this.state = {
      email: settings.email,
      password: '',
      confirmPassword: '',
      editPassword: false,
      validation: {
        password: '',
        confirmPassword: '',
        email: '',
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleEditPassword = this.toggleEditPassword.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;
    let { validation } = this.state;

    if (validation[name]) {
      validation = update(validation, { [name]: '' });
    }

    this.setState({
      [name]: value,
      validation,
    });
  }

  handleBlur({ target }) {
    const { name: field, value } = target;

    let validationMessage = '';

    if (field === 'confirmPassword') {
      validationMessage = validate(field, value, this.state.password);
    } else {
      validationMessage = validate(field, value);
    }

    this.setState(state => ({
      validation: update(state.validation, {
        [field]: validationMessage,
      }),
    }));
  }

  toggleEditPassword() {
    this.setState(state => ({ editPassword: !state.editPassword }));
  }

  validateForm() {
    const { email, password, confirmPassword, editPassword } = this.state;

    return {
      email: validate('email', email),
      password: editPassword
        ? validate('password', password)
        : '',
      confirmPassword: editPassword
        ? validate('confirmPassword', confirmPassword, password)
        : '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, editPassword } = this.state;

    const validation = this.validateForm();

    if (hasError(validation)) {
      this.setState({ validation });
      return;
    }

    this.props.onSubmit({
      email,
      password: editPassword ? password : null,
    });
  }

  render() {
    const {
      email, password, editPassword, confirmPassword, validation,
    } = this.state;
    const { posting } = this.props;

    return (
      <form className="iap-settings-form" onSubmit={this.handleSubmit}>
        <Field label="Email">
          <Input
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            errorMessage={validation.email}
          />
        </Field>

        <Toggle label="Edit password" onChange={this.toggleEditPassword} />

        {editPassword && (
          <div className="iap-settings-form__password-fields">
            <Field label="Password">
              <Input
                name="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={this.handleInput}
                onBlur={this.handleBlur}
                errorMessage={validation.password}
              />
            </Field>

            <Field label="Confirm Password">
              <Input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={this.handleInput}
                onBlur={this.handleBlur}
                errorMessage={validation.confirmPassword}
              />
            </Field>
          </div>
        )}

        <footer className="iap-settings-form__footer">
          <Button
            type="submit"
            disabled={posting || hasError(validation)}
            icon={posting ? loadingIcon : saveIcon}
          >
            Save changes
          </Button>
          <Button
            transparent
            disabled={posting}
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        </footer>
      </form>
    );
  }
}

AdminAccountForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    email: PropTypes.string,
  }),
  posting: PropTypes.bool,
};

AdminAccountForm.defaultProps = {
  onCancel: null,
  settings: {
    email: '',
  },
  posting: false,
};

export default AdminAccountForm;
