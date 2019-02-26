import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, checkAuthState, resetError } from '~/modules/auth/actions';
import Input from '~/components/shared/Input';
import LoginButton from './LoginButton';
import EmailIcon from '~/components/icons/EmailIcon';
import PasswordIcon from '~/components/icons/PasswordIcon';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
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

  componentDidMount() {
    this.props.checkAuthState();
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    this.props.login(email, password);
  }

  handleErrorClick() {
    this.props.resetError();
  }

  render() {
    const { email, password } = this.state;
    const { signingIn, error } = this.props;

    return (
      <form className="iap-login-form" onSubmit={this.handleSubmit}>
        <p className="iap-login-form__title">
          Identifo
        </p>

        {error && (
          <div className="iap-login-form__err">
            <FormErrorMessage error={error} />
          </div>
        )}

        <Input
          name="email"
          value={email}
          placeholder="Email"
          disabled={signingIn}
          Icon={EmailIcon}
          onChange={this.handleInput}
        />

        <Input
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          disabled={signingIn}
          Icon={PasswordIcon}
          onChange={this.handleInput}
        />

        <footer className="iap-login-form__footer">
          <LoginButton loading={signingIn} error={!signingIn && !!error} />
        </footer>
      </form>
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
  checkAuthState: PropTypes.func.isRequired,
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
  checkAuthState,
};

export { LoginForm };

export default connect(mapStateToProps, actions)(LoginForm);
