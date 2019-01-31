import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, resetError } from '~/modules/auth/actions';
import ErrorMessage from './ErrorMessage';
import './Form.css';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrorClick = this.handleErrorClick.bind(this);
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  handleErrorClick() {
    this.props.resetError();
  }

  render() {
    const { email, password } = this.state;
    const { error } = this.props;

    return (
      <div className="iap-login-form">
        <p className="iap-login-form__title">
          Identifo
        </p>

        {error && (
          <ErrorMessage
            message={error.message}
            onClick={this.handleErrorClick}
          />
        )}

        <input
          name="email"
          type="text"
          className="iap-login-form__input"
          value={email}
          placeholder="Email"
          onChange={this.handleInput}
        />

        <input
          name="password"
          type="password"
          className="iap-login-form__input"
          value={password}
          placeholder="Password"
          onChange={this.handleInput}
        />

        <button
          type="button"
          className="iap-login-form__submit-btn"
          onClick={this.handleSubmit}
        >
          Sign In
        </button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  signingIn: PropTypes.bool,
  login: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

LoginForm.defaultProps = {
  signingIn: false,
  error: null,
};

const mapStateToProps = (state) => {
  return {
    signingIn: state.auth.signingIn,
    error: state.auth.error,
  };
};

const actions = {
  login,
  resetError,
};

export default connect(mapStateToProps, actions)(LoginForm);
