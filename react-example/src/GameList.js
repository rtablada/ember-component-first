import React, { Component } from 'react';
import GameTile from './GameTile';

class GameList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      games: [],
      isLoading: false
    };

    this.loadData();
  }

  async loadData() {
    this.state.isLoading = true;

    const req = await fetch('http://game-list-api.herokuapp.com/games', {
      credentials: 'include'
    });
    const games = await req.json();

    this.setState({
      isLoading: false,
      games: games.map(g => ({
        title: g.name,
        rating: g.esrb.rating,
        imageUrl: g.cover.url,
        description: g.summary,
        id: g.id
      }))
    });
  }


  render() {
    let {isLoading, games} = this.state;

    if (isLoading) {
      return (
        <h2 style={{animation: 'spin 4s infinite linear', display: 'inline-block' }}>Loading</h2>
      );
    } else {
      return games.map((game => (
        <GameTile
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
