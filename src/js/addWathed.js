let renderMovied = [];
let btnDelMov = false;

// ****************************************
let movieWatched = JSON.parse(localStorage.getItem('movieWatched'));
// if (movieWatched === null) {
//   localStorage.setItem('movieWatched', JSON.stringify([]));
// }
console.log(movieWatched);
const btnAdd = document.querySelector('.modal-btn-add');
const movieModal = document.querySelector('.movie-modal-id');
movieModal.addEventListener('click', movieId);

function movieId(e) {
  if (e.path[1].nodeName !== 'A') {
    return;
  }
  console.log(e.path[1].dataset.id);
  if (movieWatched.includes(e.path[1].dataset.id)) {
    addClassList();
    return;
  }
  removeClassList();
}

btnAdd.addEventListener('click', addMovie);

function addMovie(e) {
  if (movieWatched.includes(e.path[0].value)) {
    return;
  }
  movieWatched.push(e.path[0].value);
  addClassList();
  movieIdF(movieWatched);
  localStorage.setItem('movieWatched', JSON.stringify(movieWatched));
}

function addClassList() {
  btnAdd.innerHTML = 'Movied';
}
function removeClassList() {
  btnAdd.innerHTML = 'ADD TO WATCHED';
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

// *****  Запрос фильмов ID *********************************
const axios = require('axios');

// movieIdF(movieWatched);

function movieIdF(movieId) {
  renderMovied = '';
  movieId.map(m =>
    axios.get(`${BASE_URL}movie/${m}?api_key=${API_KEY}&language=en-US`).then(response => {
      render(response.data);
    }),
  );
}

// *************************************************************************

let count = 0;

function render({ original_title, poster_path, genres, release_date, vote_average, id }) {
  renderMovied =
    renderMovied +
    `
      <a class="movie-item" data-id="${id}"href="#" onclick="event.preventDefault()">
      <img class="movie-img" src="https://image.tmdb.org/t/p/w500${poster_path}" />
      <h2 class="movie-title">${original_title}</h2>
      <ul class="movie-blok-info">
      <li>${genres.map(genre => genre.name).join(', ')}</li>
      <li class="movie-year">&nbsp;|&nbsp;${release_date.substr(0, 4)}</li>
      <li class="movie-vote_average">${vote_average.toFixed(1)}</li>
      </ul>
      </a>`;
  count++;
  if (movieWatched.length === count) {
    movie.innerHTML = renderMovied;
  }
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const moviePogination = document.querySelector('.movie-pogination');
const movie = document.querySelector('.movie');
const home = document.querySelector('.nav__list-text--home');

home.addEventListener('click', event => {
  event.preventDefault();
  btnDelMov = true;
  console.log(111111111);
  movie.innerHTML = renderMovied;
  movieIdF(movieWatched);
  moviePogination.innerHTML = '';
  console.log(renderMovied);
});
// !!!!!!!!!!!!удаление из массива

if (btnDelMov === true) {
  btnAdd.innerHTML = 'delete';
}
console.log(renderMovied.indexOf(25));
