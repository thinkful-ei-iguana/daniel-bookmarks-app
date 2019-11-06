import api from './api.js';
import views from './views.js';

//  ____  _        _       
// / ___|| |_ __ _| |_ ___ 
// \___ \| __/ _` | __/ _ \
//  ___) | || (_| | ||  __/
// |____/ \__\__,_|\__\___|
                      
let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

export default {
  bookmarks,
  adding,
  error,
  filter
};
