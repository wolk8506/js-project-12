const headerBg = document.querySelector('.header');
const libraryBtn = document.querySelector('.libJs');
const homeBtn = document.querySelector('.homeJs');
const headerSearch = document.querySelector('.headerSearch');

libraryBtn.addEventListener('click', markupLibrary);
homeBtn.addEventListener('click', markupHomePage);

function markupLibrary(e) {
  e.preventDefault();
  headerBg.classList.add('lib');
  const markupBtn = `<div class="library__btn">
      <button class="library__btn-item">WATCHED</button>
      <button class="library__btn-item">QUEUE</button>
    </div>`;

  headerSearch.innerHTML = markupBtn;
  homeBtn.classList.remove('current-page');
  libraryBtn.classList.add('current-page');
}

function markupHomePage(e) {
  e.preventDefault();
  headerBg.classList.remove('lib');
  const headerBgImg = `/search.4b81f8f5.svg`;
  const markupInput = `<form class="search-form" id="search-form">
  <input
    class="search__input"
    type="text"
    name="searchQuery"
    autocomplete="off"
    placeholder="Search images..."
  />
  <button class="search__btn" type="submit">
    <img class="search__icon" src=${headerBgImg} alt="search" />
  </button>
</form>`;
  headerSearch.innerHTML = markupInput;
  homeBtn.classList.add('current-page');
  libraryBtn.classList.remove('current-page');
}
