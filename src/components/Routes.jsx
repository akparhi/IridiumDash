import React from 'react';
import Button from '@atlaskit/button';

import { Consumer } from 'providers';

const Routes = () => (
  <Consumer>
    {({ actions }) => <Button onClick={actions.logout}>Logout </Button>}
  </Consumer>
);

export default Routes;
