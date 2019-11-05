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
  let item;
  if (bookmark.expanded) {
    item = `
      <li class="bookmark-item expanded" data-bookmark-id="${bookmark.id}">
        <div class="expanded-title toggle-expanded">
            <span class="bookmark-title">${bookmark.title}</span>
            <span class="delete-bookmark"><i class="material-icons">delete</i></span>
        </div>
        <div class="expanded-description">
          <button class="visit-btn btn">Visit Site</button>
          <p>${bookmark.description}</p>
        </div>
      </li>
    `;
  } else {
    item = `
      <li class="bookmark-item toggle-expanded" data-bookmark-id="${bookmark.id}">
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
    <form class="submit-form" action="submit">
      <label for="url">Add New Bookmark</label>
      <input name="url" id="url" type="url" value="https://">
      <div class="border-container">
        <header class="form-header">
          <label for="title">Name:</label>
          <input name="title" id="title" type="text">
        </header>
        <div class="form-container">
          <div class="star-select">
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
          </div>

          <textarea name="desc" id="desc" placeholder="Add a description (optional)"></textarea>

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
    body =  generateAddForm();
  } else {
    body = generateButtonsContainer() + generateBookmarksList(state.bookmarks);
  }
  return body;
}

function getIdFromElement(el) {
  return $(el)
    .closest('.bookmark-item')
    .data('bookmark-id');
}

function render() {
  const html = generateApp(state);
  $('.app-container').html(html);
}

export default {
  generateApp,
  render,
  getIdFromElement
};