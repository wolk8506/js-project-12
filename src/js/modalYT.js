// import onEscBtnClick from './modalClose';
const axios = require('axios');
import { refs } from './refs';

// refs.movieModal.addEventListener('click', movieId);
refs.movieTrailer.addEventListener('click', modalOpen);

function modalOpen() {
  console.log('modal open');
  refs.backdrop2.classList.toggle('is-hidden');
  // movieTrailer(movieId);
}

refs.closeModalBtn2.addEventListener('click', toggleModal);
function toggleModal() {
  refs.backdrop2.classList.toggle('is-hidden');
  refs.player.src = '';
}

// function movieId(e) {
//   if (e.path[1].nodeName !== 'A') {
//     return;
//   }

//   movieIdF(e.path[1].dataset.id);
//   movieTrailer(e.path[1].dataset.id);
//   modalOpen();
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// const BASE_URL = 'https://api.themoviedb.org/3/';
// const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

// // *****  Trailer  *****
// let movieTrailerId = '';

// function movieTrailer(movieId) {
//   return axios
//     .get(`${BASE_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=ru-RU`)
//     .then(response => {
//       refs.player.src = `https://www.youtube.com/watch?v=${response.data.results[0].key}`;
//       console.log('https://www.youtube.com/watch?v=${response.data.results[0].key}');
//     });
// }

// // *****  Запрос фильмов ID *********************************
// function movieIdF(movieId) {
//   return axios
//     .get(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=ru-RU`)
//     .then(response => {
//       modalMovieData(response.data);
//       // console.log(response.data);
//     });
// }

// function modalOpen() {
//   refs.backdrop.classList.toggle('is-hidden');
//   window.addEventListener('keydown', onEscBtnClick);
//   refs.body.style.overflow = 'hidden';
// }

// function modalMovieData({
//   poster_path,
//   original_title,
//   vote_average,
//   vote_count,
//   popularity,
//   genres,
//   overview,
//   id,
// }) {
//   refs.movieImage.src =
//     poster_path !== null
//       ? `https://image.tmdb.org/t/p/w500${poster_path}`
//       : 'https://cdn.pixabay.com/photo/2012/04/14/15/43/film-34332_960_720.png';
//   refs.movieTitle.innerHTML = `${original_title}`;
//   refs.movieVoteOrange.innerHTML = `${vote_average}`;
//   refs.movieVoteGrey.innerHTML = `${vote_count}`;
//   refs.moviePopularity.innerHTML = `${popularity}`;
//   refs.movieOriginalTitle.innerHTML = `${original_title}`;
//   refs.movieGanre.innerHTML = `${genres.map(genre => genre.name).join(', ')}`;
//   refs.movieOverview.innerHTML = `${overview}`;
//   refs.movieImage.alt = `${original_title}`;
//   refs.movieWatched.value = `${id}`;
//   refs.movieQueue.value = `${id}`;
//   // refs.movieTrailer.innerHTML = `AFdadfadfadadf`;
// }

// refs.closeModalBtn.addEventListener('click', toggleModal);
// function toggleModal() {
//   refs.modal.classList.toggle('is-hidden');
//   refs.movieImage.src = ``;
//   refs.movieTitle.innerHTML = ``;
//   refs.movieVoteOrange.innerHTML = ``;
//   refs.movieVoteGrey.innerHTML = ``;
//   refs.moviePopularity.innerHTML = ``;
//   refs.movieOriginalTitle.innerHTML = ``;
//   refs.movieGanre.innerHTML = ``;
//   refs.movieOverview.innerHTML = ``;
//   refs.body.style.overflow = 'visible';
//   refs.movieQueue.value = ``;
//   refs.movieTrailer.href = ``;
// }
