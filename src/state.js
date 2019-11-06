
//  ____  _        _       
// / ___|| |_ __ _| |_ ___ 
// \___ \| __/ _` | __/ _ \
//  ___) | || (_| | ||  __/
// |____/ \__\__,_|\__\___|

let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;
let editing = false;

function filterBookmarksByRating(bookmarks, filter) {
  const filteredBookmarks =  bookmarks.filter(bookmark => bookmark.rating >= filter);
  return filteredBookmarks;
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  filterBookmarksByRating,
  editing
};
