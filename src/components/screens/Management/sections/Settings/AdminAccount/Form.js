import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import Toggle from '~/components/shared/Toggle';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import accountFormValidationRules from './validationRules';
import * as Validation from '~/utils/validation';

class AdminAccountForm extends Component {
  constructor({ settings }) {
    super();

    this.validate = Validation.applyRules(accountFormValidationRules);

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
    const { name, value } = target;
    const validationMessage = this.validate(name, {
      ...this.state,
      [name]: value,
    });

    this.setState(state => ({
      validation: update(state.validation, {
        [name]: validationMessage,
      }),
    }));
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

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, editPassword } = this.state;

    const validation = this.validate('all', this.state, {
      omit: editPassword ? [] : ['password', 'confirmPassword'],
    });

    if (Validation.hasError(validation)) {
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
            disabled={posting || Validation.hasError(validation)}
            Icon={posting ? LoadingIcon : SaveIcon}
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
