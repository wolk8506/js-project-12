const movie = document.querySelector('.movie');

const axios = require('axios');

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

// *****  Запрос популярных фильмов ****************************************
export default function moviePopular(numberPage = 1) {
  return axios
    .get(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${numberPage}`)
    .then(response => {
      // console.log(response.data.results);
      renderPagination(numberPage, response.data.total_pages);
      render(response.data.results);
    });
}
moviePopular();

// *****  Запрос жанров фильмоы  *******************************************
function movieGenre() {
  return axios
    .get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      return saveStorageGenres(response.data.genres);
    });
}
movieGenre();

function saveStorageGenres(genres) {
  genres.map(({ id, name }) => {
    return localStorage.setItem(`${id}`, `${name}`);
  });
}

// *************************************************************************

function render(markup) {
  movie.innerHTML = markup
    .map(({ original_title, poster_path, genre_ids, release_date, vote_average, id }) => {
      console.log('id', id);
      return `
      <a class="movie-item" href="#" id=${id}>
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
  return axios
    .get(
      `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${QUERY_PROMT}&page=1&include_adult=false&page=1`,
    )
    .then(response => {
      return render(response.data.results);
    });
}
// *****  Рендер пагинации ТОЛЬКО ДЛЯ ПОПУЛЯРНЫХ ФИЛЬМОВ *************
const moviePogination = document.querySelector('.movie-pogination');
const nextClick = document.querySelector('.next-click');
const prevClick = document.querySelector('.prev-click');

prevClick.addEventListener('click', prevClickFu);
nextClick.addEventListener('click', nextClickFu);

let page = 1;

function renderPagination(page, pages) {
  let beforePage = page - 1;
  let afterPage = page + 1;
  let tagPage = '';
  let active;
  for (let i = beforePage; i <= afterPage; i++) {
    console.log('i', i);

    if (page === i || i === 0) {
      active = 'active';
    } else {
      active = '';
    }
    if (i > pages) {
      continue;
    }

    if (i == 0) {
      i = i + 1;
    }

    tagPage += `<p class='numberPage ${active}'>${i}</p>`;
  }

  if (page < pages - 1) {
    if (page < pages - 2) {
      tagPage += `<p class='numberPage'>...</p>`;
    }
    tagPage += `<p class='numberPage'>${pages}</p>`;
  }

  // moviePogination.innerHTML = `

  //   <p class='numberPage active'>1</p>
  //  <p class='numberPage'>${page}</p>

  //  <p class='numberPage'>${pages}</p>
  //  `;
  moviePogination.innerHTML = tagPage;
}

function nextClickFu() {
  page++;
  moviePopular(page);
}

function prevClickFu() {
  if (page <= 1) {
    return;
  } else page--;
  moviePopular(page);
}
