import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="nav">
          <a className="nav-link active" href="#">Active</a>
          <a className="nav-link" href="#">Link</a>
          <a className="nav-link" href="#">Link</a>
          <a className="nav-link disabled" href="#">Disabled</a>
        </nav>
      </div>
    );
  }
}

export default App;
