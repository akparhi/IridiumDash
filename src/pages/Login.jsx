import React from 'react';
import Redirect from 'react-router-dom/Redirect';

import { Consumer } from 'providers';
import LoginForm from 'components/login/LoginForm';

const Login = ({ location }) => {
  return (
    <Consumer>
      {({ state, actions }) => (
        <>
          <LoginForm onLogin={actions.login} />
          {state.authenticated ? (
            <Redirect
              to={
                location.state && location.state.from
                  ? location.state.from.pathname
                  : '/'
              }
            />
          ) : null}
        </>
      )}
    </Consumer>
  );
};

export default Login;
