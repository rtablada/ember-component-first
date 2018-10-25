import React, { Component } from 'react';
import GameTile from './GameTile';
import GameStore from './contexts/game-store';

class GameList extends Component {
  static contextType = GameStore

  constructor() {
    super(...arguments);
    this.state = {
      games: [],
      isLoading: false
    };
  }

  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    this.setState({ ...this.state, isLoading: true });

    await this.context.loadData();

    this.setState({ ...this.state, isLoading: false });
  }

  render() {
    let { isLoading } = this.state;
    let { games } = this.context.state;

    if (isLoading) {
      return (
        <h2 style={{animation: 'spin 4s infinite linear', display: 'inline-block' }}>Loading</h2>
      );
    } else {
      return games.map((game => (
        <GameTile
          key={game.id}
          title={game.title}
          year={game.year}
          imageUrl={game.imageUrl}
          description={game.description}
        />
      )));
    }
  }
}

export default GameList;
