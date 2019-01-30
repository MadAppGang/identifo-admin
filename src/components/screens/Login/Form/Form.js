import React, { Component } from 'react';
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
  }

  handleInput(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { email, password } = this.state;

    console.log(email, password);
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="iap-login-form">
        <p className="iap-login-form__title">
          Identifo
        </p>

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

export default LoginForm;
