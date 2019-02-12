import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import Toggle from '~/components/shared/Toggle';
import saveIcon from '~/assets/icons/save.svg';
import loadingIcon from '~/assets/icons/loading.svg';

const comparePasswords = (password, confirmPassword) => {
  return password === confirmPassword;
};

const validateEmail = email => !!email;

class AdminAccountForm extends Component {
  constructor({ settings }) {
    super();

    this.state = {
      email: settings.email,
      password: '',
      confirmPassword: '',
      editPassword: false,
      validation: {
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

  validateForm() {
    const { email, password, confirmPassword } = this.state;

    const doPasswordsMatch = comparePasswords(password, confirmPassword);
    const isEmailValid = validateEmail(email);

    return Object.freeze({
      confirmPassword: doPasswordsMatch ? '' : 'Passwords do not match',
      email: isEmailValid ? '' : 'Email is not valid',
    });
  }

  isValid() {
    return Object.values(this.state.validation).every(value => !value);
  }

  handleBlur() {
    this.setState({
      validation: this.validateForm(),
    });
  }

  toggleEditPassword() {
    this.setState(state => ({ editPassword: !state.editPassword }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password, editPassword } = this.state;
    const settings = {
      email,
      password: editPassword ? password : null,
    };

    this.props.onSubmit(settings);
  }

  render() {
    const {
      email, password, editPassword, confirmPassword, validation,
    } = this.state;
    const { posting } = this.props;

    return (
      <form className="iap-settings-form">
        <Field label="Email">
          <Input
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={this.handleInput}
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
            disabled={posting || !this.isValid()}
            icon={posting ? loadingIcon : saveIcon}
            onClick={this.handleSubmit}
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
};

AdminAccountForm.defaultProps = {
  onCancel: null,
  settings: {
    email: '',
  },
};

export default AdminAccountForm;
