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

    const req = await fetch('https://game-list-api.herokuapp.com/games', {
      credentials: 'include'
    });
    const games = await req.json();

    this.set('loading', false);
    this.set('games', games);
  }
}
