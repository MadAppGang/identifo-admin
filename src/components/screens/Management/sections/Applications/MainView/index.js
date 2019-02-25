import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ApplicationsPlaceholder from './Placeholder';
import Button from '~/components/shared/Button';
import AddIcon from '~/components/icons/AddIcon';
import { fetchApplications } from '~/modules/applications/actions';
import ApplicationList from './ApplicationList';
import { compose } from '~/utils/fn';

class ApplicationsMainView extends Component {
  constructor() {
    super();

    this.initiateCreation = this.initiateCreation.bind(this);
  }

  componentDidMount() {
    this.props.fetchApplications();
  }

  initiateCreation() {
    this.props.history.push('/management/applications/new');
  }

  render() {
    const { applications, fetching } = this.props;

    if (!applications.length && !fetching) {
      return (
        <section className="iap-management-section">
          <ApplicationsPlaceholder
            onCreateApplicationClick={this.initiateCreation}
          />
        </section>
      );
    }

    return (
      <section className="iap-management-section">
        <p className="iap-management-section__title">
          Applications
          <Button
            Icon={AddIcon}
            onClick={this.initiateCreation}
          >
            Create application
          </Button>
        </p>

        <p className="iap-management-section__description">
          Setup an iOS, Android or Web application to use Identifo.
        </p>

        <ApplicationList loading={fetching} applications={applications} />
      </section>
    );
  }
}

ApplicationsMainView.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.shape()),
  fetching: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  fetchApplications: PropTypes.func.isRequired,
};

ApplicationsMainView.defaultProps = {
  applications: [],
  fetching: false,
};

const mapStateToProps = state => ({
  fetching: state.applications.fetching,
  applications: state.applications.list,
});

const actions = {
  fetchApplications,
};

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(ApplicationsMainView);
