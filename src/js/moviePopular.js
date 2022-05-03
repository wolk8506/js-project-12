const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a8df323e9ca157a6f58df54190ee006c';

export default function moviePopular() {
  return fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('Популярные фильмы');
      console.table(response.results.map(mov => mov.original_title));
    });
}
moviePopular();
