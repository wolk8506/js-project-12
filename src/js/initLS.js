let movieWatched = JSON.parse(localStorage.getItem('movieWatched'));
if (movieWatched === null) {
  localStorage.setItem('movieWatched', JSON.stringify([]));
}

let movieQueue = JSON.parse(localStorage.getItem('movieQueue'));
if (movieQueue === null) {
  localStorage.setItem('movieQueue', JSON.stringify([]));
}
