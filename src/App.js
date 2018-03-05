import React, { Component } from 'react';
import Results from './Results';
import Search from './Search';
import './App.css';

class App extends Component {
  render() {
    return <div>
        <Search />
        <Results />
      </div>;
  }
}

export default App;
