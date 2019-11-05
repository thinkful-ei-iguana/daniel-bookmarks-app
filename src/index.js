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
    state.adding = true;
    views.render();
  });
}

function handleNewCancelClicked() {
  $('.app-container').on('click', '.cancel-btn', event => {
    event.preventDefault();
    state.adding = false;
    views.render();
  });
}

function handleDeleteBookmarkClicked() {
  $('.app-container').on('click', '.delete-bookmark', event => {
    const id = views.getIdFromElement(event.currentTarget);
    api.deleteBookmark(id);
  });
}

function handleNewBookmarkSubmit() {
  $('.app-container').on('submit', '.submit-form', event => {
    event.preventDefault();
    const formData = serializeJson(event.currentTarget);
    console.log(formData);
    api.createBookmark(formData);
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

function main() {
  api.getBookmarks();
  handleToggleExpanded();
  handleNewItemClicked();
  handleNewCancelClicked();
  handleDeleteBookmarkClicked();
  handleNewBookmarkSubmit();
}

main();
