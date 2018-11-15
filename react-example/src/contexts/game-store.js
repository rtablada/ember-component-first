import React, { Component, createContext } from "react";

const Context = createContext();

export class Container extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      games: []
    };
  }

  loadData = async () => {
    const req = await fetch('http://game-list-api.herokuapp.com/games', {
      credentials: 'include'
    });
    const games = await req.json();

    this.setState({
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
    return <Context.Provider value={{
      state: this.state,
      loadData: this.loadData
    }}>
        {this.props.children}
      </Context.Provider>;
  }
}

export default Context;
