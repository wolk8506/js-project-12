import { Spinner } from 'spin.js';
import opts from './spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var target = document.querySelector('body');
var spinner = new Spinner(opts);

const movie = document.querySelector('.movie');
let typeRequest = '';
let count = 1;
const axios = require('axios');

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

// ******my library********
const refHeader = document.querySelector('.header');
// console.log('header', refHeader);
const myLibraryBtn = document.querySelector('.js-library');
const refSearchForm = document.querySelector('.js-searchForm');
const refBtnGroup = document.querySelector('.btn-groupList');

myLibraryBtn.addEventListener('click', switchPage);

function switchPage() {
  refHeader.classList.remove('header');
  refHeader.classList.add('header-library');
  refSearchForm.style.display = 'none';
  refBtnGroup.style.display = 'flex';
}
// ****** переход по кнопкам домой и лого ******

const homePageLogo = document.querySelector('.logo');
homePageLogo.addEventListener('click', homePage);

const homePageHome = document.querySelector('.nav__list-text');
homePageHome.addEventListener('click', homePage);

function homePage() {
  count = 1;
  moviePopular();
}
// !!!!!!!!!!!!
function currentPage(page) {
  return localStorage.setItem(`currentPage`, `${page}`);
}

movieGenre();
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
      currentPage(numberPage);
    });
}
function startHP() {
  count = Number(localStorage.getItem('currentPage'));
  if (count === 0) {
    count = 1;
  }
  moviePopular(count);
}
startHP();
// moviePopular();

// *****  Запрос жанров фильмоы  *******************************************
function movieGenre() {
  return axios
    .get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      return saveStorageGenres(response.data.genres);
    });
}

function saveStorageGenres(genres) {
  genres.map(({ id, name }) => {
    return localStorage.setItem(`${id}`, `${name}`);
  });
}

// *************************************************************************

function render(markup) {
  movie.innerHTML = markup
    .map(({ original_title, poster_path, genre_ids, release_date, vote_average, id }) => {
      let imgMovie = `https://image.tmdb.org/t/p/w500${poster_path}`;
      let genre = ``;
      if (genre_ids.length > 3) {
        genre = `${localStorage.getItem(genre_ids[0])}, ${localStorage.getItem(
          genre_ids[1],
        )}, other`;
      } else genre = `${genre_ids.map(genre_ids => localStorage.getItem(genre_ids)).join(', ')}`;
      return `
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
      if (response.data.results.length === 0) {
        Notify.failure('Search result not successful. Enter the correct movie name');        
      }
      return render(response.data.results);   
    })
    .catch (error =>{
      console.log(error);   
    }) 
}
/* if (response.data.results.length === 0) {
  Notify.failure('Search result not successful. Enter the correct movie name');        
}
return render(response.data.results) ;
})
.catch (error =>{
 
  console.log(error);
  
})     
} */
// *****  Рендер пагинации  *************
const moviePogination = document.querySelector('.movie-pogination');
let pagesPogination = 0;
function renderPagination(pages) {
  pagesPogination = pages;
  let btn2 = 2;
  let btn3 = 3;
  let btn4 = 4;
  let btn5 = 5;
  let btn6 = '...';
  let btn7 = pages;

  if (pages > count + 10) {
    btn7 = count + 10;
  }

  if (count >= pages - 2) {
    btn2 = '...';
    btn3 = pages - 4;
    btn4 = pages - 3;
    btn5 = pages - 2;
    btn6 = pages - 1;
    btn7 = pages;
  } else if (count > 4) {
    btn2 = '...';
    btn3 = count - 1;
    btn4 = count;
    btn5 = count + 1;
  }
  if (pages <= 7) {
    btn2 = 2;
    btn3 = 3;
    btn4 = 4;
    btn5 = 5;
    btn6 = 6;
    btn7 = 7;
  }
  moviePogination.innerHTML = `
 <button class="prev-click" type="button">&larr;</button>
  <button id="btn01" class="${count === 1 ? 'activ-btn' : ''}" type="button">1</button>
 <button id="btn02" class="${count === 2 ? 'activ-btn' : ''}" type="button">${btn2}</button>
 <button id="btn03" class="${count === 3 ? 'activ-btn' : ''}" type="button">${btn3}</button>
 <button id="btn04" class="${
   count >= 4 && count < pages - 2 ? 'activ-btn' : ''
 }" type="button">${btn4}</button>
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
      count = 0;
      foo2(3);
    }
    prevClickFu();
  });
  const btn04 = document.querySelector('#btn04');
  if (count < 4) {
    btn04.addEventListener('click', function () {
      count = 0;
      foo2(3);
    });
  } else if (count > pages - 6) {
    btn04.addEventListener('click', function () {
      count = 0;
      btn7 = pages - 2;
      foo2(pages - 4);
    });
  }

  const btn05 = document.querySelector('#btn05');
  btn05.addEventListener('click', function () {
    if (count < 5) {
      count = 0;
      foo2(4);
      btn5 = 5;
      return;
    }
    if (count > 4 && count < pages - 3) {
      nextClickFu();
    } else {
      count = 0;
      btn7 = pages - 2;
      foo2(pages - 3);
    }
  });

  const btn06 = document.querySelector('#btn06');
  btn06.addEventListener('click', function () {
    if (pages > count + 10) {
      btn7 = count + 10;
      foo2(9);
    } else {
      count = 0;
      btn7 = pages - 1;
      foo2(pages - 2);
    }
  });

  const btn07 = document.querySelector('#btn07');
  btn07.addEventListener('click', function () {
    if (pages > count + 10) {
      btn7 = count + 10;
      foo2(9);
    } else {
      count = 0;
      btn7 = pages;
      foo2(pages - 1);
    }
  });

  if (pages <= 1) {
    btn01.style.display = 'none';
  }
  if (pages < 2) {
    btn02.style.display = 'none';
  }
  if (pages < 3) {
    btn03.style.display = 'none';
  }
  if (pages < 4) {
    btn04.style.display = 'none';
  }
  if (pages < 5) {
    btn05.style.display = 'none';
  }
  if (pages < 6) {
    btn06.style.display = 'none';
  }
  if (pages < 7) {
    btn07.style.display = 'none';
    nextClick.style.display = 'none';
    prevClick.style.display = 'none';
  }
}

function foo2(n) {
  count = count + n;
  // console.log(n);
  nextClickFu();
}

function nextClickFu() {
  if (count === pagesPogination) {
    return;
  }
  count++;
  if (typeRequest) {
    moviePopular(count);
  } else {
    movieSearch(count);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // console.log(count);
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
