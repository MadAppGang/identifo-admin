import React, { Component } from 'react';
import update from '@madappgang/update-by-path';
import PropTypes from 'prop-types';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import userFormValidationRules from './validationRules';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
import * as Validation from '~/utils/validation';

import './UserForm.css';

class UserForm extends Component {
  constructor() {
    super();

    this.validate = Validation.applyRules(userFormValidationRules);

    this.state = {
      fields: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validation: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInput({ target }) {
    let { validation } = this.state;

    if (validation[target.name]) {
      validation = update(validation, { [target.name]: '' });
    }

    this.setState(state => ({
      fields: update(state.fields, {
        [target.name]: target.value,
      }),
      validation,
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

  handleSubmit(event) {
    event.preventDefault();

    const validation = this.validate('all', this.state.fields);

    if (Validation.hasError(validation)) {
      this.setState({ validation });
      return;
    }

    const { fields } = this.state;

    this.props.onSubmit(update(fields, 'confirmPassword', undefined));
  }

  render() {
    const { saving, error } = this.props;
    const { validation, fields } = this.state;
    const { email, name, password, confirmPassword } = fields;

    return (
      <form className="iap-users-form" onSubmit={this.handleSubmit}>
        {error && (
          <FormErrorMessage error={error} />
        )}

        <Field label="Name">
          <Input
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            errorMessage={validation.name}
          />
        </Field>

        <Field label="Email">
          <Input
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            errorMessage={validation.email}
          />
        </Field>

        <Field label="Password">
          <Input
            name="password"
            type="password"
            value={password}
            placeholder="Enter password"
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
            placeholder="Enter password once more"
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            errorMessage={validation.confirmPassword}
          />
        </Field>


        <footer className="iap-users-form__footer">
          <Button
            type="submit"
            Icon={saving ? LoadingIcon : SaveIcon}
            disabled={saving || Validation.hasError(validation)}
            error={!!error}
          >
            Save User
          </Button>
          <Button transparent onClick={this.props.onCancel} disabled={saving}>
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
  error: PropTypes.instanceOf(Error),
};

UserForm.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
  saving: false,
  error: null,
};

export default UserForm;
