//////////////////////////////////////////////////////////////////////////////
// Закрытие модалки

function modalClose() {
    window.removeEventListener('keydown', modalCloseByEsc);
    refs.backdrop.classList.add('is-hidden');
    refs.body.classList.remove('overhidden');
    refs.backdrop.innerHTML = '';
    //   filtersWatched();
    //   filtersQueue();
    if (sessionStorage.getItem('libopen') === null) {
      return;
    }
  
    if (sessionStorage.getItem('libopen') === 'libopenQueue') {
      refs.filmsContainer.innerHTML = '';
      filtersQueue();
    }
  
    if (sessionStorage.getItem('libopen') === 'libopenWatched') {
      refs.filmsContainer.innerHTML = '';
      filtersWatched();
    }
  }
  
  // Закрытие по клику бекдроп
  function backdropClick(event) {
    if (event.currentTarget === event.target) {
      modalClose();
    }
  }
  
  // Закрытие модалки по Escape
  function modalCloseByEsc(event) {
    if (event.code === 'Escape') {
      modalClose();
    }
  }
  
  ///////////////////////////////////////////////////////////////////////////
  // Закрытие модалки по Кнопке
  function closeByButton() {
    const modalCloseBtn = document.querySelector('.modal-close-btn.close');
    modalCloseBtn.addEventListener('click', modalClose);
  }