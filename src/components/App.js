import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import AppProvider from '../client/Provider';

class App extends React.Component {
  render() {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        {' | '}
        <br/>
        <h1>samplr</h1>
        <AppProvider>
          {this.props.children}
        </AppProvider>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
