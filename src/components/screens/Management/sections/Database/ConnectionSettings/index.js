import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preview from './Preview';
import Form from './Form';
import Button from '~/components/shared/Button';
import SectionHeader from '~/components/shared/SectionHeader';
import editIcon from '~/assets/icons/edit.svg';
import loadingIcon from '~/assets/icons/loading.svg';
import { fetchSettings, postSettings } from '~/modules/database/actions';

import './index.css';

class ConnectionSettings extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
    };

    this.sectionDescription = {
      editing: 'You should select from supported database types and provide a connection for it.',
      preview: 'These values are used to create a connection to the database.',
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSettings();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posting && !this.props.posting) {
      this.handleEditCancel();
    }
  }

  handleEditClick() {
    this.setState({ editing: true });
  }

  handleEditCancel() {
    this.setState({ editing: false });
  }

  handleFormSubmit(settings) {
    this.props.postSettings(settings);
  }

  render() {
    const { editing } = this.state;
    const { fetching, posting, settings } = this.props;

    return (
      <div className="iap-settings-section">
        <SectionHeader
          title="Connection Settings"
          description={this.sectionDescription[editing ? 'editing' : 'preview']}
        />

        <main>
          {editing && (
            <Form
              posting={posting}
              settings={settings}
              onSubmit={this.handleFormSubmit}
              onCancel={this.handleEditCancel}
            />
          )}
          {!editing && (
            <>
              <Preview fetching={fetching} settings={this.props.settings} />
              <Button
                disabled={fetching}
                icon={fetching ? loadingIcon : editIcon}
                onClick={this.handleEditClick}
              >
                Edit database settings
              </Button>
            </>
          )}
        </main>
      </div>
    );
  }
}

ConnectionSettings.propTypes = {
  fetching: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  fetchSettings: PropTypes.func.isRequired,
  postSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    endpoint: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
};

ConnectionSettings.defaultProps = {
  settings: null,
};

const mapStateToProps = state => ({
  fetching: state.database.fetching,
  posting: state.database.posting,
  settings: state.database.settings,
});

const actions = {
  fetchSettings, postSettings,
};

export default connect(mapStateToProps, actions)(ConnectionSettings);
