import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import './ApplicationForm.css';

class ApplicationForm extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        name: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;

    this.setState(state => ({
      fields: update(state.fields, {
        [name]: value,
      }),
    }));
  }

  handleBlur() {}

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit();
  }

  render() {
    const { fields } = this.state;
    const { loading } = this.props;

    return (
      <form className="iap-apps-form" onSubmit={this.handleSubmit}>
        <Field label="Name">
          <Input
            name="name"
            value={fields.name}
            placeholder="Enter name"
            onChange={this.handleInput}
            onBlur={this.handleBlur}
          />
        </Field>

        <footer className="iap-apps-form__footer">
          <Button
            Icon={loading ? LoadingIcon : SaveIcon}
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

ApplicationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ApplicationForm;
