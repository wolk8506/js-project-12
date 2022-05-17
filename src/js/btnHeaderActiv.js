const btnHome = document.querySelector('.js-heder-home');
const btnLibrary = document.querySelector('.js-library');
const btnLogo = document.querySelector('.logo');

btnHome.addEventListener('click', btnActivHeaderHome);
btnLibrary.addEventListener('click', btnActivHeaderLibrsry);
btnLogo.addEventListener('click', btnActivHeaderLogo);

function btnActivHeaderLogo() {
  if (btnLibrary.classList.contains('nav__list-text--activ')) {
    btnHome.classList.toggle('nav__list-text--activ');
    btnLibrary.classList.toggle('nav__list-text--activ');
  }

  btnHome.click();
}
function btnActivHeaderHome() {
  if (btnLibrary.classList.contains('nav__list-text--activ')) {
    btnHome.classList.toggle('nav__list-text--activ');
    btnLibrary.classList.toggle('nav__list-text--activ');
  }
}
function btnActivHeaderLibrsry() {
  if (btnHome.classList.contains('nav__list-text--activ')) {
    btnHome.classList.toggle('nav__list-text--activ');
    btnLibrary.classList.toggle('nav__list-text--activ');
  }
}

// * проверка загружаемой страницы *
let pageResetLoad = Number(localStorage.getItem('pageResetLoad'));
if (pageResetLoad === null) {
  pageResetLoad.setItem('pageResetLoad', 1);
}

import startHP from './moviePopular';
// import movieUpdadeRender from './moviePopular';
import movieUpdadeRender from './addMovied';
import movieUpdadeRender2 from './addQueue';

if (pageResetLoad === 1) {
  // console.log(1);
  startHP();
} else if (pageResetLoad === 2) {
  startHP();
} else if (pageResetLoad === 3) {
  // console.log(3);
  movieUpdadeRender();
  btnActivHeaderLibrsry();
} else if (pageResetLoad === 4) {
  // console.log(4);
  movieUpdadeRender2();
  btnActivHeaderLibrsry();
}
