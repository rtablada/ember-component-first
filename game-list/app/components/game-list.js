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
    await timeout(1000);
    this.set('loading', false);
    this.set('games', [
      {
        title: "Overwatch",
        year: "2016",
        imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/fen88hu0vhcf3k3owkxd.jpg",
        description: "A good first person shooter",
      },
      {
        title: "Mario Party Ultimate",
        year: "2018",
        imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/rvadchpkfknklxmckmmk.jpg",
        description: "A great way to compete with friends!",
      }
    ]);
  }
}
