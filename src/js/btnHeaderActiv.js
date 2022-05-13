const btnHome = document.querySelector('.js-heder-home');
const btnLibrary = document.querySelector('.js-heder-library');
const btnLogo = document.querySelector('.logo');

btnHome.addEventListener('click', btnActivHeader);
btnLibrary.addEventListener('click', btnActivHeader);
btnLogo.addEventListener('click', btnActivHeaderLogo);

function btnActivHeader() {
  btnHome.classList.toggle('nav__list-item--activ');
  btnLibrary.classList.toggle('nav__list-item--activ');
}
function btnActivHeaderLogo() {
  if (btnLibrary.classList.contains('nav__list-item--activ')) {
    btnHome.classList.toggle('nav__list-item--activ');
    btnLibrary.classList.toggle('nav__list-item--activ');
  }
}
