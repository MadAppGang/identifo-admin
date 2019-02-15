import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preview from './Preview';
import Form from './Form';
import Button from '~/components/shared/Button';
import SectionHeader from '~/components/shared/SectionHeader';
import {
  fetchAccountSettings, postAccountSettings,
} from '~/modules/account/actions';
import EditIcon from '~/components/icons/EditIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';

class AdminAccountSettings extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
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
    const { posting, fetching, settings } = this.props;

    return (
      <div className="iap-settings-section">
        <SectionHeader
          title="Admin Account"
          description="These are credentials used to login into admin panel"
        />

        <main>
          {editing && (
            <Form
              posting={posting}
              settings={settings}
              onCancel={this.handleEditCancel}
              onSubmit={this.handleFormSubmit}
            />
          )}
          {!editing && (
            <>
              <Preview fetching={fetching} settings={settings} />
              <Button
                disabled={fetching}
                Icon={fetching ? LoadingIcon : EditIcon}
                onClick={this.handleEditClick}
              >
                Edit admin account
              </Button>
            </>
          )}
        </main>
      </div>
    );
  }
}

AdminAccountSettings.propTypes = {
  fetchSettings: PropTypes.func.isRequired,
  postSettings: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    email: PropTypes.string,
  }),
};

AdminAccountSettings.defaultProps = {
  settings: null,
};

const mapStateToProps = state => ({
  posting: state.account.posting,
  fetching: state.account.fetching,
  settings: state.account.settings,
});

const actions = {
  fetchSettings: fetchAccountSettings,
  postSettings: postAccountSettings,
};

export default connect(mapStateToProps, actions)(AdminAccountSettings);
