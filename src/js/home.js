import moviePopular from './moviePopular';

const home = document.querySelector('.nav__list-text');
const refHeader = document.querySelector('.header');
const refSearchForm = document.querySelector('.js-searchForm');
const refBtnGroup = document.querySelector('.btn-groupList');
home.addEventListener('click', event => {
  event.preventDefault();
  moviePopular();
  refHeader.classList.add('header');
  refHeader.classList.remove('header-library');
  refSearchForm.style.display = 'flex';
  refBtnGroup.style.display = 'none';
});
