import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class extends Component {
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

    let req = await fetch(`http://localhost:3000/games/search?search=${searchTerm}`);
    let data = await req.json();

    this.set('results', data);
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
    let req = await fetch(`http://localhost:3000/games/add`, {
      body: JSON.stringify({ id: game.id }),
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    await req.json();
    this.clear();
  }
}
