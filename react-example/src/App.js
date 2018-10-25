import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameList from './GameList';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="title" style={ {color: 'red' } } onClick={() => alert('hello world')}>Hello World</h1>

        <GameList />
      </div>
    );
  }
}

export default App;
