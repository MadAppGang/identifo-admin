import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Toggle from '~/components/shared/Toggle';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';

class EditUserForm extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
      editPassword: false,
    };

    this.toggleEditPassword = this.toggleEditPassword.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEditPassword() {
    this.setState(state => ({
      editPassword: !state.editPassword,
    }));
  }

  handleFieldChange({ target }) {
    const { name, value } = target;

    this.setState(state => ({
      fields: update(state.fields, {
        [name]: value,
      }),
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { fields, editPassword } = this.state;

    this.props.onSubmit(update(fields, {
      password: password => editPassword ? password : '',
      confirmPassword: '',
    }));
  }

  render() {
    const { fields, editPassword } = this.state;

    return (
      <form className="iap-users-form" onSubmit={this.handleSubmit}>
        <Field label="Name">
          <Input
            name="name"
            value={fields.name}
            placeholder="Enter name"
            onChange={this.handleFieldChange}
          />
        </Field>

        <Field label="Email">
          <Input
            name="email"
            value={fields.email}
            placeholder="Enter email"
            onChange={this.handleFieldChange}
          />
        </Field>

        <Toggle label="Edit Password" onChange={this.toggleEditPassword} />

        {editPassword && (
          <>
            <Field label="Password">
              <Input
                name="password"
                type="password"
                placeholder="Enter new password"
                value={fields.password}
                onChange={this.handleFieldChange}
              />
            </Field>

            <Field label="Confirm Password">
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Enter new password"
                value={fields.confirmPassword}
                onChange={this.handleFieldChange}
              />
            </Field>
          </>
        )}

        <footer className="iap-users-form__footer">
          <Button Icon={SaveIcon} type="submit">
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

EditUserForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

EditUserForm.defaultProps = {
  onCancel: () => {},
};

export default EditUserForm;
