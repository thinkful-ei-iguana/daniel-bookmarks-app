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
  state.bookmarks[0].expanded = true;
  let item;
  if (bookmark.expanded) {
    item = `
      <li class="bookmark-item expanded">
        <div class="expanded-title">
            <span class="bookmark-title">expanded title</span>
            <span class=""><i class="material-icons">delete</i></span>
        </div>
        <div class="expanded-description">
          <button class="visit-btn btn">Visit Site</button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </li>
    `;
  } else {
    item = `
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
  
  return item;
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
    body = generateButtonsContainer() + generateBookmarksList(state.bookmarks);
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