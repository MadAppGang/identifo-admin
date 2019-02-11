import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import Toggle from '~/components/shared/Toggle';
import saveIcon from '~/assets/icons/save.svg';
import loadingIcon from '~/assets/icons/loading.svg';

class AdminAccountForm extends Component {
  constructor({ settings }) {
    super();

    this.state = {
      email: settings.email,
      password: '',
      confirmPassword: '',
      editPassword: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { email, password, editPassword, confirmPassword } = this.state;
    const { posting } = this.props;

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
          <Button
            disabled={posting}
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
