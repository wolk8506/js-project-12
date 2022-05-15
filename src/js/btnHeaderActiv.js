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
