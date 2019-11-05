import views from './views.js';
import state from './state.js';

const baseUrl = 'https://thinkful-list-api.herokuapp.com/daniel-kent';

function getBookmarks() {
  return fetch(`${baseUrl}/bookmarks`)
    .then(res => res.json())
    .then(bookmarks => {
      state.bookmarks = bookmarks;
      console.log(bookmarks);
      views.render();
    });
}

function createBookmark(bookmark) {
  let body = JSON.stringify(bookmark);
  return fetch(`${baseUrl}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  }).then(res => res.json())
    .then(json => console.log(json));
}

function deleteBookmark(id) {
  return fetch(`${baseUrl}/bookmarks/${id}`, {
    method: 'DELETE'
  }).then( res =>
    console.log(`bookmark: ${id} deleted`)
  );
}

function updateBookmark(id, bookmark) {
  let body = JSON.stringify(bookmark);
  return fetch(`${baseUrl}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: body
  }).then(res => res.json())
    .then(x => console.log('Bookmark Updated'));
}

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
  updateBookmark
};
