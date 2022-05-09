const axios = require('axios');

// !!!!!!!!!!!!!!!!!!!!!!!!!!!
const movieModal = document.querySelector('.movie-modal-id');
movieModal.addEventListener('click', movieId);

function movieId(e) {
  if (e.path[1].nodeName !== 'A') {
    return;
  }

  // console.log(e.path[1].dataset.id);
  movieIdF(e.path[1].dataset.id);
  modalOpen();
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

// *****  Запрос фильмов ID *********************************
function movieIdF(movieId) {
  return axios
    .get(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      console.log(response.data);
      modalMovieData(response.data);
    });
}
const backdrop = document.querySelector('.backdrop');

function modalOpen() {
  backdrop.classList.toggle('is-hidden');
}

const movieImage = document.querySelector('.modal__img');
const movieTitle = document.querySelector('.modal__film-title');
const movieVoteOrange = document.querySelector('.modal-vote--orange');
const movieVoteGrey = document.querySelector('.modal-vote--grey');
const moviePopularity = document.querySelector('.modal-short-info__description-item--popularity');
const movieOriginalTitle = document.querySelector(
  '.modal-short-info__description-item--original-title',
);
const movieGanre = document.querySelector('.modal-short-info__description-item--ganre');
const movieOverview = document.querySelector('.modal__about-text');

function modalMovieData({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) {
  movieImage.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  movieTitle.innerHTML = `${original_title}`;
  movieVoteOrange.innerHTML = `${vote_average}`;
  movieVoteGrey.innerHTML = `${vote_count}`;
  moviePopularity.innerHTML = `${popularity}`;
  movieOriginalTitle.innerHTML = `${original_title}`;
  movieGanre.innerHTML = `${genres.map(genre => genre.name).join(', ')}`;
  movieOverview.innerHTML = `${overview}`;
}

(() => {
  const refs = {
    closeModalBtn: document.querySelector('.modal-close-btn'),
    modal: document.querySelector('.backdrop'),
  };
  refs.closeModalBtn.addEventListener('click', toggleModal);
  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    movieImage.src = ``;
    movieTitle.innerHTML = ``;
    movieVoteOrange.innerHTML = ``;
    movieVoteGrey.innerHTML = ``;
    moviePopularity.innerHTML = ``;
    movieOriginalTitle.innerHTML = ``;
    movieGanre.innerHTML = ``;
    movieOverview.innerHTML = ``;
  }
})();




/* /modal-btn */
export const watched = 'Watched';
export const queue = 'Queue';

const buttonLabelWatchedAdd = 'add to Watched';
const buttonLabelWatchedRemove = 'remove from Watched';
const buttonLabelQueuedAdd = 'add to Queue';
const buttonLabelQueueRemove = 'remove from Queue';

////////////////////////////////////////////////
//Поиск ссылок по карточке
function searchLinks() {
  return {
    dataId: document.querySelector('.modal'),
    dataRelease: document.querySelector('.modal'),
    dataImg: document.querySelector('.modal__img'),
    dataAverage: document.querySelector('.card__item-average'),
    dataCount: document.querySelector('.card__item-count'),
    dataPopularity: document.querySelector('.card__item-count'),
    dataOriginal: document.querySelector('.card__item-original-title'),
    dataGenres: document.querySelector('.card__item-genres'),
    //  dataGenres: document.querySelectorAll('.card__item-genre'),
    dataOverview: document.querySelector('.card__text'),
    btnWatched: document.querySelector('.card__btn-watched'),
    btnQueue: document.querySelector('.card__btn-que'),
  };
}

//////////// Кнопка "add to Watched"  добавить - к просмотренным

// Добавляет в  localStorage
function updateStorage(datalocalStorage, keyStorage) {
  const dataStorage = [];
  dataStorage.push(datalocalStorage);
  //   console.log(datalocalStorage);
  localStorage[keyStorage] = JSON.stringify(dataStorage);
}

// После рендеринга - устанавливает слушатель
export function listenerModalBtn() {
  const btnAddWatched = document.querySelector('.card__btn-watched');
  btnAddWatched.addEventListener('click', addsWatched);

  const btnAddQueue = document.querySelector('.card__btn-que');
  btnAddQueue.addEventListener('click', addsQueue);
  storageСheckWatched();
  storageСheckQueue();
}

//Проверка статуса кнопок в зависимости от наличия в хранилище и зменение названия
function storageСheckWatched() {
  const linsk = searchLinks();
  const idCard = linsk.dataId.getAttribute('data-action'); // id  в карточке
  const movieStorageData = JSON.parse(localStorage.getItem(idCard)); // данние из хранилищя
  if (movieStorageData === null) {
    return;
  }
  if (movieStorageData[0].id === idCard && movieStorageData[0].librarySection === watched) {
    linsk.btnWatched.textContent = buttonLabelWatchedRemove;
  } else {
    linsk.btnWatched.textContent = buttonLabelWatchedAdd;
  }
}

function storageСheckQueue() {
  const linsk = searchLinks();
  const idCard = linsk.dataId.getAttribute('data-action'); // id  в карточке
  const movieStorageData = JSON.parse(localStorage.getItem(idCard)); // данние из хранилищя
  if (movieStorageData === null) {
    return;
  }
  if (movieStorageData[0].id === idCard && movieStorageData[0].librarySection === queue) {
    linsk.btnQueue.textContent = buttonLabelQueueRemove;
  } else {
    linsk.btnQueue.textContent = buttonLabelQueuedAdd;
  }
}

// Кнопка - работа с хранилищем (добавление)
function addsWatched() {
  const linsk = searchLinks();
  let genresStrong = linsk.dataGenres.textContent;
  genresStrong = genresStrong.replace(/\s+/g, ' ').trim().split(' ').join(', ');
  //   console.log(genresStrong);

  const yearData = linsk.dataRelease.getAttribute('data-year').split('-')[0];
  //   console.log(yearData);

  const datalocalStorage = {
    id: linsk.dataId.getAttribute('data-action'),
    release_date: yearData,
    title: linsk.dataImg.getAttribute('alt'),
    poster_path: linsk.dataImg.getAttribute('src'),
    vote_average: linsk.dataAverage.textContent,
    vote_count: linsk.dataCount.textContent,
    popularity: linsk.dataPopularity.textContent,
    original_title: linsk.dataOriginal.textContent,
    genres: { name: genresStrong },
    overview: linsk.dataOverview.textContent,
    librarySection: watched,
  };

  const keyStorage = datalocalStorage.id;
  if (linsk.btnWatched.textContent != buttonLabelWatchedRemove) {
    updateStorage(datalocalStorage, keyStorage);
  } else {
    deleteStoragData();
    linsk.btnWatched.textContent = buttonLabelWatchedAdd;
  }
  storageСheckWatched();
  storageСheckQueue();
}

//////////// Кнопка "add to queue" -  добавить в очередь
function addsQueue() {
  const linsk = searchLinks();
  let genresStrong = linsk.dataGenres.textContent;
  genresStrong = genresStrong.replace(/\s+/g, ' ').trim().split(' ').join(', ');
  //   console.log(genresStrong);

  const yearData = linsk.dataRelease.getAttribute('data-year').split('-')[0];
  //   console.log(yearData);

  const datalocalStorage = {
    id: linsk.dataId.getAttribute('data-action'),
    release_date: yearData,
    title: linsk.dataImg.getAttribute('alt'),
    poster_path: linsk.dataImg.getAttribute('src'),
    vote_average: linsk.dataAverage.textContent,
    vote_count: linsk.dataCount.textContent,
    popularity: linsk.dataPopularity.textContent,
    original_title: linsk.dataOriginal.textContent,
    genres: { name: genresStrong },
    overview: linsk.dataOverview.textContent,
    librarySection: queue,
  };

  const keyStorage = datalocalStorage.id;
  if (linsk.btnQueue.textContent != buttonLabelQueueRemove) {
    updateStorage(datalocalStorage, keyStorage);
  } else {
    deleteStoragData();
    linsk.btnQueue.textContent = buttonLabelQueuedAdd;
  }
  storageСheckQueue();
  storageСheckWatched();
}

//////// Удаление из хранилища
function deleteStoragData() {
  const linsk = searchLinks();
  const idCard = linsk.dataId.getAttribute('data-action'); // id  в карточке
  if (
    linsk.btnWatched.textContent === buttonLabelWatchedRemove ||
    linsk.btnQueue.textContent === buttonLabelQueueRemove
  ) {
    localStorage.removeItem(idCard);
  }
}