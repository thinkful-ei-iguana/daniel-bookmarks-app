import views from './views.js';
import state from './state.js';

const baseUrl = 'https://thinkful-list-api.herokuapp.com/daniel-kent';

//     _    ____ ___ 
//    / \  |  _ \_ _|
//   / _ \ | |_) | | 
//  / ___ \|  __/| | 
// /_/   \_\_|  |___| 

function getBookmarks() {
  return apiFetch(`${baseUrl}/bookmarks`)
    .then(bookmarks => {
      state.bookmarks = bookmarks;
      views.render();
    }).catch(err => {
      state.error = err;
      views.render();
    });
}

function createBookmark(bookmark) {
  // let body = JSON.stringify(bookmark);
  return apiFetch(`${baseUrl}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bookmark
  })
    .then(json => {
      state.adding = false;
      getBookmarks();
    }).catch(err => {
      state.error = err;
      views.render();
    });
}

function deleteBookmark(id) {
  return apiFetch(`${baseUrl}/bookmarks/${id}`, {
    method: 'DELETE'
  }).then( res => {
    getBookmarks();
  }).catch(err => {
    state.error = err;
    views.render();
  });
}

function updateBookmark(id, bookmark) {
  let body = JSON.stringify(bookmark);
  return apiFetch(`${baseUrl}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: body
  }).then(x => console.log('Bookmark Updated'))
    .catch(err => {
      state.error = err;
      views.render();
    });
}

const apiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if(!res.ok) {
        error = {code: res.status};
        state.error = error;
        // console.log(state.error);
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
  updateBookmark,
  apiFetch
};
