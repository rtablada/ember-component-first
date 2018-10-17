import Component from '@ember/component';

const timeout = (t) => new Promise((r) => window.setTimeout(r, t));

export default class extends Component {
  constructor() {
    super(...arguments);
    this.set('games', []);

    this.loadData();
  }

  async loadData() {
    this.set('loading', true);

    const req = await fetch('http://localhost:3000/games', {
      credentials: 'include'
    });
    const games = await req.json();

    this.set('loading', false);
    this.set('games', games.map(g => ({
      title: g.name,
      rating: g.esrb.rating,
      imageUrl: g.cover.url,
      description: g.summary,
      id: g.id
    })));
  }
}
