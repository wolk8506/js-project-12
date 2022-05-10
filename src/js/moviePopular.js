import{ Spinner }  from 'spin.js';
import opts from './spinner';


var target = document.querySelector('body');
var spinner = new Spinner(opts);

const movie = document.querySelector('.movie');
let typeRequest = '';
let count = 1;
const axios = require('axios');

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

// *****  Запрос популярных фильмов ****************************************
export default function moviePopular(numberPage = 1) {
  spinner.spin(target);
  return axios
    .get(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${numberPage}`)
    .then(response => {
      // console.log(response.data);
      renderPagination(response.data.total_pages);
      typeRequest = true;
      render(response.data.results);
      spinner.stop();
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
  count = 1;
  movieSearch();
}
function inputSearch() {
  QUERY_PROMT = input.searchQuery.value;
}

function movieSearch(page) {
  spinner.spin(target);
  return axios
    .get(
      `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${QUERY_PROMT}&page=1&include_adult=false&page=${page}`,
    )
    .then(response => {
      typeRequest = false;
      renderPagination(response.data.total_pages);
      spinner.stop();
      return render(response.data.results);
    });
}
// *****  Рендер пагинации  *************
const moviePogination = document.querySelector('.movie-pogination');

function renderPagination(pages) {
  let btn2 = 2;
  let btn3 = 3;
  let btn4 = 4;
  let btn5 = 5;
  let btn6 = '...';
  let btn7 = '';
  if (count > 4) {
    btn2 = '...';
    btn3 = count - 1;
    btn4 = count;
    btn5 = count + 1;
  }
  if (pages > count + 10) {
    btn7 = count + 10;
  } else {
    btn3 = count;
    btn4 = count + 1;
    btn5 = count;
    btn5 = count;
    btn7 = count;
  }
  // if (count - 4 < pages) {
  //   btn3 = count;
  //   btn4 = count;
  //   btn5 = count;
  //   btn5 = count;
  //   btn7 = count;
  // }
  if (pages < 6) {
    btn6 = 6;
  }
  moviePogination.innerHTML = `
 <button class="prev-click" type="button">&larr;</button>
  <button id="btn01" class="${count === 1 ? 'activ-btn' : ''}" type="button">1</button>
 <button id="btn02" class="${count === 2 ? 'activ-btn' : ''}" type="button">${btn2}</button>
 <button id="btn03" class="${count === 3 ? 'activ-btn' : ''}" type="button">${btn3}</button>
 <button id="btn04" class="${count >= 4 ? 'activ-btn' : ''}" type="button">${btn4}</button>
 <button id="btn05" class="${count === pages - 2 ? 'activ-btn' : ''}" type="button">${btn5}</button>
 <button id="btn06" class="${count === pages - 1 ? 'activ-btn' : ''}" type="button">${btn6}</button>
 <button id="btn07" class="${count === pages ? 'activ-btn' : ''}" type="button">${btn7}</button>
 <button class="next-click" type="button">&rarr;</button>
 `;

  const nextClick = document.querySelector('.next-click');
  const prevClick = document.querySelector('.prev-click');
  prevClick.addEventListener('click', prevClickFu);
  nextClick.addEventListener('click', nextClickFu);

  const btn01 = document.querySelector('#btn01');
  btn01.addEventListener('click', function () {
    count = 0;
    foo2(0);
  });

  const btn02 = document.querySelector('#btn02');
  btn02.addEventListener('click', function () {
    if (count > 10) {
      foo2(-11);
    } else {
      count = 0;
      foo2(1);
    }
  });

  const btn03 = document.querySelector('#btn03');
  btn03.addEventListener('click', function () {
    if (count < 4) {
      count = 2;
      foo2(1);
      btn5 = 5;
    }

    prevClickFu();
  });
  const btn04 = document.querySelector('#btn04');
  if (count < 4) {
    btn04.addEventListener('click', function () {
      foo2(2);
    });
  }

  const btn05 = document.querySelector('#btn05');
  btn05.addEventListener('click', function () {
    if (count < 4) {
      count = 2;
      foo2(1);
      btn5 = 5;
    }
    nextClickFu();
  });
  const btn06 = document.querySelector('#btn06');
  btn06.addEventListener('click', function () {
    // foo2(9);
  });

  const btn07 = document.querySelector('#btn07');
  btn07.addEventListener('click', function () {
    foo2(9);
  });

  if (pages <= 1) {
    btn01.style.display = 'none';
  }
  if (pages <= 2) {
    btn02.style.display = 'none';
  }
  if (pages <= 3) {
    btn03.style.display = 'none';
  }
  if (pages <= 4) {
    btn04.style.display = 'none';
  }
  if (pages <= 5) {
    btn05.style.display = 'none';
  }
  if (pages <= 6) {
    btn06.style.display = 'none';
  }
  if (pages <= 7) {
    btn07.style.display = 'none';
    nextClick.style.display = 'none';
    prevClick.style.display = 'none';
  }

  // if (pages <= 1) {
  //   btn01.style.display = 'none';
  //   btn02.style.display = 'none';
  //   btn03.style.display = 'none';
  //   btn04.style.display = 'none';
  //   btn05.style.display = 'none';
  //   btn06.style.display = 'none';
  //   btn07.style.display = 'none';
  //   nextClick.style.display = 'none';
  //   prevClick.style.display = 'none';
  // } else if (pages <= 2) {
  //   btn02.style.display = 'none';
  //   btn03.style.display = 'none';
  //   btn04.style.display = 'none';
  //   btn05.style.display = 'none';
  //   btn06.style.display = 'none';
  //   btn07.style.display = 'none';
  //   nextClick.style.display = 'none';
  //   prevClick.style.display = 'none';
  // } else if (pages <= 3) {
  //   btn03.style.display = 'none';
  //   btn04.style.display = 'none';
  //   btn05.style.display = 'none';
  //   btn06.style.display = 'none';
  //   btn07.style.display = 'none';
  //   nextClick.style.display = 'none';
  //   prevClick.style.display = 'none';
  // } else if (pages <= 4) {
  //   btn04.style.display = 'none';
  //   btn05.style.display = 'none';
  //   btn06.style.display = 'none';
  //   btn07.style.display = 'none';
  //   nextClick.style.display = 'none';
  //   prevClick.style.display = 'none';
  // } else if (pages <= 5) {
  //   btn05.style.display = 'none';
  //   btn06.style.display = 'none';
  //   btn07.style.display = 'none';
  //   nextClick.style.display = 'none';
  //   prevClick.style.display = 'none';
  // } else if (pages <= 6) {
  //   btn06.style.display = 'none';
  //   btn07.style.display = 'none';
  //   nextClick.style.display = 'none';
  //   prevClick.style.display = 'none';
  // } else if (pages <= 7) {
  //   btn07.style.display = 'none';
  //   nextClick.style.display = 'none';
  //   prevClick.style.display = 'none';
  // }
}

function foo2(n) {
  count = count + n;
  console.log(n);
  nextClickFu();
}

function nextClickFu() {
  count++;
  if (typeRequest) {
    moviePopular(count);
  } else {
    movieSearch(count);
  }
  // window.scrollTo({ top: 0, behavior: 'smooth' });
  console.log(count);
}

function prevClickFu() {
  if (count <= 1) {
    return;
  } else count--;
  if (typeRequest) {
    moviePopular(count);
  } else {
    movieSearch(count);
  }
  // window.scrollTo({ top: 0, behavior: 'smooth' });
}
