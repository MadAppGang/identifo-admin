import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import Toggle from '~/components/shared/Toggle';
import saveIcon from '~/assets/icons/save.svg';

class AdminAccountForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      editPassword: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.toggleEditPassword = this.toggleEditPassword.bind(this);
  }

  handleInput({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  toggleEditPassword() {
    this.setState(state => ({ editPassword: !state.editPassword }));
  }

  render() {
    const { email, password, editPassword, confirmPassword } = this.state;

    return (
      <form className="iap-settings-form">
        <Field label="Email">
          <Input
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={this.handleInput}
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
              />
            </Field>

            <Field label="Confirm Password">
              <Input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={this.handleInput}
              />
            </Field>
          </div>
        )}

        <footer className="iap-settings-form__footer">
          <Button icon={saveIcon}>
            Save changes
          </Button>
          <Button transparent onClick={this.props.onCancel}>
            Cancel
          </Button>
        </footer>
      </form>
    );
  }
}

AdminAccountForm.propTypes = {
  onCancel: PropTypes.func,
};

AdminAccountForm.defaultProps = {
  onCancel: null,
};

export default AdminAccountForm;
