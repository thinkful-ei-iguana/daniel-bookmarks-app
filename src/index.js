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

  // eslint-disable-next-line no-unused-vars
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
    event.stopPropagation();
    const confirmed = confirm('Are you sure you want to permenantly delete?'); 
    if (confirmed) {
      const id = views.getIdFromElement(event.currentTarget);
      api.deleteBookmark(id);
    }
    
  });
}

function handleNewBookmarkSubmit() {
  // Creates a new bookmark item and renders updated bookmark list

  $('.app-container').on('submit', '.submit-form', event => {
    event.preventDefault();
    const formData = serializeJson(event.currentTarget);
    api.createBookmark(formData);
  });
}

function handleFormStars() {
  $('.app-container').on('change', '.radio', event => {
    if ($(event.currentTarget).prop('checked')) {
      const el = event.currentTarget;
      let num;
      if ($(el).hasClass('five')) num = 5;
      if ($(el).hasClass('four')) num = 4;
      if ($(el).hasClass('three')) num = 3;
      if ($(el).hasClass('two')) num = 2;
      if ($(el).hasClass('one')) num = 1;

      views.colorStars(num);
    }
  });
}

function handleFilter() {
  $('.app-container').on('change', '#filter-select', event => {
    state.filter = $(event.currentTarget).val();
    views.render();
  });
}

function handleCloseError() {
  $('.app-container').on('click', '.close-error', event => {
    console.log('close error ran');
    state.error = null;
    views.render();
  });
}

function handleEditBookmarkClicked() {
  $('.app-container').on('click', '.edit-bookmark', event => {
    event.stopPropagation();
    state.editing = true;
    views.render();    
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
  handleFormStars();
  handleFilter();
  handleCloseError();
}

main();
