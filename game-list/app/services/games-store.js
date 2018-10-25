import Service from '@ember/service';

export default class extends Service {
  games = null;

  constructor() {
    super(...arguments);
  }

  async loadAllGames() {
    const req = await fetch('http://localhost:3000/games', {
      credentials: 'include'
    });
    const games = await req.json();

    this.set('games', games);
  }

  async search(searchTerm) {
    let req = await fetch(`http://localhost:3000/games/search?search=${searchTerm}`);

    return await req.json();
  }

  async addFavorite(id) {
    let req = await fetch(`http://localhost:3000/games/add`, {
      body: JSON.stringify({ id: id }),
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    let game = await req.json();

    this.set('games', [...this.games, game]);
  }
}
