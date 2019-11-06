import state from './state.js';

//  _   _ _____ __  __ _        ____                           _                 
// | | | |_   _|  \/  | |      / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __ ___ 
// | |_| | | | | |\/| | |     | |  _ / _ \ '_ \ / _ \ '__/ _` | __/ _ \| '__/ __|
// |  _  | | | | |  | | |___  | |_| |  __/ | | |  __/ | | (_| | || (_) | |  \__ \
// |_| |_| |_| |_|  |_|_____|  \____|\___|_| |_|\___|_|  \__,_|\__\___/|_|  |___/
                                                                              
function generateButtonsContainer() {
  // Creates the HTML for the new bookmark button and the Filter Dropdown 

  return `
    <div class="buttons-container">
      <button class="new-btn btn">+ New</button>
      <select id="filter-select" class="drop-down btn"></select>
    </div>
  `;
}

function generateBookmarksList(bookmarks) {
  // Creates the HTML for the list of Bookmark Items

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
  // Creates the HTML for each bookmark in the bookmark list
  // Determines if the view is expanded 

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
          <p>${bookmark.desc}</p>
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
  // Creates HTML for the add new bookmark form

  return `
    <form class="submit-form" action="submit">
      <label for="url">Add New Bookmark</label>
      <input name="url" id="url" type="url" value="https://" required>
      <div class="border-container">
        <header class="form-header">
          <label for="title">Name:</label>
          <input name="title" id="title" type="text" required>
        </header>
        <div class="form-container">
          <div class="star-select">
            <label for="rating">Rating: </label>
            
            <input type="radio" name="rating" value="1" id="one" class="radio one">
            <label for="one">
              <i class="material-icons star-label one">star</i>
            </label>
            <input type="radio" name="rating" value="2" id="two" class="radio two">
            <label for="two">
              <i class="material-icons star-label two">star</i>
            </label>
            <input type="radio" name="rating" value="3" id="three" class="radio three">
            <label for="three">
              <i class="material-icons star-label three">star</i>
            </label>
            <input type="radio" name="rating" value="4" id="four" class="radio four">
            <label for="four">
              <i class="material-icons star-label four">star</i>
            </label>
            <input type="radio" name="rating" value="5" id="five" class="radio five">
            <label for="five">
              <i class="material-icons star-label five">star</i>
            </label>
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
  // Uses state data and other generate functions to produce the final
  // html content of the bookmarks app.

  let body;
  if (state.adding) {
    body =  generateAddForm();
  } else {
    body = generateButtonsContainer() + generateBookmarksList(state.bookmarks);
  }
  return body;
}

//  _   _ _____ ___ _     ___ _____ ___ _____ ____  
// | | | |_   _|_ _| |   |_ _|_   _|_ _| ____/ ___| 
// | | | | | |  | || |    | |  | |  | ||  _| \___ \ 
// | |_| | | |  | || |___ | |  | |  | || |___ ___) |
//  \___/  |_| |___|_____|___| |_| |___|_____|____/ 

function getIdFromElement(el) {
  return $(el)
    .closest('.bookmark-item')
    .data('bookmark-id');
}

function colorStars() {
  $('.app-container').on('change', '.radio', event => {
    console.log();
    if ($(event.currentTarget).prop('checked')) {
      $('.one, .two, .three, .four, .five').removeClass('gold');
      const el = event.currentTarget;
      if ($(el).hasClass('five')) {
        $('.one, .two, .three, .four, .five').addClass('gold');
      }
      if ($(el).hasClass('four')) {
        $('.one, .two, .three, .four').addClass('gold');
      }
      if ($(el).hasClass('three')) {
        $('.one, .two, .three').addClass('gold');
      }
      if ($(el).hasClass('two')) {
        $('.one, .two').addClass('gold');
      }
      if ($(el).hasClass('one')) $('.one').addClass('gold');
    }
  });
}

function render() {
  const html = generateApp(state);
  $('.app-container').html(html);
}

export default {
  generateApp,
  render,
  getIdFromElement,
  colorStars
};