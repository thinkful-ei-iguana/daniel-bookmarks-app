import state from './state.js';

function generateButtonsContainer() {
  return `
    <div class="buttons-container">
      <button class="new-btn btn">+ New</button>
      <select id="filter-select" class="drop-down btn"></select>
    </div>
  `;
}

function generateBookmarksList(bookmarks) {
  let html = `
    <div class="border-container">
      <ul class="bookmarks-list">`;

  bookmarks.forEach(bookmark => {
    html += generateBookmarkItem(bookmark);
  });

  html += `
      </ul>
    </div>
  `;

  return html;
}

function generateBookmarkItem(bookmark) {
  return `
    <li class="bookmark-item">
      <span class="bookmark-title">${bookmark.title}</span>
      <span class="bookmark-stars">
        <i class="material-icons star">star</i
        ><i class="material-icons star">star</i
        ><i class="material-icons star">star</i
        ><i class="material-icons star">star</i
        ><i class="material-icons star">star</i>
      </span>
    </li>
  `;
}

function generateAddForm() {
  return `
    <form action="submit">
      <label for="url">Add New Bookmark</label>
      <input name="url" id="url" type="url" placeholder="www.example.com">
      <div class="border-container">
        <header class="form-header">
          <span>Link Walkthrough</span>
          <span class="material-icons">edit</span>
        </header>
        <div class="form-container">
          <div class="star-select">
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
          </div>

          <textarea name="description" id="description" placeholder="Add a description (optional)"></textarea>

          <div class="buttons-container">
            <button class="cancel-btn btn">Cancel</button>
            <button type="submit" class="submit-btn btn">Submit</button>
          </div>
        </div>
      </div>
    </form>
  `;
}

function generateApp(state) {
  let body;
  if (state.adding) {
    console.log(state);
    body =  generateAddForm();
  } else {
    body = generateButtonsContainer() + generateBookmarksList();
  }
  return body;
}

function render() {
  const html = generateApp(state);
  $('.app-container').html(html);
}

export default {
  generateApp,
  render
};