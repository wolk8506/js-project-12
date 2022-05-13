import movieUpdadeRender from './addMovied';
import movieUpdadeRender2 from './addQueue';

const backdrop = document.querySelector('.backdrop');
const body = document.querySelector('body');
backdrop.addEventListener('click', onBackdropClick);

function onCloseModal() {
  window.removeEventListener('keydown', onEscBtnClick);
  backdrop.classList.add('is-hidden');
  body.style.overflow = 'visible';
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    backdrop.classList.add('is-hidden');
    body.style.overflow = 'visible';
    movieUpdadeRender();
    movieUpdadeRender2();
  }
}

export default function onEscBtnClick(event) {
  if (event.code === 'Escape') {
    onCloseModal(event);
  }
  movieUpdadeRender();
  movieUpdadeRender2();
}

///////////////////////////////////////////////////////////////////////////
// Закрытие модалки по Кнопке
function closeByButton() {
  const modalCloseBtn = document.querySelector('.modal-close-btn.close');
  body.style.overflow = 'visible';
  modalCloseBtn.addEventListener('click', onCloseModal);
}
