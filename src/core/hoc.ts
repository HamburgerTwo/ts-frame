import React from 'react';

/**
 * Code-Split bundler HOC
 * @param {Promise} fn
 */

interface ComponentStateProps {
    Component: React.Component | null
}
function bundler(fn: any) {
  if (typeof fn !== 'function') {
    throw new TypeError('Bundler callback must be a function');
  }

  return class Bundler extends React.Component<{}, ComponentStateProps> {
    private isUnmounted: boolean

    constructor(props: any) {
      super(props);

      this.isUnmounted = false;
      this.state = {
        Component: null,
      };
    }

    componentWillMount() {
      Promise.resolve()
        .then(fn)
        .then((mod: any) => {
          if (!this.isUnmounted) {
            this.setState({
              Component: mod.__esModule ? mod.default : mod, // eslint-disable-line
            });
          }
        })
        .catch((err) => {
          if (!this.isUnmounted) {
           
            console.error(err); // eslint-disable-line no-console
          }
        });
    }

    componentWillUnmount() {
      this.isUnmounted = true;
    }

    render() {
      const { Component } = this.state;

      if (!Component) return null;
      if (typeof Component !== 'function') return null;

      return React.isValidElement(Component)
        ? React.cloneElement(Component, this.props)
        : React.createElement(Component, this.props);
    }
  };
}

export default bundler;