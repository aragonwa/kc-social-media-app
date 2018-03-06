import React, { Component } from 'react';
import Results from './Results';
import Search from './Search';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {showResults: false}
    this.toggleResults = this.toggleResults.bind(this);
  }
  toggleResults(){
    this.setState({showResults: !this.state.showResults});
  }
  render() {
    return <div>
        <Search toggleResults={this.toggleResults}/>
        {this.state.showResults && <Results />}
      </div>;
  }
}

export default App;
