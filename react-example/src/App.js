import React, { Component } from 'react';
import './App.css';
import GameList from './GameList';
import { Container as GameStore } from './contexts/game-store';

class App extends Component {
  render() {
    return (
      <GameStore>
        <h1 className="title" style={ {color: 'red' } } onClick={() => alert('hello world')}>Hello World</h1>

        <GameList />
      </GameStore>
    );
  }
}

export default App;
