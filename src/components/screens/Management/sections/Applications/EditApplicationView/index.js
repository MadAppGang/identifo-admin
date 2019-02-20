import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { alterApplication } from '~/modules/applications/actions';
import { compose } from '~/utils/fn';

const goBackPath = '/management/applications';

class EditApplicationView extends Component {
  constructor() {
    super();

    this.state = {};
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.push(goBackPath);
  }

  render() {
    const { id, saving } = this.props;

    return (
      <section className="iap-management-section">
        <header>
          <div>
            <Link to={goBackPath} className="iap-management-section__back">
              ← &nbsp;Applications
            </Link>
          </div>
          <div className="iap-management-section__title">
            Application Details
          </div>
          <p className="iap-management-section__description">
            <span className="iap-section-description__id">
              id:&nbsp;
              {id}
            </span>
          </p>
        </header>
        <main>

        </main>
      </section>
    );
  }
}

EditApplicationView.propTypes = {
  saving: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

EditApplicationView.defaultProps = {
  saving: false,
};

const mapStateToProps = (state, props) => ({
  id: props.match.params.appid,
  saving: state.selectedApplication.saving,
});

const actions = {
  alterApplication,
};

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(EditApplicationView);
