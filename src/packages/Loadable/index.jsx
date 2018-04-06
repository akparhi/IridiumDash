import React, { Component } from 'react';

export default importComponent => {
  class Loadable extends Component {
    state = {
      component: null
    };

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({ component });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return Loadable;
};
