import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class extends Component {
  results = null;
  isLoading = false;

  @action
  async searchForGames(ev) {
    ev.preventDefault();
    let { searchTerm } = this;

    if (!searchTerm) {
      return alert('You must type in a search term!');
    }

    this.set('isLoading', true);

    let req = await fetch(`https://game-list-api.herokuapp.com/games/search?search=${searchTerm}`);
    let data = await req.json();

    this.set('results', data);
    this.set('isLoading', false);
  }
}
