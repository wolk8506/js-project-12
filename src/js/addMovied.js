// Movied; Queue;
import { refs } from './refs';
// **** переменные ****
const axios = require('axios');
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';
let movieWatched = JSON.parse(localStorage.getItem('movieWatched'));
let movieQueue = JSON.parse(localStorage.getItem('movieQueue'));
let renderMovied = '';

refs.library.addEventListener('click', event => {
  event.preventDefault();
  localStorage.setItem(`pageResetLoad`, `3`);
  activBtnHeader();
  movieIdF(movieWatched);
  refs.moviePogination.innerHTML = '';
});

refs.btnWathed.addEventListener('click', event => {
  event.preventDefault();
  localStorage.setItem(`pageResetLoad`, `3`);
  activBtnHeader();
  movieIdF(movieWatched);
});

refs.btnQueue.addEventListener('click', event => {
  event.preventDefault();
  localStorage.setItem(`pageResetLoad`, `4`);
  activBtnHeader();
  movieIdF(movieQueue);
});
activBtnHeader();
function activBtnHeader() {
  if (3 === Number(localStorage.getItem('pageResetLoad'))) {
    refs.btnWathed.style.background = '#FF6B01';
    refs.btnWathed.style.border = '#FF6B01';
    refs.btnQueue.style.background = 'inherit';
    refs.btnQueue.style.border = '1px solid #FFFFFF';
  } else {
    refs.btnWathed.style.background = 'inherit';
    refs.btnWathed.style.border = '1px solid #FFFFFF';
    refs.btnQueue.style.background = '#FF6B01';
    refs.btnQueue.style.border = '#FF6B01';
  }
}

// **** ****
// **** Запрос и рендер ****
// Запрос фильмов ID
function movieIdF(movieId) {
  if (movieId.length === 0) {
    refs.movie.innerHTML =
      '<div class="default-img-border"><img class="default-img" src="https://cdn.pixabay.com/photo/2016/02/01/18/59/filmstrip-1174228_960_720.png" width="450"/></div>';
  }
  renderMovied = '';
  movieId.map(m =>
    axios.get(`${BASE_URL}movie/${m}?api_key=${API_KEY}&language=ru-RU`).then(response => {
      // axios.get(`${BASE_URL}movie/${m}?api_key=${API_KEY}&language=en-US`).then(response => {
      render(response.data);
    }),
  );
}
// Рендер

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
  refs.movie.innerHTML = renderMovied;
}

// **** ****
// **** Запрос ID у фильма(карточки) ****

refs.movieModal.addEventListener('click', movieId);
refs.btnAddWatched.addEventListener('click', addMovieWatched);
refs.btnAddQueue.addEventListener('click', addMovieQueue);

function movieId(e) {
  if (e.path[1].nodeName !== 'A') {
    return;
  }
  movieIdWatched();
  movieIdQueue();
  // проверяет включает ли массив ID Watched
  function movieIdWatched() {
    if (movieWatched.includes(e.path[1].dataset.id)) {
      btnName1Wanted();
      return;
    } else {
      btnName2Wanted();
    }
  }
  // проверяет включает ли массив ID Queue
  function movieIdQueue() {
    if (movieQueue.includes(e.path[1].dataset.id)) {
      btnName1Queue();
      return;
    } else {
      btnName2Queue();
    }
  }
}
// Название кнопок Watched
function btnName1Wanted() {
  refs.btnAddWatched.innerHTML = 'WATCHED';
  if (3 === Number(localStorage.getItem('pageResetLoad'))) {
    refs.btnAddWatched.innerHTML = 'Delete';
  }
}
function btnName2Wanted() {
  refs.btnAddWatched.innerHTML = 'ADD TO WATCHED';
}
// Название кнопок Queue
function btnName1Queue() {
  refs.btnAddQueue.innerHTML = 'Queue';
  if (4 === Number(localStorage.getItem('pageResetLoad'))) {
    refs.btnAddQueue.innerHTML = 'Delete';
  }
}
function btnName2Queue() {
  refs.btnAddQueue.innerHTML = 'ADD TO Queue';
}

// **** ****

function addMovieWatched(e) {
  console.log('click W');
  // Добавление в библеотеку Watched со страниц 1 и 2
  if (movieWatched.includes(e.path[0].value) && 3 > Number(localStorage.getItem('pageResetLoad'))) {
    return;
  } else if (
    !movieWatched.includes(e.path[0].value) &&
    3 > Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieWatched.push(e.path[0].value);
    btnName1Wanted();
  }
  // Удаляем-добавляем в библеотеку Watched со страниц 1 и 2
  if (
    movieWatched.includes(e.path[0].value) &&
    3 === Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieWatched.splice(movieWatched.indexOf(e.path[0].value), 1);
    btnName2Wanted();
  } else if (
    !movieWatched.includes(e.path[0].value) &&
    3 <= Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieWatched.push(e.path[0].value);
    btnName1Wanted();
  }
  // Запись в хранилище
  localStorage.setItem('movieWatched', JSON.stringify(movieWatched));
}

function addMovieQueue(e) {
  // Добавление в библеотеку Queue со страниц 1 и 2
  if (movieQueue.includes(e.path[0].value) && 3 > Number(localStorage.getItem('pageResetLoad'))) {
    return;
  } else if (
    !movieQueue.includes(e.path[0].value) &&
    3 > Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieQueue.push(e.path[0].value);
    btnName1Queue();
  }
  // Удаляем-добавляем в библеотеку Queue со страниц 1 и 2
  if (movieQueue.includes(e.path[0].value) && 4 === Number(localStorage.getItem('pageResetLoad'))) {
    movieQueue.splice(movieQueue.indexOf(e.path[0].value), 1);
    btnName2Queue();
  } else if (
    !movieQueue.includes(e.path[0].value) &&
    3 <= Number(localStorage.getItem('pageResetLoad'))
  ) {
    movieQueue.push(e.path[0].value);
    btnName1Queue();
  }
  // Запись в хранилище
  localStorage.setItem('movieQueue', JSON.stringify(movieQueue));
}
// **** Закрытие модалки ****

refs.closeModalBtn.addEventListener('click', toggleModal);
function toggleModal() {
  if (3 <= Number(localStorage.getItem('pageResetLoad'))) {
    libraryPageActiv();
  }
}
// **** ****
// **** проверка сохраненной страницы ****

export default function libraryPageActiv() {
  if (4 === Number(localStorage.getItem('pageResetLoad'))) {
    movieIdF(movieQueue);
  } else if (3 === Number(localStorage.getItem('pageResetLoad'))) {
    movieIdF(movieWatched);
  }
}
// **** ****
