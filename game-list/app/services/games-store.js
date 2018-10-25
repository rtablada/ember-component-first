import Service from '@ember/service';

export default class extends Service {
  games = null;

  constructor() {
    super(...arguments);
  }

  async loadData() {
    const req = await fetch('http://localhost:3000/games', {
      credentials: 'include'
    });
    const games = await req.json();

    this.set('games', games);
  }
}
