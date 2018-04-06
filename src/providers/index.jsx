import React, { Component, createContext } from 'react';

const RootCtx = createContext();

export class Provider extends Component {
  state = { authenticated: false, flushed: false };

  componentDidMount() {
    const { flushed } = this.state;
    if (!flushed) {
      let token = localStorage.getItem('token');
      if (token) return this.setState({ authenticated: true, flushed: true });
      return this.setState({ flushed: true });
    }
  }

  login = (email, password, next) =>
    fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(({ success, authed, data }) => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
        }
        if (success && authed) {
          this.setState({ authenticated: true }, next);
        }
      });

  logout = () => {
    this.setState({ authenticated: false });
    localStorage.removeItem('token');
  };

  render() {
    const { flushed } = this.state;

    if (!flushed) return <div>Loading</div>;

    return (
      <RootCtx.Provider
        value={{
          state: this.state,
          actions: {
            login: this.login,
            logout: this.logout
          }
        }}
      >
        {this.props.children}
      </RootCtx.Provider>
    );
  }
}

export const Consumer = ({ children }) => (
  <RootCtx.Consumer>{children}</RootCtx.Consumer>
);
