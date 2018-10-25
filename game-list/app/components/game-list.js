import Component from '@ember/component';
import { service } from '@ember-decorators/service';

export default class extends Component {
  @service('games-store') gamesStore;

  constructor() {
    super(...arguments);

    this.loadData();
  }

  async loadData() {
    this.set('loading', true);

    await this.gamesStore.loadAllGames();

    this.set('loading', false);
  }
}
