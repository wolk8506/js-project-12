import { Spinner } from 'spin.js';
import opts from './spinner';

const movie = document.querySelector('.movie');

const axios = require('axios');

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

// *****  Запрос популярных фильмов ****************************************
export default function moviePopular(numberPage = 1) {
  var target = document.querySelector('body');
  var spinner = new Spinner(opts).spin(target);
  return axios
    .get(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${numberPage}`)
    .then(response => {
      // console.log(response.data);
      spinner.stop();
      renderPagination(response.data.total_pages);
      render(response.data.results);
    });
}
moviePopular();

// *****  Запрос жанров фильмоы  *******************************************
function movieGenre() {
  var target = document.querySelector('body');
  var spinner = new Spinner(opts).spin(target);
  return axios
    .get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      spinner.stop();
      return saveStorageGenres(response.data.genres);
    });
}
movieGenre();

function saveStorageGenres(genres) {
  var target = document.querySelector('body');
  var spinner = new Spinner(opts).spin(target);
  genres.map(({ id, name }) => {
    spinner.stop();
    return localStorage.setItem(`${id}`, `${name}`);
  });
}

// *************************************************************************

function render(markup) {
  movie.innerHTML = markup
    .map(({ original_title, poster_path, genre_ids, release_date, vote_average, id }) => {
      return `
      <a class="movie-item" data-id="${id}"href="#" onclick="event.preventDefault()">
      <img class="movie-img" src="https://image.tmdb.org/t/p/w500${poster_path}" />
      <h2 class="movie-title">${original_title}</h2>
      <ul class="movie-blok-info">
      <li>${genre_ids.map(genre_ids => localStorage.getItem(genre_ids)).join(', ')}</li>
      <li class="movie-year">&nbsp;|&nbsp;${release_date.substr(0, 4)}</li>
      <li class="movie-vote_average">${vote_average.toFixed(1)}</li>
      </ul>
      </a>`;
    })
    .join('');
}

// *****  Поиск по названию фильма  *****

const input = document.querySelector('.search-form');
let QUERY_PROMT = '';
input.addEventListener('input', inputSearch);
input.addEventListener('submit', loadImages);

function loadImages(e) {
  e.preventDefault();
  movieSearch();
}
function inputSearch() {
  QUERY_PROMT = input.searchQuery.value;
}

function movieSearch() {
  var target = document.querySelector('body');
  var spinner = new Spinner(opts).spin(target);
  return axios
    .get(
      `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${QUERY_PROMT}&page=1&include_adult=false&page=1`,
    )
    .then(response => {
      spinner.stop();
      return render(response.data.results);
    });
}
// *****  Рендер пагинации ТОЛЬКО ДЛЯ ПОПУЛЯРНЫХ ФИЛЬМОВ *************
const moviePogination = document.querySelector('.movie-pogination');
const nextClick = document.querySelector('.next-click');
const prevClick = document.querySelector('.prev-click');

prevClick.addEventListener('click', prevClickFu);
nextClick.addEventListener('click', nextClickFu);

let count = 1;

function renderPagination(pages) {
  moviePogination.innerHTML = `
 <p>1</p>
 <p>${count}</p>
 <p>${pages}</p>`;
}

function nextClickFu() {
  count++;
  moviePopular(count);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevClickFu() {
  if (count <= 1) {
    return;
  } else count--;
  moviePopular(count);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
