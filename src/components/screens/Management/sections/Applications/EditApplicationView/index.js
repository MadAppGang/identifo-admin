import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  alterApplication,
  deleteApplicationById,
} from '~/modules/applications/actions';
import { compose } from '~/utils/fn';
import ApplicationForm from '../shared/ApplicationForm';
import ActionsButton from '~/components/shared/ActionsButton';

const goBackPath = '/management/applications';

class EditApplicationView extends Component {
  constructor(props) {
    super();

    this.state = {};
    this.goBack = this.goBack.bind(this);

    this.availableActions = [{
      title: 'Delete Application',
      onClick: () => props.deleteApplicationById(props.id),
    }];
  }

  handleSubmit(changes) {
    const { id } = this.props;

    this.props.alterApplication(id, changes);
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
            <ActionsButton loading={saving} actions={this.availableActions} />
          </div>
          <p className="iap-management-section__description">
            <span className="iap-section-description__id">
              id:&nbsp;
              {id}
            </span>
          </p>
        </header>
        <main>
          <ApplicationForm
            loading={saving}
            onCancel={this.goBack}
            onSubmit={this.handleSubmit}
          />
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
  alterApplication: PropTypes.func.isRequired,
  deleteApplicationById: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
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
  deleteApplicationById,
};

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(EditApplicationView);
