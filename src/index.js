import state from './state.js';
import api from './api.js';
import views from './views.js';

function handleToggleExpanded() {
  $('.app-container').on('click', '.toggle-expanded', event => {
    let id = views.getIdFromElement(event.currentTarget);
    let index = state.bookmarks.findIndex(x => x.id === id);
    state.bookmarks[index].expanded = !state.bookmarks[index].expanded;
    views.render();
  });
}

function handleNewItemClicked() {
  $('.app-container').on('click', '.new-btn', event => {
    console.log('new handler ran');
    state.adding = true;
    views.render();
  });
}

function main() {
  api.getBookmarks();
  handleToggleExpanded();
  handleNewItemClicked();
}

main();
