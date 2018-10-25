import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class extends Component {
  @service('games-store') gamesStore;

  results = null;
  isLoading = true;

  @action
  async searchForGames(ev) {
    ev.preventDefault();
    let { searchTerm } = this;

    if (!searchTerm) {
      return alert('You must type in a search term!');
    }

    this.set('isLoading', true);
    this.set('results', await this.gamesStore.search(searchTerm));
    this.set('isLoading', false);
  }

  @action
  clear() {
    this.set('results', null);
    this.set('searchTerm', null);
    this.set('searchTerm', null);
  }

  @action
  async addFavorite(game) {
    await this.gamesStore.addFavorite(game.id);

    this.clear();
  }
}
