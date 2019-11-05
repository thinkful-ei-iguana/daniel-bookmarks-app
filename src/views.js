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
    <ul class="bookmarks-list">`;

  bookmarks.forEach(bookmark => {
    html += generateBookmarkItem(bookmark);
  });

  html += `
    </ul>
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

function generateApp(state) {
  return `
    ${generateButtonsContainer()}
    ${generateBookmarksList(state.bookmarks)}
  `;
}

function render() {
  const html = generateApp(state);
  $('.border-container').html(html);
}

export default {
  generateApp,
  render
};