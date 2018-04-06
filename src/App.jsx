import React from 'react';
import Router from 'react-router-dom/Router';
import Route from 'react-router-dom/Route';
import createHistory from 'history/createBrowserHistory';
import { injectGlobal } from 'styled-components';

import Loadable from 'packages/Loadable';
import PrivateRoute from 'packages/PrivateRoute';
import { Provider, Consumer } from 'providers';

const history = createHistory();
const Login = Loadable(() => import('pages/Login'));
const Routes = Loadable(() => import('components/Routes'));

injectGlobal`
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif;
    overflow-x: hidden;
  }

  textarea,
  input,
  button,
  select {
    outline: none !important;
  }`;

const App = () => (
  <Provider>
    <Consumer>
      {({ state }) => (
        <Router history={history}>
          <div className="routes">
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              exact
              path="/*"
              component={Routes}
              authenticated={state.authenticated}
            />
          </div>
        </Router>
      )}
    </Consumer>
  </Provider>
);

export default App;
