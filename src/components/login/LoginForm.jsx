import React, { Component } from 'react';
import TextField from '@atlaskit/field-text';
import Button from '@atlaskit/button';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = e => this.setState({ [e.target.id]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onLogin(email, password);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          required
          id="email"
          label="Email"
          type="email"
          margin="normal"
          onChange={this.handleChange}
        />
        <TextField
          required
          id="password"
          label="Pasword"
          type="password"
          margin="normal"
          onChange={this.handleChange}
        />
        <Button appearance="primary" type="submit">
          Login
        </Button>
      </form>
    );
  }
}

export default LoginForm;
