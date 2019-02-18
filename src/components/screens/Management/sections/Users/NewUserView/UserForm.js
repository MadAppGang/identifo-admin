import React, { Component } from 'react';
import update from '@madappgang/update-by-path';
import PropTypes from 'prop-types';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';

import './UserForm.css';

class UserForm extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput({ target }) {
    this.setState(state => ({
      fields: update(state.fields, {
        [target.name]: target.value,
      }),
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { fields } = this.state;

    this.props.onSubmit(update(fields, 'confirmPassword', undefined));
  }

  render() {
    const { email, name, password, confirmPassword } = this.state.fields;
    const { saving } = this.props;

    return (
      <form className="iap-users-form" onSubmit={this.handleSubmit}>
        <Field label="Name">
          <Input
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={this.handleInput}
          />
        </Field>

        <Field label="Email">
          <Input
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={this.handleInput}
          />
        </Field>

        <Field label="Password">
          <Input
            name="password"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={this.handleInput}
          />
        </Field>

        <Field label="Confirm Password">
          <Input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            placeholder="Enter password once more"
            onChange={this.handleInput}
          />
        </Field>

        <footer className="iap-users-form__footer">
          <Button Icon={saving ? LoadingIcon : SaveIcon} type="submit">
            Save User
          </Button>
          <Button transparent onClick={this.props.onCancel}>
            Cancel
          </Button>
        </footer>
      </form>
    );
  }
}

UserForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  saving: PropTypes.bool,
};

UserForm.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
  saving: false,
};

export default UserForm;
