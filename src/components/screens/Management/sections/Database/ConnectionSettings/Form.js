import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import DatabaseDropdown, { MONGO_DB, DYNAMO_DB } from './DatabaseDropdown';
import databaseFormValidationRules from './validationRules';
import * as Validation from '~/utils/validation';

class ConnectionSettingsForm extends Component {
  constructor({ settings }) {
    super();

    this.validate = Validation.applyRules(databaseFormValidationRules);

    this.state = {
      settings,
      validation: {
        type: '',
        endpoint: '',
        name: '',
        region: '',
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleDBTypeChange = this.handleDBTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  getFieldsToOmitDuringValidation() {
    switch (this.state.settings.type) {
      case DYNAMO_DB: return ['name'];
      case MONGO_DB: return ['region'];
      default: return [];
    }
  }

  handleInput({ target }) {
    const { name, value } = target;
    let { validation } = this.state;

    if (validation[name]) {
      validation = update(validation, { [name]: '' });
    }

    this.setState(state => ({
      settings: update(state.settings, {
        [name]: value,
      }),
      validation,
    }));
  }

  handleBlur({ target }) {
    const { name, value } = target;
    const validationMessage = this.validate(name, {
      ...this.state.settings,
      [name]: value,
    });

    this.setState(state => ({
      validation: update(state.validation, {
        [name]: validationMessage,
      }),
    }));
  }

  handleDBTypeChange(type) {
    this.setState(state => ({
      settings: update(state.settings, { type }),
      validation: Validation.reset(state.validation),
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const validation = this.validate('all', this.state.settings, {
      omit: this.getFieldsToOmitDuringValidation(),
    });

    if (Validation.hasError(validation)) {
      this.setState({ validation });
      return;
    }

    let { settings } = this.state;

    settings = update(settings, {
      region: region => settings.type === DYNAMO_DB ? region : '',
      name: name => settings.type === MONGO_DB ? name : '',
    });

    this.props.onSubmit(settings);
  }

  render() {
    const { settings, validation } = this.state;
    const { posting } = this.props;
    const { type, name, region, endpoint } = settings;

    return (
      <div className="iap-db-connection-section">
        <form className="iap-db-form" onSubmit={this.handleSubmit}>
          <Field label="Database type">
            <DatabaseDropdown
              selectedValue={type}
              disabled={posting}
              onChange={this.handleDBTypeChange}
            />
          </Field>

          {type === DYNAMO_DB && (
            <Field label="Region">
              <Input
                name="region"
                value={region}
                placeholder="e.g. ap-northeast-3"
                onChange={this.handleInput}
                disabled={posting}
                errorMessage={validation.region}
                onBlur={this.handleBlur}
              />
            </Field>
          )}

          {type === MONGO_DB && (
            <Field label="Name">
              <Input
                name="name"
                value={name}
                autoComplete="off"
                placeholder="e.g. identifo"
                disabled={posting}
                onChange={this.handleInput}
                errorMessage={validation.name}
                onBlur={this.handleBlur}
              />
            </Field>
          )}

          <Field label="Endpoint">
            <Input
              name="endpoint"
              value={endpoint}
              placeholder="e.g. localhost:27017"
              disabled={posting}
              onChange={this.handleInput}
              onBlur={this.handleBlur}
              errorMessage={validation.endpoint}
            />
          </Field>

          <footer className="iap-db-form__footer">
            <Button
              type="submit"
              Icon={posting ? LoadingIcon : SaveIcon}
              disabled={posting || Validation.hasError(validation)}
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
      </div>
    );
  }
}

ConnectionSettingsForm.propTypes = {
  posting: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    type: PropTypes.string,
    endpoint: PropTypes.string,
    name: PropTypes.string,
    region: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

ConnectionSettingsForm.defaultProps = {
  settings: {
    type: '',
    endpoint: '',
    name: '',
    region: '',
  },
  onCancel: null,
};

export default ConnectionSettingsForm;
