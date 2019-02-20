import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { postApplication } from '~/modules/applications/actions';
import { compose } from '~/utils/fn';

const goBackPath = '/management/applications';

class NewApplicationView extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { saving } = this.props;

    return (
      <section className="iap-management-section">
        <header>
          <div>
            <Link to={goBackPath} className="iap-management-section__back">
              ← &nbsp;Applications
            </Link>
          </div>
          <p className="iap-management-section__title">
            Create Application
          </p>
          <p className="iap-management-section__description">
            Configure the allowed Callback URLs and Secrets for your Application.
          </p>
        </header>
        <main>
          
        </main>
      </section>
    );
  }
}

NewApplicationView.propTypes = {
  saving: PropTypes.bool,
};

NewApplicationView.defaultProps = {
  saving: false,
};

const mapStateToProps = state => ({
  saving: state.selectedApplication.saving,
});

const actions = {
  postApplication,
};

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(NewApplicationView);
