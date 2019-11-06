import state from './state.js';

//  _   _ _____ __  __ _        ____                           _                 
// | | | |_   _|  \/  | |      / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __ ___ 
// | |_| | | | | |\/| | |     | |  _ / _ \ '_ \ / _ \ '__/ _` | __/ _ \| '__/ __|
// |  _  | | | | |  | | |___  | |_| |  __/ | | |  __/ | | (_| | || (_) | |  \__ \
// |_| |_| |_| |_|  |_|_____|  \____|\___|_| |_|\___|_|  \__,_|\__\___/|_|  |___/
                                                                              
function generateButtonsContainer(filter) {
  // Creates the HTML for the new bookmark button and the Filter Dropdown 

  let focus = ['', '', '', '', '', ''];

  focus[filter] = 'selected';

  return `
    <div class="buttons-container">
      <button class="new-btn btn">+ New</button>
      <select id="filter-select" class="drop-down btn" >
        <option ${focus[0]} value=0 class="dropdown-label">Minimum Rating</option>
        <option value=0>All</option>
        <option ${focus[1]} value=1>One Star</option>
        <option ${focus[2]} value=2>Two Stars</option>
        <option ${focus[3]} value=3>Three Stars</option>
        <option ${focus[4]} value=4>Four Stars</option>
        <option ${focus[5]} value=5>Five Stars</option>
      </select>
    </div>
  `;
}

function generateBookmarksList(bookmarks, filter = 0) {
  // Creates the HTML for the list of Bookmark Items
  
  let filteredBookmarks = state.filterBookmarksByRating(bookmarks, filter); 
  let html = `
    <div class="border-container">
      <ul class="bookmarks-list">`;

  filteredBookmarks.forEach(bookmark => {
    html += generateBookmarkItem(bookmark);
  });

  html += `
      </ul>
    </div>
  `;

  return html;
}

function generateBookmarkStars(num) {
  // Creates stars according to the Rating

  let star = '<i class="material-icons star">star</i>';    
  let starsHtml = '';
  
  for (let x = 0; x < num; ++x) {
    starsHtml += star;
  }

  return `
    <span class="bookmark-stars">
      ${starsHtml}
    </span>
  `;
}

function generateBookmarkItem(bookmark) {
  // Creates the HTML for each bookmark in the bookmark list
  // Determines if the view is expanded 
  
  let item;
  let stars;
  if (bookmark.rating) {
    stars = generateBookmarkStars(bookmark.rating);
  } else {
    stars = '';
  }

  if (bookmark.expanded) {
    item = `
      <li class="bookmark-item expanded" data-bookmark-id="${bookmark.id}">
        <div class="expanded-title toggle-expanded">
            <span class="bookmark-title">${bookmark.title}</span>
            <span class="delete-bookmark"><i class="material-icons">delete</i></span>
        </div>
        <div class="expanded-description">
          ${stars}
          <a class="visit-btn btn" href="${bookmark.url}">Visit Site</a>
          <p>${bookmark.desc}</p>
        </div>
      </li>
    `;
  } else {
    item = `
      <li class="bookmark-item toggle-expanded" data-bookmark-id="${bookmark.id}">
        <span class="bookmark-title">${bookmark.title}</span>
        ${stars}
      </li>
    `;
  }
  
  return item;
}

function generateErrorMessage(error) {
  if (!error) {
    return '';
  } else {
    return `
      <div class="error-message">
        <p>${error.message}</p>
        <i class="material-icons close-error">close</i>
      </div>
    `;
  }
}

function generateAddForm() {
  // Creates HTML for the add new bookmark form

  return `
    ${generateErrorMessage(state.error)}
    <form class="submit-form" action="submit">
      <div class="border-container">
        <header class="form-header">
          Create New Bookmark
        </header>
        
          <div class="form-container">
          <input name="url" id="url" type="url" value="https://" required>
          <input name="title" id="title" type="text" placeholder="Bookmark Title" required>
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
    body = generateButtonsContainer(state.filter) + generateErrorMessage(state.error) + generateBookmarksList(state.bookmarks, state.filter);
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

function colorStars(num) {
  
  $('.one, .two, .three, .four, .five').removeClass('gold');
  
  if (num === 5) {
    $('.one, .two, .three, .four, .five').addClass('gold');
  }
  if (num === 4) {
    $('.one, .two, .three, .four').addClass('gold');
  }
  if (num === 3) {
    $('.one, .two, .three').addClass('gold');
  }
  if (num === 2) {
    $('.one, .two').addClass('gold');
  }
  if (num === 1) $('.one').addClass('gold');
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