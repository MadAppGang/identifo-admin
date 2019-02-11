import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from '@madappgang/update-by-path';
import { fetchSettings, postSettings } from '~/modules/database/actions';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import saveIcon from '~/assets/icons/save.svg';
import loadingIcon from '~/assets/icons/loading.svg';
import DatabaseDropdown, { MONGO_DB, DYNAMO_DB } from './DatabaseDropdown';

class ConnectionSettingsForm extends Component {
  constructor() {
    super();

    this.state = {
      settings: {
        type: '',
        name: '',
        region: '',
        endpoint: '',
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleDBTypeChange = this.handleDBTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSettings();
  }

  componentDidUpdate(prevProps) {
    const { fetching, settings } = this.props;
    const fetched = !fetching && prevProps.fetching;

    if (fetched && settings) {
      this.setState({ settings });
    }
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
    this.props.postSettings(this.state.settings);
  }

  render() {
    const { settings } = this.state;
    const { posting, fetching } = this.props;
    const { type, name, region, endpoint } = settings;

    return (
      <div className="iap-db-connection-section">
        <form className="iap-db-form" onSubmit={this.handleSubmit}>
          <Field label="Database type">
            <DatabaseDropdown
              selectedValue={type}
              disabled={posting || fetching}
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
                disabled={posting || fetching}
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
                disabled={posting || fetching}
                onChange={this.handleInput}
              />
            </Field>
          )}

          <Field label="Endpoint">
            <Input
              name="endpoint"
              value={endpoint}
              placeholder="e.g. localhost:27017"
              disabled={posting || fetching}
              onChange={this.handleInput}
            />
          </Field>

          <footer className="iap-db-form__footer">
            <Button
              type="submit"
              icon={posting ? loadingIcon : saveIcon}
              disabled={posting || fetching}
            >
              Save changes
            </Button>
            <Button transparent onClick={this.props.onCancel}>
              Cancel
            </Button>
          </footer>
        </form>
      </div>
    );
  }
}

ConnectionSettingsForm.propTypes = {
  fetchSettings: PropTypes.func.isRequired,
  postSettings: PropTypes.func.isRequired,
  posting: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    type: PropTypes.string,
    endpoint: PropTypes.string,
    name: PropTypes.string,
    region: PropTypes.string,
  }),
  onCancel: PropTypes.func,
};

ConnectionSettingsForm.defaultProps = {
  settings: null,
  onCancel: null,
};

const mapStateToProps = state => ({
  fetching: state.database.fetching,
  posting: state.database.posting,
  settings: state.database.settings,
});

const actions = {
  fetchSettings, postSettings,
};

export default connect(mapStateToProps, actions)(ConnectionSettingsForm);
