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
