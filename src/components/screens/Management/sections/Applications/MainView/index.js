import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ApplicationsPlaceholder from './Placeholder';
import Button from '~/components/shared/Button';
import AddIcon from '~/components/icons/AddIcon';
import ApplicationList from './ApplicationList';

class ApplicationsMainView extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
    };
  }

  render() {
    const { applications, fetching, history } = this.props;
    const { searchQuery } = this.state;

    if (!applications.length && !fetching && !searchQuery) {
      return (
        <section className="iap-management-section">
          <ApplicationsPlaceholder />
        </section>
      );
    }

    return (
      <section className="iap-management-section">
        <p className="iap-management-section__title">
          Applications
          <Button
            Icon={AddIcon}
            onClick={() => history.push('/management/applications')}
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
};

ApplicationsMainView.defaultProps = {
  applications: [
    {
      id: '1',
      type: 'ios',
      clientId: '4AOlbR7eGCsuuA43bhmahd9iZ14lzcPY',
    },
    {
      id: '2',
      type: 'web',
      clientId: 'TlWqkOPFr1hJVL70LjTk19eTayNst6cU',
    },
  ],
  fetching: false,
};

export default withRouter(ApplicationsMainView);
