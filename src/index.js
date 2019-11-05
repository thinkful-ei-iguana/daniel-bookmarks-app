import state from './state.js';
import api from './api.js';
import views from './views.js';

function handleToggleExpanded() {
  $('.app-container').on('click', '.toggle-expanded', event => {
    console.log('click handler worked');
    let id = views.getIdFromElement(event.currentTarget);
    let index = state.bookmarks.findIndex(x => x.id === id);
    state.bookmarks[index].expanded = !state.bookmarks[index].expanded;
    views.render();
  });
}

function main() {
  api.getBookmarks();
  handleToggleExpanded();
}

main();
