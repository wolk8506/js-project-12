// Movied;
let openMovied = false;
let renderMovied = '';
let btnDelMov = false;
let movieWatched = JSON.parse(localStorage.getItem('movieWatched'));
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';
const axios = require('axios');

const btnAdd = document.querySelector('.js-watched');
const movieModal = document.querySelector('.movie-modal-id');

movieModal.addEventListener('click', movieId);

function movieId(e) {
  if (e.path[1].nodeName !== 'A') {
    return;
  }
  // console.log(e.path[1].dataset.id);
  if (movieWatched.includes(e.path[1].dataset.id)) {
    addClassList();
    return;
  }
  removeClassList();
}
btnAdd.addEventListener('click', addMovie);

function addMovie(e) {
  if (movieWatched.includes(e.path[0].value) && btnDelMov === false) {
    return;
  } else if (btnDelMov === true && movieWatched.includes(e.path[0].value)) {
    movieWatched.splice(movieWatched.indexOf(e.path[0].value), 1);
    removeClassList();
  } else if (btnDelMov === true && !movieWatched.includes(e.path[0].value)) {
    movieWatched.push(e.path[0].value);
    addClassList();
  }
  if (btnDelMov === false) {
    movieWatched.push(e.path[0].value);
  }

  if (btnDelMov === false) {
    addClassList();
  }
  movieIdF(movieWatched);
  localStorage.setItem('movieWatched', JSON.stringify(movieWatched));
}

function addClassList() {
  btnAdd.innerHTML = 'WATCHED';
  if (btnDelMov === true) {
    btnAdd.innerHTML = 'Delete';
  }
}
function removeClassList() {
  btnAdd.innerHTML = 'ADD TO WATCHED';
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// *****  Запрос фильмов ID *********************************

movieIdF(movieWatched);

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
  let imgMovie = `https://image.tmdb.org/t/p/w500${poster_path}`;
  let genre = ``;
  if (genres.length > 3) {
    genre = `${genres[0].name}, ${genres[1].name}, other`;
  } else genre = `${genres.map(genre => genre.name).join(', ')}`;
  renderMovied =
    renderMovied +
    `
      <a class="movie-item" data-id="${id}"href="#" onclick="event.preventDefault()">
      <img class="movie-img" src="${
        poster_path !== null
          ? imgMovie
          : 'https://cdn.pixabay.com/photo/2012/04/14/15/43/film-34332_960_720.png'
      }"/>
      <h2 class="movie-title">${original_title}</h2>
      <ul class="movie-blok-info">
      <li>${genre}</li>
      <li class="movie-year">&nbsp;|&nbsp;${release_date.substr(0, 4)}</li>
      <li class="movie-vote_average">${vote_average.toFixed(1)}</li>
      </ul>
      </a>`;
  if (3 === Number(localStorage.getItem('pageResetLoad'))) {
    movie.innerHTML = renderMovied;
    // console.log('m1');
  }
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const moviePogination = document.querySelector('.movie-pogination');
const movie = document.querySelector('.movie');
const library = document.querySelector('.nav__list-text--home');
const btnWathed = document.querySelector('.js-wathed-header');
const btnQueue = document.querySelector('.js-queue-header');

btnQueue.addEventListener('click', event => {
  event.preventDefault();
  openMovied = false;
  btnDelMov = false;

  activBtnHeader();
});

btnWathed.addEventListener('click', event => {
  event.preventDefault();
  btnDelMov = true;
  openMovied = true;

  activBtnHeader();
  movie.innerHTML = renderMovied;
  moviePogination.innerHTML = '';
});

library.addEventListener('click', event => {
  event.preventDefault();
  btnDelMov = true;
  openMovied = true;
  setTimeout(() => {
    let pageResetLoad = localStorage.setItem(`pageResetLoad`, `3`);
    // console.log('m2');
  }, 50);
  activBtnHeader();
  movie.innerHTML = renderMovied;
  moviePogination.innerHTML = '';
});

function activBtnHeader() {
  if (openMovied === true) {
    btnWathed.style.background = '#FF6B01';
    btnWathed.style.border = '#FF6B01';
    btnQueue.style.background = 'inherit';
    btnQueue.style.border = '1px solid #FFFFFF';
  } else {
    btnWathed.style.background = 'inherit';
    btnWathed.style.border = '1px solid #FFFFFF';
    btnQueue.style.background = '#FF6B01';
    btnQueue.style.border = '#FF6B01';
  }
}

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
    if (btnDelMov === true) {
      movie.innerHTML = renderMovied;
    }
  }
})();

export default function movieUpdadeRender() {
  if (btnDelMov === true && openMovied === true) {
    movie.innerHTML = renderMovied;
    // console.log('m4');
  }
  if (3 === Number(localStorage.getItem('pageResetLoad'))) {
    loadPage();
  }
}

export function loadPage() {
  // console.log(25);
  // event.preventDefault();
  // movie.innerHTML = renderMovied;
  library.click();
}
