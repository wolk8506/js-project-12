//Queue;
let openQueue = false;
let renderMovied = '';
let btnDelMov = false;
let movieQueue = JSON.parse(localStorage.getItem('movieQueue'));
// let count = 0;

const btnAdd = document.querySelector('.js-queue');
const movieModal = document.querySelector('.movie-modal-id');

movieModal.addEventListener('click', movieId);

function movieId(e) {
  if (e.path[1].nodeName !== 'A') {
    return;
  }
  console.log(e.path[1].dataset.id);
  if (movieQueue.includes(e.path[1].dataset.id)) {
    addClassList();
    return;
  }
  removeClassList();
}
btnAdd.addEventListener('click', addMovie);

function addMovie(e) {
  if (movieQueue.includes(e.path[0].value) && btnDelMov === false) {
    return;
  } else if (btnDelMov === true && movieQueue.includes(e.path[0].value)) {
    movieQueue.splice(movieQueue.indexOf(e.path[0].value), 1);
    removeClassList();
  } else if (btnDelMov === true && !movieQueue.includes(e.path[0].value)) {
    movieQueue.push(e.path[0].value);
    addClassList();
  }
  if (btnDelMov === false) {
    movieQueue.push(e.path[0].value);
  }

  if (btnDelMov === false) {
    addClassList();
  }
  movieIdF(movieQueue);
  localStorage.setItem('movieQueue', JSON.stringify(movieQueue));
}

function addClassList() {
  btnAdd.innerHTML = 'Queue';
  if (btnDelMov === true) {
    btnAdd.innerHTML = 'delete';
  }
}
function removeClassList() {
  btnAdd.innerHTML = 'ADD TO Queue';
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

// *****  Запрос фильмов ID *********************************
const axios = require('axios');

movieIdF(movieQueue);

function movieIdF(movieId) {
  renderMovied = '';
  movieId.map(m =>
    axios.get(`${BASE_URL}movie/${m}?api_key=${API_KEY}&language=en-US`).then(response => {
      render(response.data);
    }),
  );
}

// *************************************************************************

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
  // count++;
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const moviePogination = document.querySelector('.movie-pogination');
const movie = document.querySelector('.movie');
const library = document.querySelector('.js-queue-header');
const btnWathed = document.querySelector('.js-wathed-header');

btnWathed.addEventListener('click', event => {
  event.preventDefault();
  openQueue = false;
});

library.addEventListener('click', event => {
  event.preventDefault();
  btnDelMov = true;
  openQueue = true;

  movie.innerHTML = renderMovied;
  moviePogination.innerHTML = '';
});

// !!!!!!!!!!!!удаление из массива
const home = document.querySelector('.nav__list-text');

home.addEventListener('click', event => {
  event.preventDefault();
  btnDelMov = false;
});
(() => {
  const refs = {
    closeModalBtn: document.querySelector('.modal-close-btn'),
  };
  refs.closeModalBtn.addEventListener('click', toggleModal);
  function toggleModal() {
    if (btnDelMov === true && openQueue === true) {
      movie.innerHTML = renderMovied;
    }
  }
})();

export default function movieUpdadeRender2() {
  if (btnDelMov === true && openQueue === true) {
    movie.innerHTML = renderMovied;
    // console.log('m2');
  }
}
