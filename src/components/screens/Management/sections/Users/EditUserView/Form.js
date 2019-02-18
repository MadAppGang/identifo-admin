import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Toggle from '~/components/shared/Toggle';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import editUserFormValidationRules from './validationRules';
import * as Validation from '~/utils/validation';

class EditUserForm extends Component {
  constructor() {
    super();

    this.validate = Validation.applyRules(editUserFormValidationRules);

    this.state = {
      fields: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
      validation: {
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
    this.handleBlur = this.handleBlur.bind(this);
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

    this.props.onSubmit(update(fields, {
      password: password => editPassword ? password : '',
      confirmPassword: '',
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

    return (
      <form className="iap-users-form" onSubmit={this.handleSubmit}>
        <Field label="Name">
          <Input
            name="name"
            value={fields.name}
            placeholder="Enter name"
            onChange={this.handleFieldChange}
            onBlur={this.handleBlur}
            errorMessage={validation.name}
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
                onBlur={this.handleBlur}
                errorMessage={validation.password}
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
              />
            </Field>
          </>
        )}

        <footer className="iap-users-form__footer">
          <Button
            type="submit"
            Icon={SaveIcon}
            disabled={Validation.hasError(validation)}
          >
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
