import state from './state.js';
import api from './api.js';
import views from './views.js';

//  _____                 _     _   _                 _ _               
// | ____|_   _____ _ __ | |_  | | | | __ _ _ __   __| | | ___ _ __ ___ 
// |  _| \ \ / / _ \ '_ \| __| | |_| |/ _` | '_ \ / _` | |/ _ \ '__/ __|
// | |___ \ V /  __/ | | | |_  |  _  | (_| | | | | (_| | |  __/ |  \__ \
// |_____| \_/ \___|_| |_|\__| |_| |_|\__,_|_| |_|\__,_|_|\___|_|  |___/                                                                     

function handleToggleExpanded() {
  // toggles expanded status of bookmark items and renders

  $('.app-container').on('click', '.toggle-expanded', event => {
    let id = views.getIdFromElement(event.currentTarget);
    let index = state.bookmarks.findIndex(x => x.id === id);
    state.bookmarks[index].expanded = !state.bookmarks[index].expanded;
    views.render();
  });
}

function handleNewItemClicked() {
  // Changes the view to new form and renders

  $('.app-container').on('click', '.new-btn', event => {
    state.adding = true;
    views.render();
  });
}

function handleNewCancelClicked() {
  // Reverts from New Bookmark Form without submitting

  $('.app-container').on('click', '.cancel-btn', event => {
    event.preventDefault();
    state.adding = false;
    views.render();
  });
}

function handleDeleteBookmarkClicked() {
  // deletes a bookmark item and renders updated bookmark list

  $('.app-container').on('click', '.delete-bookmark', event => {
    const id = views.getIdFromElement(event.currentTarget);
    api.deleteBookmark(id);
  });
}

function handleNewBookmarkSubmit() {
  // Creates a new bookmark item and renders updated bookmark list

  $('.app-container').on('submit', '.submit-form', event => {
    event.preventDefault();
    const formData = serializeJson(event.currentTarget);
    console.log(formData);
    api.createBookmark(formData);
  });
}

// _   _      _                     
// | | | | ___| |_ __   ___ _ __ ___ 
// | |_| |/ _ \ | '_ \ / _ \ '__/ __|
// |  _  |  __/ | |_) |  __/ |  \__ \
// |_| |_|\___|_| .__/ \___|_|  |___/
//              |_|                  

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

//   __  __       _       
//  |  \/  | __ _(_)_ __  
//  | |\/| |/ _` | | '_ \ 
//  | |  | | (_| | | | | |
//  |_|  |_|\__,_|_|_| |_|
                       
function main() {
  api.getBookmarks();
  handleToggleExpanded();
  handleNewItemClicked();
  handleNewCancelClicked();
  handleDeleteBookmarkClicked();
  handleNewBookmarkSubmit();
}

main();
