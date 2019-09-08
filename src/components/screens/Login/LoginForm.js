import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, checkAuthState, resetError } from '~/modules/auth/actions';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';
import EmailIcon from '~/components/icons/EmailIcon';
import PasswordIcon from '~/components/icons/PasswordIcon';
import FormErrorMessage from '~/components/shared/FormErrorMessage';

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
        <h1 className="login-form__logo">
          <span>
            identifo
          </span>

          <span>
            Admin Panel
          </span>
        </h1>

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
          <Button
            stretch
            type="submit"
            disabled={signingIn}
            Icon={signingIn ? LoadingIcon : null}
            error={!!error}
          >
            Sign In
          </Button>
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

const mapStateToProps = state => ({
  signingIn: state.auth.inProgress,
  error: state.auth.error,
});

const actions = {
  login, resetError, checkAuthState,
};

export default connect(mapStateToProps, actions)(LoginForm);
