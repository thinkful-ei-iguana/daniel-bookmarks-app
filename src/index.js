import './index.css';
import state from './state';
import api from './api';

function main() {
  api.updateBookmark('ck2m2igdo000t0ky8a9k6tkmj', {
    rating: 3,
    desc: 'the description has been changed!'
  });
  api.getBookmarks();
}

main();
