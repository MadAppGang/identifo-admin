import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import saveIcon from '~/assets/icons/save.svg';
import loadingIcon from '~/assets/icons/loading.svg';
import DatabaseDropdown, { MONGO_DB, DYNAMO_DB } from './DatabaseDropdown';

class ConnectionSettingsForm extends Component {
  constructor({ settings }) {
    super();

    this.state = {
      settings,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleDBTypeChange = this.handleDBTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput({ target }) {
    this.setState(state => ({
      settings: update(state.settings, {
        [target.name]: target.value,
      }),
    }));
  }

  handleDBTypeChange(type) {
    this.setState(state => ({
      settings: update(state.settings, { type }),
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    let { settings } = this.state;

    settings = update(settings, {
      region: region => settings.type === DYNAMO_DB ? region : '',
      name: name => settings.type === MONGO_DB ? name : '',
    });

    this.props.onSubmit(settings);
  }

  render() {
    const { settings } = this.state;
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
            />
          </Field>

          <footer className="iap-db-form__footer">
            <Button
              type="submit"
              icon={posting ? loadingIcon : saveIcon}
              disabled={posting}
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
