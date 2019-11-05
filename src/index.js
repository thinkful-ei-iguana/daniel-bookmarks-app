import state from './state.js';
import api from './api.js';
import views from './views.js';

function main() {
  api.createBookmark({title: 'hero', url: 'http://www.exaple.com'})
  api.getBookmarks();
}

main();
